
import ProductCard from "./ProductCard";

const getProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch products: ${res.status}`);
    return [];
  }

  const data = await res.json();

  const products = Array.isArray(data.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : [];

  return products;
};

const Products = async () => {
  const allProducts = await getProducts();

  const increasedProducts = allProducts
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct ?? 0)) -
        Math.abs(Number(a.change?.pct ?? 0))
    )
    .slice(0, 6);

  const decreasedProducts = allProducts
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct ?? 0)) -
        Math.abs(Number(a.change?.pct ?? 0))
    )
    .slice(0, 6);

  const renderProducts = (products) => (
    <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );

  return (
    <section id="product" className="scroll-mt-24 bg-[#f4f9f1]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {allProducts.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            এই মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না।
            কিছুক্ষণ পরে আবার চেষ্টা করুন।
          </p>
        ) : (
          <>
            <div className="py-6">
              <h1 className="flex gap-2 text-2xl font-bold">
                <i className="fa-solid fa-caret-up pt-2 text-red-600"></i>
                আজ দাম বেড়েছে
              </h1>
            </div>

            {renderProducts(increasedProducts)}

            <div className="py-6">
              <h1 className="flex gap-2 pt-2 text-2xl font-bold">
                <i className="fa-solid fa-caret-down text-green-500"></i>
                আজ দাম কমেছে
              </h1>
            </div>

            {renderProducts(decreasedProducts)}

            <div className="py-6">
              <h1 className="text-2xl font-bold">সব পণ্য</h1>
              <p className="mt-1 text-sm text-gray-500">
                মোট {allProducts.length}টি পণ্য দেখানো হচ্ছে
              </p>
            </div>

            {renderProducts(allProducts)}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
