import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import * as crypto from "crypto";

const CREATE_PIXEL_MUTATION = `
    mutation webPixelCreate($webPixelInput: WebPixelInput!) {
        webPixelCreate(webPixel: $webPixelInput) {
            webPixel {
                settings
                id
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`;

export default async function pixelCreator(
  session
) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    await client.query({
        data: {
            query: CREATE_PIXEL_MUTATION,
            variables: {
                webPixelInput: {
                    settings: {
                      accountID: crypto.randomUUID(),
                    },
                },
            },
        },
    });
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}