import { IExecuteFunctions } from "n8n-core";

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from "n8n-workflow";

import { mollieApiRequest, simplify } from "./GenericFunctions";

import {
	methodsFields,
	methodsOperations,
	paymentLinksFields,
	paymentLinksOperations,
	paymentsFields,
	paymentsOperations,
} from "./descriptions";

import { version } from "../version";

const parseParams = (params: any): any => {
	const optionalLength = Object.keys(params).length;
	const optionalData = Object.keys(params).map(
		(firstKey: string, firstIndex: number) => {
			let rowString = "";
			if (firstIndex === 0) rowString = "?";

			let value = params[firstKey];
			if (
				value.slice(0, 1) === "{" &&
				value.slice(value.length - 1, value.length) === "}"
			) {
				const parsedValue = JSON.parse(value);
				const parsedValueLength = Object.keys(parsedValue).length;
				const attributes = Object.keys(parsedValue).map(
					(keySecond: string, secondIndex: number) => {
						let attributeString = "";

						attributeString += `${firstKey}[${keySecond}]=${parsedValue[keySecond]}`;
						if (secondIndex !== parsedValueLength - 1)
							attributeString = `${attributeString}&`;

						return attributeString;
					}
				);

				value = attributes.join("").replace(",", "");
				rowString += `${value}`;
			} else {
				rowString += `${firstKey}=${value}`;
			}

			if (firstIndex !== optionalLength - 1) rowString = `${rowString}&`;
			return rowString;
		}
	);

	return optionalData.join("").replace(",", "");
};

export class Mollie implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Mollie",
		name: "mollie",
		icon: "file:mollie.png",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume Mollie API (v.${version})`,
		defaults: {
			name: "Mollie",
			color: "#772244",
		},
		inputs: ["main"],
		outputs: ["main"],
		credentials: [
			{
				name: "mollieApi",
				required: true,
			},
		],
		properties: [
			{
				displayName: "Live Api Key",
				name: "isLiveKey",
				required: true,
				type: "boolean",
				default: true,
			},
			{
				displayName: "Resource",
				name: "resource",
				required: true,
				type: "options",
				options: [
					{
						name: "Payments",
						value: "payments",
					},
					{
						name: "Payment links",
						value: "paymentLinks",
					},
					{
						name: "Methods",
						value: "methods",
					},
				],
				default: "payments",
			},
			...paymentsOperations,
			...paymentsFields,
			...paymentLinksOperations,
			...paymentLinksFields,
			...methodsOperations,
			...methodsFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const body: IDataObject = {};
		const qs: IDataObject = {};
		let method = "";
		let endpoint = "";
		const returnData: IDataObject[] = [];

		const isLiveKey = this.getNodeParameter("isLiveKey", 0) as boolean;
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;

		const optionalParameters: any = this.getNodeParameter(
			"optionalParameters",
			0
		) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case "payments":
						const paymentUrl = "/payments";
						switch (operation) {
							case "create":
								// ----------------------------------
								//        payments:create
								// ----------------------------------
								endpoint = paymentUrl;
								method = "POST";
								body.metadata = {
									order_id: this.getNodeParameter("orderId", i) as string,
								};
								body.amount = {
									currency: this.getNodeParameter("currency", i) as string,
									value: (
										this.getNodeParameter("value", i) as string
									).toString(), // Ensure sending a string value
								};
								body.description = this.getNodeParameter(
									"description",
									i
								) as string;
								body.redirectUrl = this.getNodeParameter(
									"redirectUrl",
									i
								) as string;
								Object.assign(
									body,
									this.getNodeParameter("additionalFields", i) as IDataObject
								);
								break;

							case "delete":
								// ----------------------------------
								//        payments:delete
								// ----------------------------------
								endpoint = (paymentUrl +
									"/" +
									this.getNodeParameter("id", i)) as string;
								method = "DELETE";
								break;

							case "get":
								// ----------------------------------
								//        payments:get
								// ----------------------------------
								endpoint = (paymentUrl +
									"/" +
									this.getNodeParameter("id", i)) as string;
								method = "GET";
								break;

							case "list":
								// ----------------------------------
								//        payments:list
								// ----------------------------------
								endpoint = paymentUrl;
								method = "GET";
								Object.assign(
									qs,
									this.getNodeParameter(
										"additionalParameters",
										i
									) as IDataObject
								);
								break;

							case "update":
								// ----------------------------------
								//        payments:update
								// ----------------------------------
								endpoint = (paymentUrl +
									"/" +
									this.getNodeParameter("id", i)) as string;
								method = "PATCH";
								Object.assign(
									body,
									this.getNodeParameter("additionalFields", i) as IDataObject
								);
								break;

							default:
								break;
						}
						break;

					case "paymentLinks":
						const paymentLinksUrl = "/payment-links";
						switch (operation) {
							case "create":
								// ----------------------------------
								//        paymentLinks:create
								// ----------------------------------
								endpoint = paymentLinksUrl;
								method = "POST";
								body.amount = {
									currency: this.getNodeParameter("currency", i) as string,
									value: (
										this.getNodeParameter("value", i) as string
									).toString(), // Ensure sending a string value
								};
								body.description = this.getNodeParameter(
									"description",
									i
								) as string;
								Object.assign(
									body,
									this.getNodeParameter("additionalFields", i) as IDataObject
								);
								break;

							case "get":
								// ----------------------------------
								//        paymentLinks:get
								// ----------------------------------
								endpoint = (paymentLinksUrl +
									"/" +
									this.getNodeParameter("id", i)) as string;
								method = "GET";
								break;

							case "list":
								// ----------------------------------
								//        paymentLinks:list
								// ----------------------------------
								endpoint = paymentLinksUrl;
								method = "GET";
								Object.assign(
									qs,
									this.getNodeParameter(
										"additionalParameters",
										i
									) as IDataObject
								);

								break;

							default:
								break;
						}

						break;

					case "methods":
						const methodsUri = "/methods";
						switch (operation) {
							case "list":
								// ----------------------------------
								//        methods:list
								// ----------------------------------

								endpoint = `${methodsUri}${parseParams(optionalParameters)}`;
								method = "GET";
								break;

							case "listAll":
								// ----------------------------------
								//        methods:listAll
								// ----------------------------------
								endpoint = `${methodsUri}/all${parseParams(
									optionalParameters
								)}`;
								method = "GET";
								break;

							case "get":
								// ----------------------------------
								//        methods:get
								// ----------------------------------
								endpoint = `${methodsUri}/${this.getNodeParameter(
									"id",
									i
								)}${parseParams(optionalParameters)}`;
								method = "GET";
								break;

							default:
								break;
						}
						break;

					default:
						break;
				}

				responseData = await mollieApiRequest.call(
					this,
					method,
					endpoint,
					qs,
					body,
					isLiveKey
				);
				responseData = JSON.parse(responseData);

				if (responseData.name === "Error") {
					throw new NodeApiError(this.getNode(), responseData);
				}

				if (operation === "list" || operation === "listAll") {
					switch (resource) {
						case "payments":
							responseData = simplify(responseData, "payments");
							break;
						case "paymentLinks":
							responseData = simplify(responseData, "payment_links");
							break;
						case "methods":
							responseData = simplify(responseData, "methods");
							break;

						default:
							break;
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
