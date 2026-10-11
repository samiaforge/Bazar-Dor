
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
       

        <div>
          <h2 className="text-xl font-bold text-green-700">
            বাজার দর
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

      
        <p className="max-w-md text-sm leading-6 text-gray-500 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
          পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
