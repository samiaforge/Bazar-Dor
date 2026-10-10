import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const getProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
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

const Marquee = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <p className="py-3 text-center text-gray-500">
        এই মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না।
      </p>
    );
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center">
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText direction="right" duration={20}>
            {products.map((product) => (
              <Link
                key={product.id ?? product.slug}
                href={`/product/${product.slug}`}
                className="mx-4 inline-flex shrink-0 items-center gap-2 whitespace-nowrap py-2 text-sm text-gray-800 hover:text-green-700"
              >
                <span>{product.image}</span>

                <span>{product.nameBn}</span>

                <span>
                  {product.today} টাকা/
                  {product.unit === "kg" ? "কেজি" : product.unit}
                </span>

                <span
                  className={
                    product.change?.dir === "up"
                      ? "font-semibold text-red-500"
                      : product.change?.dir === "down"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-gray-500"
                  }
                >
                  {product.change?.dir === "up" ? (
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  ) : product.change?.dir === "down" ? (
                    <i className="fa-solid fa-arrow-trend-down"></i>
                  ) : (
                    <i className="fa-solid fa-minus"></i>
                  )}{" "}
                  {product.change?.pct ?? 0}%
                </span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
