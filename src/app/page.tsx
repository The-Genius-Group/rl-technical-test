import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-4">Our Products</h1>
      <ProductList />
    </main>
  );
}
