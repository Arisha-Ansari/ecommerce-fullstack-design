import React from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-gray-100 py-10 text-center px-4">
      <h3 className="font-semibold text-lg mb-1">Subscribe on our newsletter</h3>
      <p className="text-sm text-gray-500 mb-4">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      <div className="flex justify-center gap-2 max-w-md mx-auto">
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded px-3">
          <Mail size={14} className="text-gray-400 shrink-0" />
          <input placeholder="Email" className="flex-1 px-2 py-2 text-sm outline-none bg-transparent" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded text-sm font-medium shrink-0">
          Subscribe
        </button>
      </div>
    </section>
  );
}
