import { NextRequest, NextResponse } from 'next/server';

// Validate environment variables
const shop = process.env.SHOPIFY_SHOP;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shop || !accessToken) {
  throw new Error('Missing required environment variables: SHOPIFY_SHOP or SHOPIFY_ACCESS_TOKEN');
}

// GraphQL query for products with pagination
const createQuery = (cursor?: string) => `
  query {
    products(first: 1${cursor ? `, after: "${cursor}"` : ''}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
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
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');

    const response = await fetch(
      `https://${shop}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': accessToken as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: createQuery(cursor || undefined) }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Shopify API error:', errorData);
      return NextResponse.json(
        { error: `Shopify API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('Shopify API Response:', JSON.stringify(data, null, 2));
    
    if (!data.data) {
      console.error('Invalid response structure:', data);
      return NextResponse.json(
        { error: 'Invalid response structure from Shopify API' },
        { status: 500 }
      );
    }
    
    // Transform the GraphQL response to match our expected format
    const products = data.data.products.edges.map((edge: any) => {
      const product = edge.node;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        images: product.images.edges.map((imageEdge: any) => ({
          src: imageEdge.node.url
        })),
        variants: product.variants.edges.map((variantEdge: any) => ({
          price: variantEdge.node.price.amount
        })),
        cursor: edge.cursor
      };
    });
    
    return NextResponse.json({
      products,
      pageInfo: data.data.products.pageInfo,
      lastCursor: products.length > 0 ? products[products.length - 1].cursor : null
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 