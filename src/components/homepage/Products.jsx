import React from "react";
import ProductCard from "./ProductCard";

const getProducts = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data;
};

const Products = async () => {
  const productData = await getProducts();
  const allProducts = Array.isArray(productData)
    ? productData
    : productData.products ?? [];

  // Products whose prices increased.
  const increasedProducts = allProducts
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct ?? 0)) -
        Math.abs(Number(a.change?.pct ?? 0))
    )
    .slice(0, 6);

  // Products whose prices decreased.
  const decreasedProducts = allProducts
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct ?? 0)) -
        Math.abs(Number(a.change?.pct ?? 0))
    )
    .slice(0, 6);

  const renderProducts = (products) => (
    <div className="grid grid-cols-1 gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-3 ">
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

   
        <div className="py-6">
          <h1 className="text-2xl font-bold flex gap-2">
            <i className="fa-solid fa-caret-up text-red-600 pt-2 " ></i>
            আজ দাম বেড়েছে 
          </h1>
         
        </div>

        {renderProducts(increasedProducts)}

       
        <div className="py-6">
          <h1 className="text-2xl font-bold pt-2 flex gap-2">
            <i className="fa-solid fa-caret-down text-green-500 "></i>
            আজ দাম কমেছে 
          </h1>
         
        </div>

        {renderProducts(decreasedProducts)}

   
        <div className="py-6">
          <h1 className="text-2xl font-bold">
            সব পণ্য
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            মোট ৩৩টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {renderProducts(allProducts)}

      </div>
    </section>
  );
};

export default Products;