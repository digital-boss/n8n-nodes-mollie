import { OptionsWithUri } from 'request';

import {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	NodeApiError
} from 'n8n-workflow';

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
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		qs,
		body,
		uri: uri || `https://api.mollie.com/v2${endpoint}`,
		json: true,
	};

	if (Object.keys(options.qs).length === 0) {
		delete options.qs;
	}
	if (Object.keys(options.body).length === 0) {
		delete options.body;
	}

	const credentials = await this.getCredentials('mollieApi');
	if (isLiveKey && credentials !== undefined && credentials.mollieApiKey) {
		options.headers!['Authorization'] = 'Bearer ' + credentials.mollieApiKey;
	}
	else if(!isLiveKey && credentials !== undefined && credentials.mollieTestApiKey){
		options.headers!['Authorization'] = 'Bearer ' + credentials.mollieTestApiKey;
	}

	try {
		return this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function simplify(jsonData: IDataObject, propertyName: string): IDataObject {
	return (jsonData['_embedded'] as IDataObject)[propertyName] as IDataObject || jsonData;
}
