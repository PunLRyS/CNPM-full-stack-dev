import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation'; // Sử dụng usePathname

export default function Nav_bar() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <nav className="fixed left-0 top-0 w-[20%] h-full bg-white text-blue-900 px-8 z-100 shadow-lg">
      <div className="flex items-center mt-6 mb-14 rounded-lg">
        <Image
          src="/logorounded.PNG"
          alt="Logo"
          width={60}
          height={60}
        />
        <span className="text-3xl font-extrabold ml-4">FRAXA</span>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/main" className="group">
          <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${pathname === '/main' ? 'bg-blue-700 text-white' : 'group-hover:bg-blue-500/30'}`}>
            <i className="fa-solid fa-chart-line text-2xl"></i>
            <span className="text-xl ml-2 font-semibold">Overview</span>
          </div>
        </Link>

        <Link href="/ex_package/Summary" className="group">
          <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${pathname === '/ex_package/Summary' ? 'bg-blue-700 text-white' : 'group-hover:bg-blue-500/30'}`}>
            <i className="fa-solid fa-box-open text-2xl"></i>
            <span className="text-xl ml-1 font-semibold">Export</span>
          </div>
        </Link>

        <Link href="/im_package/AddProduct" className="group">
          <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${pathname === '/im_package/AddProduct' ? 'bg-blue-700 text-white' : 'group-hover:bg-blue-500/30'}`}>
            <i className="fa-solid fa-truck-ramp-box text-2xl"></i>
            <span className="ml-1 text-xl font-semibold">Import</span>
          </div>
        </Link>

        <Link href="/ex_package/BillExport" className="group">
          <div className={`flex ml-2 items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${pathname === '/ex_package/BillExport' ? 'bg-blue-700 text-white' : 'group-hover:bg-blue-500/30'}`}>
            <i className="fa-solid text-2xl fa-file-invoice"></i>
            <span className="ml-2 text-xl font-semibold">Bill Export</span>
          </div>
        </Link>

        <Link href="/im_package/BillProduct" className="group">
          <div className={`flex ml-2 items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${pathname === '/im_package/BillProduct' ? 'bg-blue-700 text-white' : 'group-hover:bg-blue-500/30'}`}>
            <i className="fa-solid text-2xl fa-file-invoice-dollar"></i>
            <span className="ml-2 text-xl font-semibold">Bill Import</span>
          </div>
        </Link>

        <Link href="/" className="group mt-10 ml-2">
          <div className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group-hover:bg-blue-500/30`}>
            <i className="fa-solid fa-right-from-bracket text-2xl"></i>
            <span className="text-xl font-semibold">Logout</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}