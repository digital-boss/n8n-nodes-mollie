import { IExecuteFunctions } from "n8n-core";
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
} from "n8n-workflow";

import { mollieApiRequest } from "./GenericFunctions";

export class Mollie implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Mollie",
    name: "mollie",
    icon: "file:mollie.png",
    group: ["transform"],
    version: 1,
    description: "Mollie REST API",
    defaults: {
      name: "Mollie",
      color: "#772244",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "mollieApi",
        required: true,
      },
    ],

    properties: [
      // ----------------------------------
      //         API Key to choose
      // ----------------------------------

      {
        displayName: "Live Api Key",
        name: "isLiveKey",
        type: "boolean",
        default: true,
        required: true,
      },
      // ----------------------------------
      //         Resource
      // ----------------------------------

      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: [
          {
            name: "Payments",
            value: "payments",
          },
          {
            name: "Payment links",
            value: "paymentLinks",
          },
        ],
        default: "payments",
        required: true,
      },
      // ----------------------------------
      //        Payment operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["payments"],
          },
        },
        options: [
          {
            name: "Create",
            value: "create",
            description: "Create an entry",
          },
          {
            name: "Get",
            value: "get",
            description: "Get data of an entry",
          },
          {
            name: "Get All",
            value: "getAll",
            description: "Get data of all entries",
          },
          {
            name: "Delete",
            value: "delete",
            description: "Delete an entry",
          },
          {
            name: "Update",
            value: "update",
            description: "Update an entry",
            displayOptions: {
              show: {
                resource: ["payments"],
              },
            },
          },
        ],
        default: "getAll",
        description: "The operation to perform.",
      },
      // ----------------------------------
      //        Payment links operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["paymentLinks"],
          },
        },
        options: [
          {
            name: "Create",
            value: "create",
            description: "Create an entry",
          },
          {
            name: "Get",
            value: "get",
            description: "Get data of an entry",
          },
          {
            name: "Get All",
            value: "getAll",
            description: "Get data of all entries",
          },
        ],
        default: "getAll",
        description: "The operation to perform.",
      },

      /* -------------------------------------------------------------------------- */
      /*                           operation:create                                 */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "Currency",
        name: "currency",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
          },
        },
        required: true,
      },
      {
        displayName: "Value",
        name: "value",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
          },
        },
        required: true,
      },
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
          },
        },
        required: true,
      },
      {
        displayName: "Redirect Url",
        name: "redirectUrl",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
          },
        },
        required: true,
      },
      {
        displayName: "Webhook Url",
        name: "webhookUrl",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
          },
        },
        required: true,
      },
      {
        displayName: "Order Id",
        name: "order_id",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
            resource: ["payments"],
          },
        },
        required: true,
      },

      /* -------------------------------------------------------------------------- */
      /*                     operations:get,delete,update                           */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "ID",
        name: "paymentID",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["get", "delete", "update"],
          },
        },
        required: true,
      },

      /* -------------------------------------------------------------------------- */
      /*                           operation:update                                 */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "Description",
        name: "updateDescription",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["update"],
          },
        },
        required: false,
      },
      {
        displayName: "Redirect Url",
        name: "updateRedirectUrl",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["update"],
          },
        },
        required: false,
      },
      {
        displayName: "Webhook Url",
        name: "updateWebhookUrl",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["update"],
          },
        },
        required: false,
      },
      {
        displayName: "Order Id",
        name: "updateOrder_id",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["update"],
          },
        },
        required: false,
      },

      /* -------------------------------------------------------------------------- */
      /*                     operations:getAll                      */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "Limit",
        name: "limit",
        type: "number",
        default: 250,
        displayOptions: {
          show: {
            operation: ["getAll"],
          },
        },
        required: false,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const paymentUri = "/payments";
    const paymentLinksUri = "/payment-links";

    let responseData;
    let body: any = {};
    let method = "";
    let uri = "";
    const returnData: IDataObject[] = [];

    const isLiveKey = this.getNodeParameter("isLiveKey", 0) as boolean;
    const operation = this.getNodeParameter("operation", 0) as string;
    const resource = this.getNodeParameter("resource", 0) as string;

    if (operation === "create") {
      method = "POST";
      if (resource === "payments") {
        uri = paymentUri;
        body.metadata = {
          order_id: this.getNodeParameter("order_id", 0) as string,
        };
      } else if (resource === "paymentLinks") {
        uri = paymentLinksUri;
      }
      body.amount = {
        currency: this.getNodeParameter("currency", 0) as string,
        value: this.getNodeParameter("value", 0) as string,
      };
      (body.description = this.getNodeParameter("description", 0) as string),
        (body.redirectUrl = this.getNodeParameter("redirectUrl", 0) as string),
        (body.webhookUrl = this.getNodeParameter("webhookUrl", 0) as string);
    } else if (operation === "get") {
      method = "GET";
      if (resource === "payments") {
        uri = (paymentUri +
          "/" +
          this.getNodeParameter("paymentID", 0)) as string;
      } else if (resource === "paymentLinks") {
        uri = (paymentLinksUri +
          "/" +
          this.getNodeParameter("paymentID", 0)) as string;
      }
    } else if (operation === "getAll") {
      const limit = this.getNodeParameter("limit", 0) as string;

      method = "GET";
      if (resource === "payments") {
        uri = "/payments" + "?limit=" + limit;
      } else if (resource === "paymentLinks") {
        uri = "/payment-links" + "?limit=" + limit;
      }
    } else if (operation === "delete") {
      method = "DELETE";
      uri = ("/payments/" + this.getNodeParameter("paymentID", 0)) as string;
    } else if (operation === "update") {
      method = "PATCH";
      uri = ("/payments/" + this.getNodeParameter("paymentID", 0)) as string;
      body.description = this.getNodeParameter(
        "updateDescription",
        0
      ) as string;
      (body.redirectUrl = this.getNodeParameter(
        "updateRedirectUrl",
        0
      ) as string),
        (body.webhookUrl = this.getNodeParameter(
          "updateWebhookUrl",
          0
        ) as string);
      let updateOrder_id = this.getNodeParameter("updateOrder_id", 0) as string;
      if (updateOrder_id != "") {
        body.metadata = {
          order_id: this.getNodeParameter("updateOrder_id", 0) as string,
        };
      }
    }

    try {
      responseData = await mollieApiRequest.call(
        this,
        method,
        body,
        uri,
        isLiveKey
      );
      responseData = JSON.parse(responseData);
      if (operation === "getAll") {
        console.log(responseData);
        if (resource === "payments") {
          responseData = responseData["_embedded"]["payments"];
        } else if (resource === "paymentLinks") {
          responseData = responseData["_embedded"]["payment_links"];
        }
      }
    } catch (error) {
      returnData.push(error as IDataObject);
    }

    if (Array.isArray(responseData)) {
      returnData.push.apply(returnData, responseData as IDataObject[]);
    } else {
      returnData.push(responseData as IDataObject);
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
