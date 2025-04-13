"use server";
import axios from "axios"; 

export default async function fetchProductsAction() {
  const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
    throw new Error('Missing Shopify credentials');
  }

  try {
    const response = await axios.get(`${SHOPIFY_STORE_URL}/admin/api/2023-10/products.json`, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    return response.data.products;
  } catch (error: any) {
    console.error('Shopify fetch error:', error.response?.data || error.message);
    return [];
  }
}
