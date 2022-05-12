import {
	INodeProperties,
} from 'n8n-workflow';

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

	/*-------------------------------------------------------------------------- */
	/*                                methods:listAll                            */
	/* ------------------------------------------------------------------------- */

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

];
