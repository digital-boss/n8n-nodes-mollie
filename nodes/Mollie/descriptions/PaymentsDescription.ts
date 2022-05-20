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
				name: 'Delete',
				value: 'delete',
				description: 'Delete an entry',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get data of an entry',
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get data of all entries',
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
		displayName: 'Order ID',
		name: 'orderId',
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
		displayName: 'Currency',
		name: 'currency',
		required: true,
		type: 'string',
		default: '',
		description: 'Make sure to send 2 decimals and omit the thousands separator, e.g. "currency":"EUR", "value":"1000.00" if you would want to charge €1000.00.',
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
		default: '',
		description: 'Make sure to send 2 decimals and omit the thousands separator, e.g. "currency":"EUR", "value":"1000.00" if you would want to charge €1000.00.',
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
		displayName: 'Redirect URL',
		name: 'redirectUrl',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:delete                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'id',
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
	/*                                payments:get	                             */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'id',
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
	/*                                payments:list                              */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 250,
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:update                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'id',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Redirect Url',
				name: 'redirectUrl',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Webhook Url',
				name: 'webhookUrl',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Order Id',
				name: 'orderId',
				type: 'string',
				default: '',
			},
		],
	},

];
