import Link from "next/link";
import ProductCard from "@/components/homepage/ProductCard";



const CategoryPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { sort = "default" } = await searchParams;

  
const [categoriesRes, productsRes] = await Promise.all([
  fetch("https://openapi.programming-hero.com/api/bazardor/categories"),
  fetch("https://openapi.programming-hero.com/api/bazardor/products"),
]);


  if (!categoriesRes.ok || !productsRes.ok) {
    throw new Error("Failed to fetch data");
  }



  const categories = await categoriesRes.json();
  const products = await productsRes.json();

  const category = categories.find((item) => item.slug === slug);

  let categoryProducts = products.filter(
    (product) => product.category === slug,
  );


  if (sort === "low") {
    categoryProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    categoryProducts.sort((a, b) => b.today - a.today);
  }



  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-green-700">
          ← হোম পেজ
        </Link>

        {category ? (
          <>
            <div className="mt-4 flex items-center gap-4 rounded-xl bg-white p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-3xl">
                {category.icon}
              </div>

              <div>
                <h1 className="text-2xl font-bold">{category.nameBn}</h1>

                <p className="mt-1 text-sm text-gray-500">
                  {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-lg font-bold">{category.nameBn} এর পণ্য</h2>

              <form
                action={`/category/${slug}`}
                method="GET"
                className="flex items-center gap-2"
              >
              

                <select
                  id="sort"
                  name="sort"
                  defaultValue={sort}
                  className="rounded-lg border border-gray-300 bg-white p-2 text-sm"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low">দাম: কম থেকে বেশি</option>
                  <option value="high">দাম: বেশি থেকে কম</option>
                </select>

                <button
                  type="submit"
                  className="rounded-lg bg-green-700 px-3 py-2 text-sm text-white"
                >
                  সাজান
                </button>
              </form>
            </div>

            {categoryProducts.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl bg-white p-10 text-center">
                <p className="text-4xl">
                  <i className="fa-solid fa-cart-shopping"></i>
                </p>

                <h2 className="mt-3 text-lg font-bold">
                  কোনো পণ্য পাওয়া যায়নি
                </h2>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 rounded-xl bg-white p-10 text-center">
            <p className="text-4xl">
              <i className="fa-solid fa-cart-shopping"></i>
            </p>

            <h1 className="mt-3 text-xl font-bold">ক্যাটাগরি পাওয়া যায়নি</h1>

            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-white"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
