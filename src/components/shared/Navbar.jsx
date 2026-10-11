// "use client";
// import Image from "next/image";
// import React from "react";
// import logo from "@/assets/logo-icon.png";
// import { useEffect, useState } from "react";
// import CategoryNav from "@/components/shared/CategoryNav";
// // import Marquee from "./Marquee";

// const Navbar = () => {
//   const [currentDate, setCurrentDate] = useState("");

//   useEffect(() => {
//     setCurrentDate(
//       new Date().toLocaleDateString("bn-BD", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       }),
//     );
//   }, []);

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       <div className="flex-1">
//         <div className="flex items-center gap-2">
//           <Image
//             src={logo}
//             alt="BazarDor logo"
//             width={32}
//             height={32}
//             className="h-8 w-8 object-contain bg-green-600 p-1 border rounded"
//           />

//           <div className="flex flex-col">
//             <a className="text-xl font-bold">বাজার দর</a>

//             <p className="text-sm text-gray-600">{currentDate}</p>
//           </div>
//         </div>
//       </div>
//       <div className="flex-none">
//         <div className="dropdown dropdown-end"></div>
//         <div className="dropdown dropdown-end">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle avatar"
//           >
//             <div className="w-10 rounded-full">
//               <img
//                 alt="Tailwind CSS Navbar component"
//                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//               />
//             </div>
//           </div>
//           <ul
//             tabIndex={-1}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             <li>
//               <a className="justify-between">
//                 Profile
//                 <span className="badge">New</span>
//               </a>
//             </li>
//             <li>
//               <a>Settings</a>
//             </li>
//             <li>
//               <a>Logout</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;








"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import logo from "@/assets/logo-icon.png";

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState("");
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি!");
    } else {
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar w-full bg-base-100 px-4 shadow-sm sm:px-8 lg:px-16 xl:px-20">
      {/* Logo and Date */}
      <div className="flex min-w-0 flex-1 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="BazarDor logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded border bg-green-600 object-contain p-1"
          />

          <div className="min-w-0">
            <p className="text-base font-bold sm:text-xl">বাজার দর</p>
            <p className="text-xs text-gray-600 sm:text-sm">
              {currentDate}
            </p>
          </div>
        </Link>
      </div>

      {/* Authentication */}
      <div className="flex flex-none items-center gap-2">
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost h-auto min-h-0 gap-2 px-2 py-2"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                  {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}

              <span className="max-w-28 truncate text-sm font-medium">
                {session.user.name || "অ্যাকাউন্ট"}
              </span>

              <i className="fa-solid fa-chevron-down text-xs" />
            </button>

            {/* Profile Dropdown */}
            <div
              tabIndex={0}
              className="dropdown-content z-50 mt-3 w-72 rounded-2xl border border-gray-100 bg-white p-5 text-[#203328] shadow-xl"
            >
              <p className="truncate font-semibold">
                {session.user.name || "ব্যবহারকারী"}
              </p>

              <p className="mt-1 break-all text-sm text-gray-500">
                {session.user.email}
              </p>

              <div className="my-4 border-t border-gray-100" />

              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-sm hover:bg-green-50"
              >
                <i className="fa-solid fa-user w-5 text-gray-500" />
                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-3 text-left text-sm text-red-500 hover:bg-red-50"
              >
                <i className="fa-solid fa-arrow-right-from-bracket w-5" />
                সাইন আউট
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/signin"
              className="btn btn-sm border-green-700 bg-transparent px-3 text-green-700 hover:bg-green-50 sm:btn-md"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="btn btn-sm border-green-700 bg-green-700 px-3 text-white hover:bg-green-800 sm:btn-md"
            >
              সাইন আপ
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
