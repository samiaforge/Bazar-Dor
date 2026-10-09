"use client";
import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/bazar-hero.png"
import { useEffect, useState } from "react";


const Banner = () => {
    const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <section className="bg-[#f4f9f1] px-4 py-4 sm:px-6 sm:py-6 lg:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:gap-40 lg:py-4 px-16">

      
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
  <span className="h-2 w-2 rounded-full bg-green-500"></span>
  {today || "আজকের বাজারদর"}
</span>

          <h1 className="mt-6 text-3xl leading-snug font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
            
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>

          
        </div>

        <div>
            <Image
                        src={hero}
                        alt="BazarDor logo"
                       
                        
                        className=" w-120 object-contain p-1 border rounded"
                      />
        </div>
        

      </div>
    </section>
  );
};

export default Banner;
