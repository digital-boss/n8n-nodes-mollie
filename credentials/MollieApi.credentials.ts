import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MollieApi implements ICredentialType {
	name = 'mollieApi';
	displayName = 'Mollie API';
	documentationUrl = 'mollie';
	properties: INodeProperties[] = [
		{
			displayName: 'Test API Key',
			name: 'mollieTestApiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Live API Key',
			name: 'mollieApiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}