"use client";
import React from "react";
export default function SearchBar() {
  return (
    <div className="fixed top-0 z-10 ml-[20%] w-[80%] h-24 flex items-center justify-between bg-white px-4 shadow">
      <div className="flex items-center gap-4">
        <div className="relative ml-10">
          <i class="fa-solid fa-2xl fa-magnifying-glass text-blue-900"></i>
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 w-96 h-16 ml-4 pr-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex items-center gap-6 mr-10"> 
  <div className="relative text-2xl"> 
    <i className="fa-solid fa-xl fa-bell cursor-pointer text-blue-900"></i>
    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span> 
  </div>

  <i className="fa-solid fa-2xl fa-globe cursor-pointer text-blue-900 text-2xl"></i> 

  <img
    src="https://randomuser.me/api/portraits/women/44.jpg"
    alt="avatar"
    className="w-10 h-10 rounded-full border-2 border-gray-300" // Tăng size và border cho avatar
  />
</div>
    </div>
  );
}
