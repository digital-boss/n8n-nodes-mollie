import {
	INodeProperties,
} from 'n8n-workflow';

export const paymentsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['payments'],
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
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an entry',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an entry',
			},
		],
	},
];

export const paymentsFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                payments:create                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Currency',
		name: 'currency',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Value',
		name: 'value',
		required: true,
		type: 'string',
		description: 'Make sure to send 2 decimals and omit the thousands separator, e.g. \'currency\':\'EUR\', \'value\':\'1000.00\' if you would want to charge €1000.00.',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Redirect Url',
		name: 'redirectUrl',
		required: false,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Webhook Url',
		name: 'webhookUrl',
		required: false,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Order Id',
		name: 'order_id',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
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
				resource: ['payments'],
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
				resource: ['payments'],
				operation: ['getAll'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:delete                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'paymentID',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['delete'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:update                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'paymentID',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'updateDescription',
		required: false,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Redirect Url',
		name: 'updateRedirectUrl',
		required: false,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Webhook Url',
		name: 'updateWebhookUrl',
		required: false,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Order Id',
		name: 'updateOrderId',
		required: false,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['update'],
			},
		},
	},

];
