import * as Components from "@/components";
import { fetchProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await fetchProducts();
  if (!products) {
    return {
      notFound: true,
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Components.Products.ProductToggle products={products} />
      </main>
    </div>
  );
}
