import { INodeProperties } from 'n8n-workflow';

const localOptions = [
	{
		name: 'en_US',
		value: 'en_US',
	},
	{
		name: 'en_GB',
		value: 'en_GB',
	},
	{
		name: 'nl_NL',
		value: 'nl_NL',
	},
	{
		name: 'nl_BE',
		value: 'nl_BE',
	},
	{
		name: 'fr_FR',
		value: 'fr_FR',
	},
	{
		name: 'fr_BE',
		value: 'fr_BE',
	},
	{
		name: 'de_DE',
		value: 'de_DE',
	},
	{
		name: 'de_AT',
		value: 'de_AT',
	},
	{
		name: 'de_CH',
		value: 'de_CH',
	},
	{
		name: 'es_ES',
		value: 'es_ES',
	},
	{
		name: 'ca_ES',
		value: 'ca_ES',
	},
	{
		name: 'pt_PT',
		value: 'pt_PT',
	},
	{
		name: 'it_IT',
		value: 'it_IT',
	},
	{
		name: 'nb_NO',
		value: 'nb_NO',
	},
	{
		name: 'sv_SE',
		value: 'sv_SE',
	},
	{
		name: 'fi_FI',
		value: 'fi_FI',
	},
	{
		name: 'da_DK',
		value: 'da_DK',
	},
	{
		name: 'is_IS',
		value: 'is_IS',
	},
	{
		name: 'hu_HU',
		value: 'hu_HU',
	},
	{
		name: 'pl_PL',
		value: 'pl_PL',
	},
	{
		name: 'lv_LV',
		value: 'lv_LV',
	},
	{
		name: 'lt_LT',
		value: 'lt_LT',
	},
];

export const methodsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['methods'],
			},
		},
		default: 'list',
		description: 'The operation to perform',
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'Retrieve all enabled payment methods',
			},
			{
				name: 'List all',
				value: 'listAll',
				description:
					'Retrieve all payment methods that Mollie offers and can be activated by the Organization',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a single method by its ID',
			},
		],
	},
];

export const methodsFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                methods:list                             	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Optional parameters',
		name: 'optionalParameters',
		type: 'collection',
		placeholder: 'Add Options',
		default: {},
		displayOptions: {
			show: {
				resource: ['methods'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Sequence type',
				name: 'sequenceType',
				type: 'options',
				default: '',
				options: [
					{
						name: 'Oneoff',
						value: 'oneoff',
					},
					{
						name: 'First',
						value: 'first',
					},
					{
						name: 'Recurring',
						value: 'recurring',
					},
				],
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'options',
				default: '',
				options: localOptions,
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'json',
				default: '',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: '',
				options: [
					{
						name: 'Orders',
						value: 'orders',
					},
					{
						name: 'Payments',
						value: 'payments',
					},
				],
			},
			{
				displayName: 'Billing country',
				name: 'billingCountry',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Include Wallet',
				name: 'includeWallet',
				type: 'options',
				default: '',
				options: [
					{
						name: 'Apple pay',
						value: 'applepay',
					},
				],
			},
			{
				displayName: 'Order line category',
				name: 'orderLineCategory',
				type: 'string',
				default: '',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                methods:listAll                            */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Optional parameters',
		name: 'optionalParameters',
		type: 'collection',
		placeholder: 'Add Options',
		default: {},
		displayOptions: {
			show: {
				resource: ['methods'],
				operation: ['listAll'],
			},
		},
		options: [
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'options',
				default: '',
				options: localOptions,
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'json',
				default: '',
			},
		],
	},
	/*-------------------------------------------------------------------------- */
	/*                                methods:get                             	 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'ID',
		name: 'id',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['methods'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Optional parameters',
		name: 'optionalParameters',
		type: 'collection',
		placeholder: 'Add Options',
		default: {},
		displayOptions: {
			show: {
				resource: ['methods'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'options',
				default: '',
				options: localOptions,
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
			},
		],
	},
];
