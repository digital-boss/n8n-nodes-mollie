import {
	IExecuteFunctions
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	mollieApiRequest
} from './GenericFunctions';
import {
	methodsFields,
	methodsOperations,
	paymentLinksFields,
	paymentLinksOperations,
	paymentsFields,
	paymentsOperations,
} from './descriptions';

export class Mollie implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mollie',
		name: 'mollie',
		icon: 'file:mollie.png',
		group: ['transform'],
		version: 1,
		description: 'Mollie REST API',
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
				],
				default: 'payments',
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
		const paymentUri = '/payments';
		const paymentLinksUri = '/payment-links';
		const methodsUri = '/methods';
		const items = this.getInputData();

		let responseData;
		const body: IDataObject = {};
		let method = '';
		let uri = '';
		const returnData: IDataObject[] = [];
		for (let i = 0; i < items.length; i++) {
			const isLiveKey = this.getNodeParameter('isLiveKey', i) as boolean;
			const operation = this.getNodeParameter('operation', i) as string;
			const resource = this.getNodeParameter('resource', i) as string;

			try {
				switch (operation) {
					case 'create':
						method = 'POST';
						if (resource === 'payments') {
							uri = paymentUri;
							body.metadata = {
								order_id: this.getNodeParameter('order_id', i) as string,
							};
						} else if (resource === 'paymentLinks') {
							uri = paymentLinksUri;
						}
						body.amount = {
							currency: this.getNodeParameter('currency', i) as string,
							value: this.getNodeParameter('value', i)?.toString() as string,
						};
						(body.description = this.getNodeParameter('description', i) as string);
							(body.redirectUrl = this.getNodeParameter('redirectUrl', i) as string);
							(body.webhookUrl = this.getNodeParameter('webhookUrl', i) as string);
						break;

					case 'list':
						method = 'GET';
						uri = methodsUri;
						break;

					case 'listAll':
						method = 'GET';
						uri = `${methodsUri}/all`;
						break;

					case 'get':
						method = 'GET';
						if (resource === 'payments') {
							uri = (paymentUri + '/' + this.getNodeParameter('paymentID', i)) as string;
						} else if (resource === 'paymentLinks') {
							uri = (paymentLinksUri +
								'/' +
								this.getNodeParameter('paymentID', i)) as string;
						} else if (resource === 'methods') {
							uri = (methodsUri + '/' + this.getNodeParameter('paymentID', i)) as string;
						}
						break;

					case 'getAll':
						const limit = this.getNodeParameter('limit', i) as string;

						method = 'GET';
						if (resource === 'payments') {
							uri = '/payments' + '?limit=' + limit;
						} else if (resource === 'paymentLinks') {
							uri = '/payment-links' + '?limit=' + limit;
						}
						break;

					case 'delete':
						method = 'DELETE';
						uri = ('/payments/' + this.getNodeParameter('paymentID', i)) as string;
						break;

					case 'update':
						method = 'PATCH';
						uri = ('/payments/' + this.getNodeParameter('paymentID', i)) as string;
						body.description = this.getNodeParameter('updateDescription', i) as string;
						(body.redirectUrl = this.getNodeParameter('updateRedirectUrl', i) as string);
							(body.webhookUrl = this.getNodeParameter('updateWebhookUrl', i) as string);
						const updateOrderId = this.getNodeParameter('updateOrderId', i) as string;
						if (updateOrderId !== '') {
							body.metadata = {
								order_id: updateOrderId,
							};
						}
						break;

					default:
						break;
				}

				responseData = await mollieApiRequest.call(this, method, body, uri, isLiveKey);
				responseData = JSON.parse(responseData);

				if (operation === 'getAll') {
					switch (resource) {
						case 'payments':
							responseData = responseData['_embedded']['payments'];
							break;
						case 'paymentLinks':
							responseData = responseData['_embedded']['payment_links'];
							break;
						case 'methods':
							responseData = responseData['_embedded']['methods'];
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
				returnData.push(error as IDataObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
