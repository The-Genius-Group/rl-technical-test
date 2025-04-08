# Reverse Life Technical Task

## 1. Install Necessary Dependencies

To make API requests from your Next.js app, you will need some dependencies.

The example below uses axios, but you're free to choose any other library you're comfortable with for API requests.:

```
npm install axios
```

## 2. Authenticate with GitHub CLI and retrieve your Shopify API keys by running the following commands.

The output should be saved into a .env.development.local file with the necessary variables like SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_NAME and SHOPIFY_STORE_URL

```
npm i -g gh
gh auth login
touch .env.development.local
gh variable list -e Local | ./env-pull.sh > .env.development.local
```

If you have any questions or issues retrieveing these credentials, reach out to claire@genius.co.uk

## 3. Fetch a list of products from Shopify's REST API
Use the Shopify REST API to fetch a list of products. You may use any method or approach you prefer for the implementation, as long as it integrates well with the Next.js app.

## 4. Display the product's information in the Next.js app
Create a simple layout that displays product information (title, price, main image, and description) for one product at a time. This layout can be as simple or elaborate as you wish, but focus on demonstrating the ability to fetch and display API data using React.

## 5. Create a toggle which switches between the fetched products and displays their information
Implement a toggle that allows the user to switch between different products and display their respective information. This should demonstrate your understanding of SSR (Server-Side Rendering) versus client-side React functionality, and your use of hooks and state management.

## 6. Test your changes and ensure the solution is functional
We are not looking for robust testing, just a functional solution with no major errors.
You can run the below command to serve the NextJS application on localhost and check it runs correctly
```
npm run dev & open http://localhost:3000
```
## 6. Commit and push your changes to a branch containing your name
e.g. `git push -u origin michael-holland-submission`
