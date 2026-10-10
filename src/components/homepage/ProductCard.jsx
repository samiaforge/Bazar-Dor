
import Link from "next/link";

const ProductCard = ({ product }) => {
  const {
    id,
    slug,
    nameBn,
    image,
    categoryIcon,
    unit,
    today,
    change,
  } = product;

  const priceChange = change?.pct ?? 0;
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const badgeColor = isUp
    ? "bg-green-100 text-green-700"
    : isDown
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-500";

  const unitName =
    unit === "kg"
      ? "কেজি"
      : unit === "litre"
        ? "লিটার"
        : unit === "piece"
          ? "পিস"
          : unit === "dozen"
            ? "ডজন"
            : unit;

  const formatNumber = (value) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  return (
    <Link
      href={`/product/${slug}`}
      className=" block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
    {image || categoryIcon}
  </div>

 <div>
   <h2 className="text-lg font-bold text-gray-900">
    {nameBn}
  </h2>
  <p className="mt-1 text-sm text-gray-500">
        প্রতি {unitName}
      </p>
 </div>
</div>

      


      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="pb-2">
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

          <p className="text-xl font-bold text-gray-900">
            {formatNumber(today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeColor}`}
        >
          {formatNumber(Math.abs(priceChange))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;