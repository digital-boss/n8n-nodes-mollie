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
				value: 'createPayment',
				description: 'Create a refund for a payment.',
			},
            {
				name: 'Create Order Refund',
				value: 'createOrder',
				description: 'Create a refund for an order.',
			},
			{
				name: 'Delete Payment Refund',
				value: 'deletePayment',
				description: 'Delete a specific payment refund.',
			},
			{
				name: 'Get Payment Refund',
				value: 'getPayment',
				description: 'Get a specific payment refund.',
			},
			{
				name: 'List Refunds',
				value: 'list',
				description: 'Get data of all refunds.',
			},
            {
				name: 'List Payment Refunds',
				value: 'listPayment',
				description: 'Get data of all payment refunds.',
			},
            {
				name: 'List Order Refunds',
				value: 'listOrder',
				description: 'Get data of all order refunds.',
			},
		],
	},
];

export const refundsFields: INodeProperties[] = [
	/*-------------------------------------------------------------------------- */
	/*                                refunds:createPayment                      */
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
				operation: ['createPayment'],
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
				operation: ['createPayment'],
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
				operation: ['createPayment'],
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
				operation: ['createPayment'],
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
	/*                                refunds:createOrder                        */
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
				operation: ['createOrder'],
			},
		},
	},
	{
		displayName: 'Order Lines',
		name: 'orderLines',
		required: true,
		type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        displayOptions: {
			show: {
				resource: ['refunds'],
				operation: ['createOrder'],
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
                        required: false,
                        type: 'number',
                        default: '',
                    }
                ]
            }
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
				operation: ['createOrder'],
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
	/*                                refunds:deletePayment                       */
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
				operation: ['deletePayment'],
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
				operation: ['deletePayment'],
			},
		},
	},

	/*-------------------------------------------------------------------------- */
	/*                                refunds:getPayment	                     */
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
				operation: ['getPayment'],
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
				operation: ['getPayment'],
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
	/*                                refunds:listPayment                        */
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
				operation: ['listPayment'],
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
				operation: ['listPayment'],
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
	/*                                refunds:listOrder                          */
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
				operation: ['listOrder'],
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
				operation: ['listOrder'],
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