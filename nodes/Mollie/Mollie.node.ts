import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

import {
	mollieApiRequest,
	simplify
} from './GenericFunctions';

import {
	methodsFields,
	methodsOperations,
	paymentLinksFields,
	paymentLinksOperations,
	paymentsFields,
	paymentsOperations,
	refundsFields,
	refundsOperations,
	capturesFields,
	capturesOperations
} from './descriptions';

import { version } from '../version';

export class Mollie implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mollie',
		name: 'mollie',
		icon: 'file:mollie.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume Mollie API (v.${version})`,
		defaults: {
			name: 'Mollie',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'mollieApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Live Api Key',
				name: 'isLiveKey',
				required: true,
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Resource',
				name: 'resource',
				required: true,
				type: 'options',
				options: [
					{
						name: 'Payments',
						value: 'payments',
					},
					{
						name: 'Payment links',
						value: 'paymentLinks',
					},
					{
						name: 'Methods',
						value: 'methods',
					},
					{
						name: 'Refunds',
						value: 'refunds',
					},
					{
						name: 'Captures',
						value: 'captures',
					},
				],
				default: 'payments',
			},
			...paymentsOperations,
			...paymentsFields,
			...paymentLinksOperations,
			...paymentLinksFields,
			...methodsOperations,
			...methodsFields,
			...refundsOperations,
			...refundsFields,
			...capturesOperations,
			...capturesFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const body: IDataObject = {};
		const qs: IDataObject = {};
		let method = '';
		let endpoint = '';
		const returnData: IDataObject[] = [];

		const isLiveKey = this.getNodeParameter('isLiveKey', 0) as boolean;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				switch (resource) {
					case 'payments':
						const paymentUrl = '/payments';
						switch (operation) {
							case 'create':
								// ----------------------------------
								//        payments:create
								// ----------------------------------
								endpoint = paymentUrl;
								method = 'POST';
								body.metadata = {
									order_id: this.getNodeParameter('orderId', i) as string,
								};
								body.amount = {
									currency: this.getNodeParameter('currency', i) as string,
									value: (
										this.getNodeParameter('value', i) as string
									).toString(), // Ensure sending a string value
								};
								body.description = this.getNodeParameter('description', i) as string;
								body.redirectUrl = this.getNodeParameter('redirectUrl', i) as string;
								Object.assign(body, this.getNodeParameter('additionalFields', i) as IDataObject);
								break;

							case 'delete':
								// ----------------------------------
								//        payments:delete
								// ----------------------------------
								endpoint = (paymentUrl + '/' + this.getNodeParameter('id', i)) as string;
								method = 'DELETE';
								break;

							case 'get':
								// ----------------------------------
								//        payments:get
								// ----------------------------------
								endpoint = (paymentUrl + '/' + this.getNodeParameter('id', i)) as string;
								method = 'GET';
								break;

							case 'list':
								// ----------------------------------
								//        payments:list
								// ----------------------------------
								endpoint = paymentUrl;
								method = 'GET';
								Object.assign(qs, this.getNodeParameter('additionalParameters', i) as IDataObject);
								break;

							case 'update':
								// ----------------------------------
								//        payments:update
								// ----------------------------------
								endpoint = (paymentUrl + '/' + this.getNodeParameter('id', i)) as string;
								method = 'PATCH';
								Object.assign(body, this.getNodeParameter('additionalFields', i) as IDataObject);
								break;

							default:
								break;
						}
						break;

					case 'paymentLinks':
						const paymentLinksUrl = '/payment-links';
						switch (operation) {
							case 'create':
								// ----------------------------------
								//        paymentLinks:create
								// ----------------------------------
								endpoint = paymentLinksUrl;
								method = 'POST';
								body.amount = {
									currency: this.getNodeParameter('currency', i) as string,
									value: (this.getNodeParameter('value', i) as string).toString(), // Ensure sending a string value
								};
								body.description = this.getNodeParameter('description', i) as string;
								Object.assign(body, this.getNodeParameter('additionalFields', i) as IDataObject);
								break;

							case 'get':
								// ----------------------------------
								//        paymentLinks:get
								// ----------------------------------
								endpoint = (paymentLinksUrl + '/' + this.getNodeParameter('id', i)) as string;
								method = 'GET';
								break;

							case 'list':
								// ----------------------------------
								//        paymentLinks:list
								// ----------------------------------
								endpoint = paymentLinksUrl;
								method = 'GET';
								Object.assign(qs, this.getNodeParameter('additionalParameters',i) as IDataObject);
								break;

							default:
								break;
						}

						break;

					case 'methods':
						let additionalParameters = null;
						const methodsUri = '/methods';

						switch (operation) {
							case 'list':
								// ----------------------------------
								//        methods:list
								// ----------------------------------
								additionalParameters = this.getNodeParameter('additionalParameters',i) as IDataObject;

								endpoint = methodsUri;
								method = 'GET';

								Object.assign(qs, {
									...additionalParameters,
									amount: {
										currency: additionalParameters.currency,
										value: additionalParameters.value,
									},
								});

								delete qs.currency;
								delete qs.value;
								break;

							case 'listAll':
								// ----------------------------------
								//        methods:listAll
								// ----------------------------------
								additionalParameters = this.getNodeParameter('additionalParameters', i) as IDataObject;

								endpoint = `${methodsUri}/all`;
								method = 'GET';
								Object.assign(qs, {
									...additionalParameters,
									amount: {
										currency: additionalParameters.currency,
										value: additionalParameters.value,
									},
								});

								delete qs.currency;
								delete qs.value;
								break;

							case 'get':
								// ----------------------------------
								//        methods:get
								// ----------------------------------
								endpoint = `${methodsUri}/${this.getNodeParameter('id', i)}`;
								method = 'GET';
								Object.assign(qs, this.getNodeParameter('additionalParameters', i) as IDataObject);
								break;

							default:
								break;
						}
						break;

						case 'refunds':
							switch (operation) {
								case 'createByPayment':
									// ----------------------------------
									//        refunds:createByPayment
									// ----------------------------------
									endpoint = '/payments/' + this.getNodeParameter('id', i) as string + '/refunds';
									method = 'POST';
									body.amount = {
										currency: this.getNodeParameter('currency', i) as string,
										value: (this.getNodeParameter('value', i) as string).toString(), // Ensure sending a string value
									};
									Object.assign(body, this.getNodeParameter('additionalFields', i) as IDataObject);
									break;

								case 'createByOrder':
									// ----------------------------------
									//        refunds:createByOrder
									// ----------------------------------
									endpoint = '/orders/' + this.getNodeParameter('orderId', i) as string + '/refunds';
									method = 'POST';

									const orderLines = this.getNodeParameter('orderLines', i) as IDataObject;

									if (Object.keys(orderLines).length === 0) {
										// if no orderLines set lines to empty array
										body.lines = [];
									} else {
										body.lines = (orderLines.lines as IDataObject[]).map(
											(x: IDataObject)  => {
												// assign lines.currency to lines.amount.currency
												if (x.currency) {
													if (!x.amount) {
														x.amount = {};
													}
													Object.assign(x.amount, { currency: x.currency });
													delete x.currency;
												}
												// assign lines.value to lines.amount.value
												if (orderLines.value) {
													if (!x.amount) {
														x.amount = {};
													}
													Object.assign(x.amount, { value: x.value });
													delete x.value;
												}

												// remove empty inputs
												Object.keys(x).forEach(key => {
													if (x[key] === '') {
														delete x[key];
													}
												});
											},
										);
									}

									Object.assign(body, this.getNodeParameter('additionalFields', i) as IDataObject);
									break;

								case 'deleteByPayment':
									// ----------------------------------
									//        payments:deleteByPayment
									// ----------------------------------
									endpoint = '/payments/' + this.getNodeParameter('paymentId', i) as string + '/refunds/' + this.getNodeParameter('id', i) as string;
									method = 'DELETE';
									break;

								case 'getByPayment':
									// ----------------------------------
									//        payments:getByPayment
									// ----------------------------------
									endpoint = '/payments/' + this.getNodeParameter('paymentId', i) as string + '/refunds/' + this.getNodeParameter('id', i) as string;
									method = 'GET';
									break;

								case 'list':
									// ----------------------------------
									//        payments:list
									// ----------------------------------
									endpoint = '/refunds';
									method = 'GET';
									Object.assign(qs, this.getNodeParameter('additionalParameters', i) as IDataObject);
									break;

								case 'listByPayment':
									// ----------------------------------
									//        payments:listByPayment
									// ----------------------------------
									endpoint = '/payments/' + this.getNodeParameter('paymentId', i) as string + '/refunds';
									method = 'GET';
									Object.assign(qs, this.getNodeParameter('additionalParameters', i) as IDataObject);
									break;

								case 'listByOrder':
									// ----------------------------------
									//        payments:listByOrder
									// ----------------------------------
									endpoint = '/orders/' + this.getNodeParameter('orderId', i) as string + '/refunds';
									method = 'GET';
									Object.assign(qs, this.getNodeParameter('additionalParameters', i) as IDataObject);
									break;

								default:
									break;
							}
							break;

					case 'captures':
						switch (operation) {
							case 'listByPayment':
								endpoint = '/payments/' + this.getNodeParameter('paymentId', i) as string + '/captures';
								method = 'GET';
								break;
						
							case 'get':
								endpoint = '/payments/' + this.getNodeParameter('paymentId', i) as string + '/captures/' + this.getNodeParameter('id', i) as string;
								method = 'GET';
								break;
						}
						break;
					
					default:
						break;
				}

				responseData = await mollieApiRequest.call(this, method, endpoint, qs, body, isLiveKey);

				if(!responseData) {
					responseData = { success: true };
				}

				if (responseData?.name === 'Error') {
					throw new NodeApiError(this.getNode(), responseData);
				}

				if (operation.startsWith('list')) {
					switch (resource) {
						case 'payments':
							responseData = simplify(responseData, 'payments');
							break;
						case 'paymentLinks':
							responseData = simplify(responseData, 'payment_links');
							break;
						case 'methods':
							responseData = simplify(responseData, 'methods');
							break;
						case 'refunds':
							responseData = simplify(responseData, 'refunds');
							break;
						case 'captures':
							responseData = simplify(responseData, 'captures');
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
