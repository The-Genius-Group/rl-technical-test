/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_SHOP: process.env.SHOPIFY_SHOP,
    SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  },
};

module.exports = nextConfig; 