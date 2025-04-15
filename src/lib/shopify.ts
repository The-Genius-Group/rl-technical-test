const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

export async function fetchProducts() {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    } as HeadersInit,
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  return result.data.products.edges.map(({ node }: any) => ({
    title: node.title,
    description: node.description,
    image: node.images.edges[0]?.node.url ?? "",
    presentmentPrice: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
  }));
}
