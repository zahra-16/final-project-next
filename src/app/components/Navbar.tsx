"use client";

import { HandCoins, Search } from "lucide-react";
import Link from "next/link";
import { Result } from "postcss";
import React, { useState, useEffect, ChangeEvent } from "react";
import SearchCard from "./SearchCard";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // const handleSearch = async () => {
  //   const response = await fetch(
  //     `https://penyewaan.vercel.app/api/v1/alat?search=${query}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const result = await response.json();
  //   console.log(result);
  //   setResults([`Result for "${query}"`]);
  // };

  const handleSearch = async () => {
    try {
      const [responseAlat, responsePenyewaan] = await Promise.all([
        fetch(`https://penyewaan.vercel.app/api/v1/alat?search=${query}`, {
          method: "GET",
        }),
        fetch(`https://penyewaan.vercel.app/api/v1/penyewaan?search=${query}`, {
          method: "GET",
        })
      ]);
  
      const [resultAlat, resultPenyewaan] = await Promise.all([
        responseAlat.json(),
        responsePenyewaan.json()
      ]);
  
      console.log(resultAlat, resultPenyewaan);
      setResults([
        `Result for "${query}":`,
        "Alat:", resultAlat,
        "Penyewaan:", resultPenyewaan
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`bg-[#3F4F44] border-gray-200 w-full z-50 h-20 shadow-md fixed top-0 transition-all ${
          isScrolled ? "bg-[#727D73]/90" : "bg-opacity-100"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link href="/">
            <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer ">
              <img
                src="/logo.png"
                className="h-[60px] w-[60px] pt-3"
                alt="logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-[#DCD7C9]">
                CAMP-TOOLS
              </span>
            </div>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
            
              type="button"
              className="mr-3 text-gray-900 font-medium text-sm px-4 py-2 text-center"
              onClick={() => setIsSearchOpen(true)}
              
            >
              <Search className="text-[#DCD7C9]" name="searchklik" />
            </button>
            <Link href="/penyewaan">
              <button
                type="button"
                className="mr-3 text-gray-900 font-medium text-sm px-4 py-2 text-center"
              >
                <HandCoins className="text-[#DCD7C9]" />
              </button>
            </Link>
            <Link href="/auth/login">
              <button
                type="button"
                className=" bg-[#A27B5C] text-white rounded-lg hover:bg-[#DCD7C9] hover:text-black focus:ring-2 focus:outline-none focus:ring-[#DCD7C9] font-medium text-sm px-4 py-2 text-center"
              >
                Logout
              </button>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {[
                { name: "Home", href: "/" },
                { name: "Category", href: "/kategori" },
                { name: "Tools", href: "/alat" },
                { name: "Pelanggan", href: "/pelanggan" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <span className="relative block py-2 px-3 md:p-0 text-[#DCD7C9] hover:text-[#A4B465] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#A4B465] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search</h2>
            <div id="search">
              <SearchCard />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                name="close"
                  onClick={() => setIsSearchOpen(false)}
                  className="px-4 py-2 bg-[#A27B5C] text-white rounded-lg hover:bg-[#DCD7C9] hover:text-black transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
