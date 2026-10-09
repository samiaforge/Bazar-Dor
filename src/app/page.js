import Banner from "@/components/homepage/Banner";

import Products from "@/components/homepage/Products";
import { Suspense } from "react";


export default function Home() {
  return (
    <div>
      <Banner/>
      
    <Suspense
      fallback={
        <div className="flex h-12 items-center justify-center bg-gray-100 text-sm text-gray-500">
          বাজারদর লোড হচ্ছে...
        </div>
      }
    >
      <Products />
    </Suspense>

     
    </div>
  );
}
