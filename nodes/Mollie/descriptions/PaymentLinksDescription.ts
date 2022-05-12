import {
	INodeProperties,
} from 'n8n-workflow';

export const paymentLinksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
			},
		},
		default: 'getAll',
		description: 'The operation to perform.',
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an entry',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get data of an entry',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get data of all entries',
			},
		],
	},
];

export const paymentLinksFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                payments:create                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		description: 'Make sure to send 2 decimals and omit the thousands separator, e.g. \'currency\':\'EUR\', \'value\':\'1000.00\' if you would want to charge €1000.00.',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		displayName: 'Redirect Url',
		name: 'redirectUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
		required: false,
	},
	{
		displayName: 'Webhook Url',
		name: 'webhookUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
		required: false,
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:get	                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'paymentID',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['get'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:getAll                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Limit',
		name: 'limit',
		required: false,
		type: 'number',
		default: 250,
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['getAll'],
			},
		},
	},

];
