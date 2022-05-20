import {
	INodeProperties,
} from 'n8n-workflow';

export const refundsOperations: INodeProperties[] = [
	{
		displayName: 'Refund',
		name: 'operation',
		required: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['refunds'],
			},
		},
		default: 'getAll',
		description: 'The operation to perform.',
		options: [
			{
				name: 'Create Payment Refund',
				value: 'createByPayment',
				description: 'Create a refund for a payment.',
			},
			{
				name: 'Create Order Refund',
				value: 'createByOrder',
				description: 'Create a refund for an order.',
			},
			{
				name: 'Delete Payment Refund',
				value: 'deleteByPayment',
				description: 'Delete a specific payment refund.',
			},
			{
				name: 'Get Payment Refund',
				value: 'getByPayment',
				description: 'Get a specific payment refund.',
			},
			{
				name: 'List Refunds',
				value: 'list',
				description: 'Get data of all refunds.',
			},
			{
				name: 'List Payment Refunds',
				value: 'listByPayment',
				description: 'Get data of all payment refunds.',
			},
			{
				name: 'List Order Refunds',
				value: 'listByOrder',
				description: 'Get data of all order refunds.',
			},
		],
	},
];

export const refundsFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                refunds:createByPayment                    */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Payment ID',
		name: 'id',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['createByPayment'],
			},
		},
	},
	{
		displayName: 'Currency',
		name: 'currency',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['createByPayment'],
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
				resource: ['refunds'],
				operation: ['createByPayment'],
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
				resource: ['refunds'],
				operation: ['createByPayment'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:createByOrder                      */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Order ID',
		name: 'orderId',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['createByOrder'],
			},
		},
	},
	{
		displayName: 'Order Lines',
		name: 'orderLines',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Order Line',
		default: {},
		description: 'An array of objects containing the order line details you want to create a refund for. If you send an empty array, the entire order will be refunded.',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['createByOrder'],
			},
		},
		options: [
			{
				displayName: 'Lines',
				name: 'lines',
					values: [
					{
						displayName: 'Order Line ID',
						name: 'id',
						required: true,
						type: 'string',
						default: '',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: '',
						description: 'The amount that you want to refund. In almost all cases, Mollie can determine the amount automatically. Make sure to send 2 decimals and omit the thousands separator, e.g. "currency":"EUR", "value":"1000.00" if you would want to charge €1000.00.',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The amount that you want to refund. In almost all cases, Mollie can determine the amount automatically. Make sure to send 2 decimals and omit the thousands separator, e.g. "currency":"EUR", "value":"1000.00" if you would want to charge €1000.00.',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['createByOrder'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: 'The description of the refund you are creating. This will be shown to the consumer on their card or bank statement when possible. Max. 140 characters.',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'string',
				default: 'Provide any data you like, for example a string or a JSON object. We will save the data alongside the refund. Whenever you fetch the refund with our API, we will also include the metadata. You can use up to approximately 1kB.',
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:deleteByPayment                       */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Refund ID',
		name: 'id',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['deleteByPayment'],
			},
		},
	},
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['deleteByPayment'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:getByPayment	                     */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Refund ID',
		name: 'id',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['getByPayment'],
			},
		},
	},
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['getByPayment'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:list                               */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 250,
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:listByPayment                      */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['listByPayment'],
			},
		},
	},
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['listByPayment'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 250,
			},
		],
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:listByOrder                        */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Order ID',
		name: 'orderId',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['listByOrder'],
			},
		},
	},
	{
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['listByOrder'],
			},
		},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 250,
			},
		],
	},

];
