"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { ChevronDownIcon } from "@heroicons/react/20/solid";


const navigation = [
  { name: "home", href: "/" },
  { name: "features", href: "/features" },
  { name: "about", href: "/about" },  
];

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLang = Cookies.get("lang") || "en";
    i18n.changeLanguage(storedLang).then(() => {
      setLang(storedLang);
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    Cookies.set("lang", lng);
    router.refresh();
  };

  // Function to check if nav item is current
  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-sky-100">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">{t("openMainMenu")}</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <img
                    alt="Your Company"
                    src="/user/logo.png"
                    className="h-12 w-auto cursor-pointer"
                  />
                </Link>
              </div>

              <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
  {navigation.map((item) => {
    const isCurrent = isCurrentPage(item.href);
    return (
      <Link
        key={item.name}
        href={item.href}
        className={classNames(
          isCurrent
            ? "bg-white text-blue-800 rounded-lg"
            : "text-black hover:border-b-3 hover:border-sky-700 hover:bg-sky-50 rounded-lg transition-all duration-200",
          "px-3 py-2 text-sm font-medium"
        )}
      >
        {t(item.name)}
      </Link>
    );
  })}

  {/* Tools dropdown */}
  <Menu as="div" className="relative">
    <MenuButton
      className={classNames(
        isCurrentPage("/unitConverter") ||
          isCurrentPage("/emiCalculator") ||
          isCurrentPage("/dateConverter")
          ? "bg-white text-blue-800 rounded-lg"
          : "text-black hover:border-b-3 hover:border-sky-700 hover:bg-sky-50 rounded-lg",
        "px-3 py-2 text-sm font-medium inline-flex items-center gap-1 transition-all duration-200"
      )}
    >
      {t("tools")} <ChevronDownIcon className="w-4 h-4" />
    </MenuButton>
    <MenuItems className="absolute z-50 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <MenuItem>
        {({ active }) => (
          <Link
            href="/unitConverter"
            className={classNames(
              active ? "bg-gray-100" : "",
              "block px-4 py-2 text-sm text-gray-700"
            )}
          >
            Unit Converter
          </Link>
        )}
      </MenuItem>
      <MenuItem>
        {({ active }) => (
          <Link
            href="/emiCalculator"
            className={classNames(
              active ? "bg-gray-100" : "",
              "block px-4 py-2 text-sm text-gray-700"
            )}
          >
            EMI Calculator
          </Link>
        )}
      </MenuItem>
      <MenuItem>
        {({ active }) => (
          <Link
            href="/dateConverter"
            className={classNames(
              active ? "bg-gray-100" : "",
              "block px-4 py-2 text-sm text-gray-700"
            )}
          >
            Date Converter
          </Link>
        )}
      </MenuItem>
    </MenuItems>
  </Menu>
</div>

              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex items-center gap-2">
                <span>{t("language")}:</span>
                <select
                  onChange={(e) => {
                    const selectedLang = e.target.value;
                    setLang(selectedLang);
                    changeLanguage(selectedLang);
                  }}
                  value={i18n.language}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="en">English</option>
                  <option value="ne">नेपाली</option>
                </select>
              </div>

              <Link href="/admin">
                <Button
                  variant="outline"
                  className="cursor-pointer ml-3 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white transition-all duration-300"
                >
                  {t("loginAsAdmin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const isCurrent = isCurrentPage(item.href);
              return (
                <Link key={item.name} href={item.href}>
                  <DisclosureButton
                    as="div"
                    className={classNames(
                      isCurrent
                        ? "bg-blue-700 text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer transition-all duration-200"
                    )}
                  >
                    {t(item.name)}
                  </DisclosureButton>
                </Link>
              );
            })}
            <Link href="/unitConverter  ">
  <DisclosureButton
    as="div"
    className={classNames(
      isCurrentPage("/unitConverter")
        ? "bg-blue-700 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer transition-all duration-200"
    )}
  >
    {t("unitConverter")}
  </DisclosureButton>
</Link>
<Link href="/emiCalculator">
  <DisclosureButton
    as="div"
    className={classNames(
      isCurrentPage("/emiCalculator")
        ? "bg-blue-700 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer transition-all duration-200"
    )}
  >
    {t("emiCalculator")}
  </DisclosureButton>
</Link>
<Link href="/dateConverter">
  <DisclosureButton
    as="div"
    className={classNames(
      isCurrentPage("/dateConverter")
        ? "bg-blue-700 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer transition-all duration-200"
    )}
  >
    {t("dateConverter")}
  </DisclosureButton>
</Link>

          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}

export default Navbar;
