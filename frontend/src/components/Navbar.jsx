import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  User,
  MessageCircle,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  Search,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-blue-600 p-1.5 rounded">
            <ShoppingCart className="text-white" size={18} />
          </div>
          <span className="font-bold text-lg">Brand</span>
        </div>

        <div className="flex-1 hidden md:flex max-w-xl border-2 border-blue-500 rounded-lg overflow-hidden">
          <input placeholder="Search" className="flex-1 px-3 py-2 text-sm outline-none" />
          <div className="border-l-2 border-blue-500 w-px"></div>
          <select className="border-t border-b border-gray-300 px-2 text-sm font-semibold bg-white text-gray-700">
            <option>All category</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 text-sm font-medium flex items-center gap-1.5">
            <Search size={15} />
            Search
          </button>
        </div>

        <div className="flex items-center gap-4 lg:gap-5 text-[11px] text-gray-600 shrink-0 ml-auto">
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
            <User size={18} />
            Profile
          </div>
          <div className="hidden sm:flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
            <MessageCircle size={18} />
            Message
          </div>
          <div className="hidden sm:flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
            <Heart size={18} />
            Orders
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
            <ShoppingCart size={18} />
            My cart
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs lg:text-sm overflow-x-auto">
          <nav className="flex items-center gap-4 lg:gap-6 text-gray-700 whitespace-nowrap">
            <span className="flex items-center gap-1 font-medium text-gray-900">
              <Menu size={15} />
              All category
            </span>
            <span className="cursor-pointer hover:text-blue-600">Hot offers</span>
            <span className="cursor-pointer hover:text-blue-600">Gift boxes</span>
            <span className="cursor-pointer hover:text-blue-600">Projects</span>
            <span className="cursor-pointer hover:text-blue-600">Menu item</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              Help <ChevronDown size={13} />
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-4 text-gray-700 whitespace-nowrap">
            <span className="flex items-center gap-1 cursor-pointer font-semibold">
              English, USD <ChevronDown size={13} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer font-semibold">
              Ship to <ReactCountryFlag countryCode="DE" svg style={{ width: "20px", height: "20px" }} />{" "}
              <ChevronDown size={13} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
