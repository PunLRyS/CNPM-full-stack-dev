"use client";
import { Inter } from 'next/font/google';
import Nav_bar from "./components/Nav/Nav_bar";
import VideoComponent from "./components/VideoComponent";
import Link from "next/link";
import { useEffect, useState } from 'react';
import  { motion } from 'framer-motion';
import Image from 'next/image';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';

// Import font Montserrat from Google Fonts
const montserrat = Inter({ subsets: ['latin'] }); //import font chữ



// Home page component
export default function Home() {
  const [showSecondComponent, setShowSecondComponent] = useState(false); //khai báo trạng thái sử dụng cho accs sự kiện
  const [searchTerm, setSearchTerm] = useState(''); //khai báo trạng thái sử dụng cho accs sự kiện



  useEffect(() => {
    // Set a timeout to show the second component after 4 seconds
    const timer = setTimeout(() => {
      setShowSecondComponent(true); //set thời gian hiển thị cho component thứ 2
    }, 3600);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);



  return (
    <main className="h-screen overflow-auto"> {/* Set height for the parent element */}
      <VideoComponent />


      {showSecondComponent && (
        <Image
        alt="Mountains"
        src={Background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        className="blur-sm"
      />
      )}


      {showSecondComponent && (
        <motion.div
        initial={{ y: "-100vw" }}
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: 3.0 }}
        >
          <Nav_bar />
        </motion.div>
      )}


      {showSecondComponent && ( 
        <div className="flex z-10 relative">
          <div className={`rounded-b-2xl w-[35%] ml-[10%] mt-[8%] h-[10%] font-bold text-center text-7xl p-4 mr-12 text-blue-800 ${montserrat.className}`}>
            <motion.div
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween", duration: 1.5 }}
            >
              Management
            </motion.div>
          </div>
          <div className={`bg-gray-400 rounded-2xl w-[35%] mt-[8%] h-[10%] font-bold text-center text-7xl ml-2 p-4 text-white ${montserrat.className}`}>
            <motion.div
              initial={{ opacity: 0 }} // Bắt đầu mờ hoàn toàn
              animate={{ opacity: 1 }} // Hiện rõ
              transition={{ type: "tween", duration: 2 }} // Thời gian chuyển đổi
            >
              Package
            </motion.div>
          </div>
        </div>
      )}

      
      {showSecondComponent && (
       <div className="rounded-b-2xl rounded-l-2xl w-[85%] mx-auto h-[60%] relative">
          <div>
            <motion.div
            initial={{ y: "-2vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 2.5 }}
            >
              <div className="relative w-[60%] mx-auto mt-6">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full shadow-lg focus:outline-none focus:border-blue-500 focus:border-2 pl-10"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700"></i>
              </div>
            </motion.div>
            <div className="flex justify-center items-center my-4">
              <motion.div
                  initial={{ opacity: 0 }} // Bắt đầu mờ hoàn toàn
                  animate={{ opacity: 1 }} // Hiện rõ
                  transition={{ duration: 3 }} // Thời gian chuyển đổi
                >
                    <i className="fas fa-box-open fa-4x" style={{ color: "#2638c5" }}></i>
                </motion.div>

            </div>
            <p className="text-black text-lg text-center w-[50%] flex justify-center mx-auto ">
              Inventory management is a crucial process that involves overseeing the flow of goods within a business, from procurement to storage and distribution. It ensures that products are available when needed while preventing overstocking, which can lead to unnecessary costs. 
            </p>
          </div>



          <Link href="/Inventory">
            <button className="bg-white rounded-xl w-[20%] h-[10%] text-blue-800 font-semibold absolute mt-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-xl hover:bg-blue-800 hover:text-white">
              View More
            </button>
          </Link>
        </div>
      )}
      
    </main>
  );
}