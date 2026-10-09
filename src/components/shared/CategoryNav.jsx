"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <nav className="border-b border-gray-200 bg-white">
      {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex gap-3 overflow-x-auto py-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-700"
            >
              {" "}
              <span>{category.icon}</span> <span>{category.nameBn}</span>{" "}
            </Link>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
};

export default CategoryNav;
