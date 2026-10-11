
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export const instant = false;

const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;

 
 const session = await getSession();

if (!session) {
  redirect(
    `/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`
  );
}

const res = await fetch(
  "https://openapi.programming-hero.com/api/bazardor/products",
  { next: { revalidate: 300 } }
);

  if (!res.ok) {
    const errorBody = await res.text();

    throw new Error(
      `Failed to fetch products: ${res.status} ${errorBody}`
    );
  }

  const products = await res.json();

  const product = Array.isArray(products)
    ? products.find((item) => item.slug === slug)
    : null;

  const markets = Array.isArray(product?.markets)
    ? product.markets
    : [];

  const toNumber = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
  };

  const formatPrice = (value) => {
    const number = toNumber(value);

    if (number === null) return "—";

    return number.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });
  };




  const unit = String(product?.unit || "").toLowerCase();

  const unitName =
    {
      kg: "কেজি",
      litre: "লিটার",
      piece: "টি",
      dozen: "ডজন",
    }[unit] || product?.unit || "";

  const getMarketAverage = (market) => {
    const today = toNumber(market.today);

    if (today !== null) {
      return today;
    }

    const min = toNumber(market.min);
    const max = toNumber(market.max);

    if (min !== null && max !== null) {
      return (min + max) / 2;
    }

    return null;
  };

  const minPrices = markets
    .map((market) => toNumber(market.min))
    .filter((price) => price !== null);

  const maxPrices = markets
    .map((market) => toNumber(market.max))
    .filter((price) => price !== null);

  const averages = markets
    .map(getMarketAverage)
    .filter((price) => price !== null);

  const minPrice = minPrices.length
    ? Math.min(...minPrices)
    : null;

  const maxPrice = maxPrices.length
    ? Math.max(...maxPrices)
    : null;

  const avgPrice = averages.length
    ? averages.reduce((total, price) => total + price, 0) /
      averages.length
    : null;

  // Today's and yesterday's prices
  const todayPrice = toNumber(product?.today);
  const yesterdayPrice = toNumber(product?.yesterday);

  const priceChange =
    todayPrice !== null && yesterdayPrice !== null
      ? todayPrice - yesterdayPrice
      : null;

  return (
    <main className="min-h-screen bg-[#f4f9f1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        {product && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-green-700">
            <Link href="/" className="hover:underline">
              হোম
            </Link>

            <i className="fa-solid fa-angle-right pt-0.5"></i>

            <Link
              href={`/category/${product.categorySlug}`}
              className="hover:underline"
            >
              {product.categoryNameBn}
            </Link>

            <i className="fa-solid fa-angle-right pt-0.5"></i>

            <span className="text-gray-600">
              {product.nameBn}
            </span>
          </div>
        )}

        {!product ? (
          <div className="mt-5 rounded-xl bg-white p-10 text-center">
            <div className="text-4xl">🧺</div>

            <h1 className="mt-4 text-xl font-bold">
              পণ্য পাওয়া যায়নি
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              অন্য পণ্য দেখে নিতে পারেন।
            </p>

            <Link
              href="/"
              className="mt-4 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            {/* Product Details */}
            <section className="mt-5 flex flex-col justify-between gap-5 rounded-xl bg-white p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl">
                  {product.image || product.categoryIcon}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.nameBn}
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.categoryNameBn} · প্রতি {unitName}
                  </p>

                  {/* Price Change */}
                  {priceChange !== null && (
                    <p
                      className={`mt-2 text-sm font-medium ${
                        priceChange > 0
                          ? "text-red-600"
                          : priceChange < 0
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {priceChange > 0
                        ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatPrice(priceChange)} টাকা`
                        : priceChange < 0
                          ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatPrice(Math.abs(priceChange))} টাকা`
                          : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                    </p>
                  )}

                  <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {product.categoryNameBn}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#f4f9f1] p-4 sm:text-center">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-3xl font-bold text-black">
                  {formatPrice(product.today)}
                </p>

                <p className="text-gray-600">
                  টাকা/{unitName}
                </p>
              </div>
            </section>

            {/* Price Summary */}
            <h2 className="mb-4 mt-8 text-xl font-bold text-gray-900">
              দামের সারসংক্ষেপ
            </h2>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-gray-500">
                  সর্বনিম্ন দাম
                </p>

                <h3 className="mt-2 text-2xl font-bold text-green-600">
                  {minPrice !== null
                    ? `${formatPrice(minPrice)} টাকা`
                    : "—"}
                </h3>

                <p className="text-sm text-gray-500">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-gray-500">
                  সর্বোচ্চ দাম
                </p>

                <h3 className="mt-2 text-2xl font-bold text-red-600">
                  {maxPrice !== null
                    ? `${formatPrice(maxPrice)} টাকা`
                    : "—"}
                </h3>

                <p className="text-sm text-gray-500">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-gray-500">
                  গড় দাম
                </p>

                <h3 className="mt-2 text-2xl font-bold text-green-600">
                  {avgPrice !== null
                    ? `${formatPrice(avgPrice)} টাকা`
                    : "—"}
                </h3>

                <p className="text-sm text-gray-500">
                  প্রতি {unitName}-এর হিসাবে
                </p>
              </div>
            </section>

            {/* Market Prices */}
            <section className="mt-8 rounded-xl bg-white p-5">
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>

              {markets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left">
                    <thead className="bg-[#f4f9f1]">
                      <tr>
                        <th className="p-3">বাজার</th>
                        <th className="p-3">বিভাগ</th>
                        <th className="p-3">সর্বনিম্ন</th>
                        <th className="p-3">সর্বোচ্চ</th>
                        <th className="p-3">গড়</th>
                      </tr>
                    </thead>

                    <tbody>
                      {markets.map((market, index) => {
                        const marketAverage = getMarketAverage(market);

                        return (
                          <tr
                            key={`${product.slug}-${market.market}-${market.division}-${index}`}
                            className="border-b border-gray-100"
                          >
                            <td className="p-3">
                              {market.market || "—"}
                            </td>

                            <td className="p-3">
                              {market.division || "—"}
                            </td>

                            <td className="p-3">
                              {formatPrice(market.min)} টাকা
                            </td>

                            <td className="p-3">
                              {formatPrice(market.max)} টাকা
                            </td>

                            <td className="p-3 font-semibold text-black">
                              {marketAverage !== null
                                ? `${formatPrice(marketAverage)} টাকা`
                                : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="py-6 text-center text-gray-500">
                  এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default ProductDetailsPage;