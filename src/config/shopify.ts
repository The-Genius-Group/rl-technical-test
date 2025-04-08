export function getShopifyConfig(): ShopifyConfig {
  const {
    SHOPIFY_STORE_NAME: storeName,
    SHOPIFY_ACCESS_TOKEN: accessToken,
    SHOPIFY_STORE_URL: storeUrl,
  } = process.env;

  if (!storeName) {
    throw new Error("Missing environment variable: SHOPIFY_STORE_NAME");
  }
  if (!accessToken) {
    throw new Error("Missing environment variable: SHOPIFY_ACCESS_TOKEN");
  }
  if (!storeUrl) {
    throw new Error("Missing environment variable: SHOPIFY_STORE_URL");
  }

  return {
    storeName,
    accessToken,
    storeUrl,
  };
}

interface ShopifyConfig {
  storeName: string;
  accessToken: string;
  storeUrl: string;
}
