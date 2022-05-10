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
        description: "Make sure to send 2 decimals and omit the thousands separator, e.g. 'currency':'EUR', 'value':'1000.00' if you would want to charge €1000.00.",
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
            resource: ["paymentLinks"],          
          },
        },
        required: false,
      },
      {
        displayName: "Redirect Url",
        name: "redirectUrl",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["create"],
            resource: ["payments"],          
          },
        },
        required: false,
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
        required: false,
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
    const items = this.getInputData();

    let responseData;
    let body: any = {};
    let method = "";
    let uri = "";
    const returnData: IDataObject[] = [];

    const isLiveKey = this.getNodeParameter("isLiveKey", 0) as boolean;
    const operation = this.getNodeParameter("operation", 0) as string;
    const resource = this.getNodeParameter("resource", 0) as string;

    for (let i = 0; i < items.length; i++) {


      try {
        if (operation === "create") {
          method = "POST";
          if (resource === "payments") {
            uri = paymentUri;
            body.metadata = {
              order_id: this.getNodeParameter("order_id", i) as string,
            };
          } else if (resource === "paymentLinks") {
            uri = paymentLinksUri;
          }
          let value = this.getNodeParameter("value", i) as string

          body.amount = {
            currency: this.getNodeParameter("currency", i) as string,
            value: value.toString()
          };
          (body.description = this.getNodeParameter(
            "description",
            i
          ) as string),
            (body.redirectUrl = this.getNodeParameter(
              "redirectUrl",
              i
            ) as string),
            (body.webhookUrl = this.getNodeParameter(
              "webhookUrl",
              i
            ) as string);
        } else if (operation === "get") {
          method = "GET";
          if (resource === "payments") {
            uri = (paymentUri +
              "/" +
              this.getNodeParameter("paymentID", i)) as string;
          } else if (resource === "paymentLinks") {
            uri = (paymentLinksUri +
              "/" +
              this.getNodeParameter("paymentID", i)) as string;
          }
        } else if (operation === "getAll") {
          const limit = this.getNodeParameter("limit", i) as string;

          method = "GET";
          if (resource === "payments") {
            uri = "/payments" + "?limit=" + limit;
          } else if (resource === "paymentLinks") {
            uri = "/payment-links" + "?limit=" + limit;
          }
        } else if (operation === "delete") {
          method = "DELETE";
          uri = ("/payments/" +
            this.getNodeParameter("paymentID", i)) as string;
        } else if (operation === "update") {
          method = "PATCH";
          uri = ("/payments/" +
            this.getNodeParameter("paymentID", i)) as string;
          body.description = this.getNodeParameter(
            "updateDescription",
            i
          ) as string;
          (body.redirectUrl = this.getNodeParameter(
            "updateRedirectUrl",
            i
          ) as string),
            (body.webhookUrl = this.getNodeParameter(
              "updateWebhookUrl",
              i
            ) as string);
          let updateOrder_id = this.getNodeParameter(
            "updateOrder_id",
            i
          ) as string;
          if (updateOrder_id != "") {
            body.metadata = {
              order_id: this.getNodeParameter("updateOrder_id", i) as string,
            };
          }
        }

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

        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData as IDataObject[]);
        } else {
          returnData.push(responseData as IDataObject);
        }
      } catch (error) {
        returnData.push(error as IDataObject);
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
