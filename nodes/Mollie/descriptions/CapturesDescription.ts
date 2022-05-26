import {
	INodeProperties,
} from 'n8n-workflow';

export const capturesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['captures'],
			},
		},
		default: 'listByPayment',
		description: 'The operation to perform',
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a specific capture',
			},
			{
				name: 'List',
				value: 'listByPayment',
				description: 'Retrieve a list of all captures created for a specific payment',
			},
		],
	},
];

export const capturesFields: INodeProperties[] = [
  {
		displayName: 'Payment ID',
		name: 'paymentId',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['captures'],
				operation: ['listByPayment', 'get'],
			},
		},
	},
  {
		displayName: 'ID',
		name: 'id',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['captures'],
				operation: ['get'],
			},
		},
	},
];
