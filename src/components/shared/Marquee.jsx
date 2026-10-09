import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const data = await res.json();

  const products = Array.isArray(data.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : [];

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center">
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText direction="right" duration={20}>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
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
                  {product.change?.dir === "up"
                    ? "▲"
                    : product.change?.dir === "down"
                      ? "▼"
                      : "•"}
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
