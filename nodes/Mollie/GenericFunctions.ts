import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import { OptionsWithUri } from 'request';
import {IDataObject} from 'n8n-workflow';

export async function mollieApiRequest(
	this:
		| IHookFunctions
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| ILoadOptionsFunctions,
		method: string,
		endpoint: string,
		qs: IDataObject = {},
		body: IDataObject = {},
		isLiveKey: boolean,
		uri?: string,
	// tslint:disable-next-line:no-any
): Promise<any> {

	const options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json',
		},
		qs,
		body,
		method,
		uri: uri || `https://api.mollie.com/v2${endpoint}`,
	};
	const credentials = await this.getCredentials('mollieApi');
	if (isLiveKey && credentials !== undefined && credentials.mollieApiKey) {
		options.headers!['Authorization'] = 'Bearer ' + credentials.mollieApiKey;
	}
	else if(!isLiveKey && credentials !== undefined && credentials.mollieTestApiKey){
		options.headers!['Authorization'] = 'Bearer ' + credentials.mollieTestApiKey;
	}
	return await this.helpers.request!(options);
}
