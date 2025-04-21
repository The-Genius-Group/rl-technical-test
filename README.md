# Shopify Product Viewer

A Next.js application that displays Shopify products with pagination.

## Features

- Fetches products from Shopify's REST API
- Displays one product at a time
- Navigation between products using next/previous buttons
- Responsive design with Tailwind CSS
- Loading states and error handling

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Shopify store with API access
- GitHub CLI (for retrieving API credentials)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rl-technical-test
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Install GitHub CLI
npm i -g gh

# Login to GitHub
gh auth login

# Create environment file
touch .env.development.local

# Pull environment variables
gh variable list -e Local | ./env-pull.sh > .env.development.local
```

Required environment variables:
- `SHOPIFY_ACCESS_TOKEN`: Your Shopify API access token
- `SHOPIFY_SHOP`: Your Shopify store URL (e.g., 'your-store.myshopify.com')

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── products/      # Products API
│   └── page.tsx           # Home page
├── components/            # React Components
│   └── ProductList.tsx    # Product display component
└── app/globals.css        # Global styles
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Shopify REST API

## API Integration

The application uses Shopify's REST API to fetch product data. The API route (`/api/products`) handles:
- Pagination
- Product data transformation
- Error handling

## Contributing

1. Create a new branch with your name:
```bash
git checkout -b your-name-submission
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "Your commit message"
```

3. Push to your branch:
```bash
git push -u origin your-name-submission
```

## License

This project is part of a technical assessment and should not be used for production without proper authorization.
