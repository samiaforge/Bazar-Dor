"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/logo-icon.png";
import { useEffect, useState } from "react";
import CategoryNav from "@/components/shared/CategoryNav";
// import Marquee from "./Marquee";

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="BazarDor logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain bg-green-600 p-1 border rounded"
          />

          <div className="flex flex-col">
            <a className="text-xl font-bold">বাজার দর</a>

            <p className="text-sm text-gray-600">{currentDate}</p>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end"></div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
