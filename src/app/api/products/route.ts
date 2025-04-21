import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Validate environment variables
const shop = process.env.SHOPIFY_SHOP;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shop || !accessToken) {
  throw new Error('Missing required environment variables: SHOPIFY_SHOP or SHOPIFY_ACCESS_TOKEN');
}

// GraphQL query for products with cursor-based pagination
const createQuery = (cursor?: string) => `
  query {
    products(first: 10${cursor ? `, after: "${cursor}"` : ''}) {
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
          featuredImage {
            url
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

interface Product {
  id: string;
  title: string;
  description: string;
  images: { src: string }[];
  variants: { price: string }[];
  cursor: string;
}

// Store fetched products and cursors in memory cache
let productCache: Product[] = [];
let cursorMap: { [key: number]: string } = {};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    
    // If cache is empty or we're requesting a page we don't have cursors for,
    // fetch all products first
    if (productCache.length === 0 || (page > 1 && !cursorMap[page-1])) {
      await fetchAllProducts();
    }
    
    // Return the appropriate product for the requested page
    const index = page - 1;
    if (index < 0 || index >= productCache.length) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      products: [productCache[index]],
      pagination: {
        currentPage: page,
        totalPages: productCache.length,
        hasNextPage: page < productCache.length,
        hasPreviousPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Helper function to fetch all products using cursor pagination
async function fetchAllProducts() {
  let hasNextPage = true;
  let cursor: string | undefined = undefined;
  productCache = [];
  cursorMap = {};
  
  while (hasNextPage) {
    const response = await axios.post(
      `https://${shop}/api/2024-01/graphql.json`,
      {
        query: createQuery(cursor)
      },
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': accessToken as string,
          'Content-Type': 'application/json',
        }
      }
    );
    
    const responseData = response.data;
    if (!responseData.data?.products?.edges) {
      throw new Error('Invalid response structure from Shopify API');
    }
    
    // Transform product data
    const fetchedProducts = responseData.data.products.edges.map((edge: any) => {
      const product = edge.node;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        images: product.featuredImage ? [{ 
          src: product.featuredImage.url 
        }] : [],
        variants: [{
          price: product.priceRange.minVariantPrice.amount
        }],
        cursor: edge.cursor
      };
    });
    
    // Add to cache
    productCache.push(...fetchedProducts);
    
    // Update pagination info
    hasNextPage = responseData.data.products.pageInfo.hasNextPage;
    
    // Update cursor for next page
    if (hasNextPage && fetchedProducts.length > 0) {
      cursor = fetchedProducts[fetchedProducts.length - 1].cursor;
      cursorMap[productCache.length] = cursor;
    }
  }
  
  console.log(`Fetched ${productCache.length} products in total`);
} 