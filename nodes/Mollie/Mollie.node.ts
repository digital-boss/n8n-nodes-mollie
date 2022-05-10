import {IExecuteFunctions} from "n8n-core";
import {IDataObject, INodeExecutionData, INodeType, INodeTypeDescription,} from "n8n-workflow";

import {mollieApiRequest} from "./GenericFunctions";

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
          {
            name: "Methods",
            value: "methods",
          },
        ],
        default: "methods",
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
        description:
          "Make sure to send 2 decimals and omit the thousands separator, e.g. 'currency':'EUR', 'value':'1000.00' if you would want to charge €1000.00.",
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
      /*                     operations:getAll                                      */
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
      // ----------------------------------
      //        Method operations
      // ----------------------------------
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["methods"],
          },
        },
        options: [
          {
            name: "Get",
            value: "get",
            description: "Retrieve data of specific payments",
          },
          {
            name: "List",
            value: "list",
            description: "Retrieve details of all payments related to a profile",
          },
          {
            name: "List All",
            value: "listAll",
            description: "Retrieve all payments that mollie offers",
          },
        ],
        default: "list",
        description: "The operation to perform.",
      },
      /* -------------------------------------------------------------------------- */
      /*                              operations:get                                */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "ID",
        name: "methodID",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["get"],
          },
        },
        required: true,
      },
      {
        displayName: "Locale",
        name: "locale",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["get"],
          },
        },
        required: false,
      },
      {
        displayName: "Currency",
        name: "currency",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["get"],
          },
        },
        required: false,
      },
      /* -------------------------------------------------------------------------- */
      /*                                operations:list,listAll                     */
      /* -------------------------------------------------------------------------- */
      {
        displayName: "sequenceType",
        name: "sequenceType",
        type: "string",
        default: "oneoff",
        displayOptions: {
          show: {
            operation: ["list"],
          },
        },
        required: false,
      },
      {
        displayName: "Locale",
        name: "locale",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["list", "listAll"],
          },
        },
        required: false,
      },
      {
        displayName: "Currency",
        name: "currency",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["list", "listAll"],
          },
        },
        required: false,
      },
      {
        displayName: "Value",
        name: "value",
        type: "string",
        description: "Make sure to send 2 decimals and omit the thousands separator, e.g. 'currency':'EUR', 'value':'1000.00' if you would want to charge €1000.00.",
        default: "",
        displayOptions: {
          show: {
            operation: ["list", "listAll"],
          },
        },
        required: false,
      },
      {
        displayName: "Resource",
        name: "resource",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["list"],
          },
        },
        required: false,
      },
      {
        displayName: "Billing Country",
        name: "billingCountry",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["list"],
          },
        },
        required: false,
      },
      {
        displayName: "Wallet",
        name: "includeWallets",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["list"],
          },
        },
        required: false,
      },
      {
        displayName: "Categories",
        name: "orderLineCategories",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["list"],
          },
        },
        required: false,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const paymentUri = "/payments";
    const paymentLinksUri = "/payment-links";
    const methodLinkUri = "/methods";
    const items = this.getInputData();

    let responseData;
    let body: any = {};
    let method = "";
    let uri = "";
    const returnData: IDataObject[] = [];
    for (let i = 0; i < items.length; i++) {
      const isLiveKey = this.getNodeParameter("isLiveKey", i) as boolean;
      const operation = this.getNodeParameter("operation", i) as string;
      const resource = this.getNodeParameter("resource", i) as string;
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
          const value = this.getNodeParameter("value", i) as string;

          body.amount = {
            currency: this.getNodeParameter("currency", i) as string,
            value: value.toString(),
          };
          (body.description = this.getNodeParameter(
            "description",
            i
          ) as string);
          (body.redirectUrl = this.getNodeParameter(
            "redirectUrl",
            i
          ) as string);
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
          } else if (resource === "methods") {
            uri = (methodLinkUri +
              "/" +
              this.getNodeParameter("methodID", i)) as string;
          }
        } else if (operation === "list") {
          method = "GET";
          uri = methodLinkUri;
          const value = this.getNodeParameter("value", i) as string;

          body.amount = {
            currency: this.getNodeParameter("currency", i) as string,
            value: value.toString(),
          };
          body.sequenceType = this.getNodeParameter(
            "sequenceType",
            i
          ) as string;
          (body.locale = this.getNodeParameter(
            "locale",
            i
          ) as string);
          body.resource = this.getNodeParameter(
            "resource",
            i
          ) as string;
          (body.billingCountry = this.getNodeParameter(
            "billingCountry",
            i
          ) as string);
          (body.includeWallets = this.getNodeParameter(
            "includeWallets",
            i
          ) as string);
          (body.orderLineCategories = this.getNodeParameter(
            "orderLineCategories",
            i
          ) as string);

        } else if (operation === "listAll") {
          method = "GET";
          uri = methodLinkUri + "/all";
          const value = this.getNodeParameter("value", i) as string;

          body.amount = {
            currency: this.getNodeParameter("currency", i) as string,
            value: value.toString(),
          };
          body.locale = this.getNodeParameter(
            "locale",
            i
          ) as string;
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
          ) as string);
          (body.webhookUrl = this.getNodeParameter(
            "updateWebhookUrl",
            i
          ) as string);
          const updateOrderId = this.getNodeParameter(
            "updateOrderId",
            i
          ) as string;
          if (updateOrderId !== "") {
            body.metadata = {
              order_id: this.getNodeParameter("updateOrderId", i) as string,
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
        if (operation === "getAll" || operation === "ListAll" || operation === "list") {
          console.log(responseData);
          if (resource === "payments") {
            responseData = responseData["_embedded"]["payments"];
          } else if (resource === "paymentLinks") {
            responseData = responseData["_embedded"]["payment_links"];
          } else if (resource === "methods") {
            responseData = responseData["_embedded"]["methods"];
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
