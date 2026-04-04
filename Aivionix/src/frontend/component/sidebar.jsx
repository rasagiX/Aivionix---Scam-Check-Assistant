import { useState } from "react";

export default function Sidebar({ active, setActive }) {
  const menuItems = ["Home", "Chat", "History", "Settings"];

  return (
    <div className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col">
      
      <h1 className="text-white text-xl font-bold mb-6">
        Avionix 🚀
      </h1>

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`text-left px-4 py-2 rounded-xl transition ${
              active === item
                ? "bg-indigo-500 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
}