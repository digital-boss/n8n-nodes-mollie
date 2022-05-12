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
		default: 'list',
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
				name: 'List',
				value: 'list',
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
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
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
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
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
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
				operation: ['create'],
			},
		},
		options: [
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
		],
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
				resource: ['paymentLinks'],
				operation: ['get'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                payments:list                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentLinks'],
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

];
