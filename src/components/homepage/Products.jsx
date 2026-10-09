import React from "react";

const getProducts = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  return data;
};

const Products = async () => {
  const productData = await getProducts();
  console.log(productData)

  return (
    <section id="product" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-2">
              <h1 className="text-2xl font-bold">আজ দাম বেড়েছে</h1>
    
             
            </div>
    
            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-18">
              {productData.map((product) => (
                // <ProductCard
                //   key={product.id}
                //   product={product}
                // />
              ))}
            </div> */}
          </div>
        </section>
  );
};

export default getProducts;
