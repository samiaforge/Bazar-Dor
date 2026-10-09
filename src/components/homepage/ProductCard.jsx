
import Link from "next/link";

const formatBengaliNumber = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value ?? 0);

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { dir, pct } = product.change ?? {};

  const isUp = dir === "up";
  const isDown = dir === "down";

  const badgeStyle = isUp
    ? "bg-green-100 text-green-700"
    : isDown
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-500";

  const changeLabel = isUp
    ? `▲ ${formatBengaliNumber(Math.abs(pct))}%`
    : isDown
      ? `▼ ${formatBengaliNumber(Math.abs(pct))}%`
      : `— ${formatBengaliNumber(0)}%`;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-28 items-center justify-center text-6xl">
        {product.image || product.categoryIcon || "🛒"}
      </div>

      <h2 className="mt-3 text-lg font-bold text-gray-900">
        {product.nameBn}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {product.unit === "kg"
          ? "কেজি"
          : product.unit === "liter"
            ? "লিটার"
            : product.unit === "piece"
              ? "পিস"
              : product.unit === "dozen"
                ? "ডজন"
                : product.unit}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {formatBengaliNumber(product.today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeStyle}`}
        >
          {changeLabel}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;