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
			default: '',
		},
		{
			displayName: 'Live API Key',
			name: 'mollieApiKey',
			type: 'string',
			default: '',
		},
	];
}