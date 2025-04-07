# Reverse Life Technical Task

## 1. Install Necessary Dependencies

To make API requests from your Next.js app, you will need some dependencies.

The example below uses axios, but you're free to choose any other library you're comfortable with for API requests.:

```
npm install axios
```

## 2. Authenticate with GitHub CLI and retrieve your Shopify API keys by running the following commands.

The output should be saved into a .env.development.local file with the necessary variables like SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, and SHOPIFY_STORE_DOMAIN

```
npm i -g gh
gh auth login
touch .env.development.local
gh variable list > .env.development.local
```

If you have any questions or issues retrieveing these credentials, reach out to claire@genius.co.uk

## 3. Fetch a list of products from Shopify's REST API
Use the Shopify REST API to fetch a list of products. You may use any method or approach you prefer for the implementation, as long as it integrates well with the Next.js app.

## 4. Display the product's information in the Next.js app
Create a simple layout that displays product information (title, price, main image, and description) for one product at a time. This layout can be as simple or elaborate as you wish, but focus on demonstrating the ability to fetch and display API data using React.

## 5. Create a toggle which switches between the fetched products and displays their information
Implement a toggle that allows the user to switch between different products and display their respective information. This should demonstrate your understanding of SSR (Server-Side Rendering) versus client-side React functionality, and your use of hooks and state management.
