import { NextResponse } from 'next/server';

// Validate environment variables
const shop = process.env.SHOPIFY_SHOP;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shop || !accessToken) {
  throw new Error('Missing required environment variables: SHOPIFY_SHOP or SHOPIFY_ACCESS_TOKEN');
}

// Simple GraphQL query to test the connection
const query = `
  query {
    shop {
      name
      description
    }
  }
`;

export async function GET() {
  try {
    console.log(`Testing connection to: https://${shop}/api/2024-01/graphql.json`);
    console.log(`Using access token: ${(accessToken as string).substring(0, 5)}...`);
    
    const response = await fetch(
      `https://${shop}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': accessToken as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      }
    );
    
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries([...response.headers]), null, 2));
    console.log('Response body:', responseText);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `Shopify API error: ${response.status} ${response.statusText}`,
          details: responseText
        },
        { status: response.status }
      );
    }
    
    try {
      const data = JSON.parse(responseText);
      return NextResponse.json({ 
        success: true, 
        data,
        message: 'Successfully connected to Shopify Storefront API'
      });
    } catch (parseError) {
      return NextResponse.json(
        { 
          error: 'Failed to parse response as JSON',
          responseText
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error testing Shopify connection:', error);
    return NextResponse.json(
      { error: 'Failed to connect to Shopify API', details: String(error) },
      { status: 500 }
    );
  }
} 