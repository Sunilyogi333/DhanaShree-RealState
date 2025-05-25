"use client"; // Required if using usePathname in App Router (Next.js 13+)

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For App Router; if using Pages Router, use `useRouter`

const Sidebar: React.FC = () => {
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname?.startsWith(path)
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500";

  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl bg-transparent rounded"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="md:block text-left text-blueGray-600 text-sm uppercase font-bold p-4"
        >
          Notus NextJS
        </Link>

        {/* Collapse */}
        <div
          className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden rounded ${collapseShow}`}
        >
          {/* Mobile header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-left text-blueGray-600 text-sm uppercase font-bold p-4"
              >
                Notus NextJS
              </Link>
              <button
                type="button"
                className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl bg-transparent rounded"
                onClick={() => setCollapseShow("hidden")}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Search (mobile only) */}
          <form className="mt-6 mb-4 md:hidden">
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-2 h-12 border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded w-full"
            />
          </form>

          {/* Navigation */}
          <hr className="my-4 md:min-w-full" />
          <h6 className="text-blueGray-500 text-xs uppercase font-bold pt-1 pb-4">
            Admin Layout Pages
          </h6>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                href="/admin/dashboard"
                className={`text-xs uppercase py-3 font-bold block ${isActive("/admin/dashboard")}`}
              >
                <i className="fas fa-tv mr-2 text-sm"></i> Dashboard
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/admin/tables"
                className={`text-xs uppercase py-3 font-bold block ${isActive("/admin/tables")}`}
              >
                <i className="fas fa-table mr-2 text-sm"></i> Tables
              </Link>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />
          <h6 className="text-blueGray-500 text-xs uppercase font-bold pt-1 pb-4">
            Auth Layout Pages
          </h6>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="items-center">
              <Link
                href="/auth/login"
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i> Login
              </Link>
            </li>
            <li className="items-center">
              <Link
                href="/auth/register"
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i> Register
              </Link>
            </li>
          </ul>

          <hr className="my-4 md:min-w-full" />
          <h6 className="text-blueGray-500 text-xs uppercase font-bold pt-1 pb-4">
            No Layout Pages
          </h6>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li className="items-center">
              <Link
                href="/landing"
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i> Landing Page
              </Link>
            </li>
            <li className="items-center">
              <Link
                href="/profile"
                className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              >
                <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i> Profile Page
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
