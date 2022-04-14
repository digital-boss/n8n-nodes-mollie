import {
  IExecuteFunctions,
  IExecuteSingleFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
} from "n8n-core";

import { OptionsWithUri } from "request";

export async function mollieApiRequest(
  this:
    | IHookFunctions
    | IExecuteFunctions
    | IExecuteSingleFunctions
    | ILoadOptionsFunctions,
    method: string,
    body: any = {},
    uri: string,
    isLiveKey: boolean
): Promise<any> {
  const options: OptionsWithUri = {
    headers: {
      "Content-Type": "application/json",
    },
    body,
    method,
    uri: `https://api.mollie.com/v2${uri}`,
  };
  const credentials = await this.getCredentials("mollieApi");
  if (isLiveKey && credentials != undefined && credentials.mollieApiKey) {
    options.headers!["Authorization"] = "Bearer " + credentials.mollieApiKey;
  }
  else if(!isLiveKey && credentials != undefined && credentials.mollieTestApiKey){
    options.headers!["Authorization"] = "Bearer " + credentials.mollieTestApiKey;
  }
  return await this.helpers.request!(options);
}
