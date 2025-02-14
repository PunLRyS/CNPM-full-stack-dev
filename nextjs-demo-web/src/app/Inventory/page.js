"use client"
import Nav_bar from '@/app/components/Nav/Nav_bar';
import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';  
export default function InventoryPage() {
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/hanghoa/get-du-lieu'); // Thay đổi URL cho phù hợp với backend của bạn
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Kiểm tra phản hồi
      }
      const data = await response.json(); // Chuyển đổi phản hồi sang JSON
      setBackendProducts(data); // Lưu dữ liệu vào state
    } catch (error) {
      setError(error); // Lưu lỗi vào state nếu có
    } finally {
      setLoading(false); // Đặt loading về false khi hoàn thành
    }
  };

  fetchProducts(); // Gọi hàm fetchData
}, []);



  /////////////////////////////////////////////////
  // Tính tổng giá trị hàng hóa
  const totalValue = backendProducts.reduce((total, item) => {
    const itemTotal = item.soLuong * item.giaNhap; // Tính tổng giá cho từng sản phẩm
    return total + (isNaN(itemTotal) ? 0 : itemTotal); // Kiểm tra nếu itemTotal là NaN
  }, 0);
  
  // if (loading) return <p>Đang tải dữ liệu...</p>;
  // if (error) return <p>Lỗi: {error.message}</p>;

  const tableAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

    return (
      <>
      <Nav_bar />
      <Image
      alt="Mountains"
      src={Background}
      placeholder="blur"
      quality={100}
      sizes="100vw"
      style={{
        objectFit: 'cover',
        position: 'fixed',
      }}
      className="blur-sm absolute w-screen h-screen"
    />
     <div className="pt-16 relative">
      <motion.div
        className="container mx-auto mt-8"
        initial="hidden"
        animate="visible"
        variants={tableAnimation}
      >
        <h1 className="text-2xl font-bold text-center text-blue-800">
          Danh sách hàng hóa
        </h1>
        <motion.div
          className="overflow-x-auto mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >
          <table className="bg-white border border-blue-400 w-full">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="name-data border border-blue-400 p-2">Số thứ tự</th>
                <th className="name-data border border-blue-400 p-2">Mã hàng</th>
                <th className="name-data border border-blue-400 p-2">Tên hàng</th>
                <th className="name-data border border-blue-400 p-2">Số lượng</th>
                <th className="name-data border border-blue-400 p-2">Giá</th>
                <th className="name-data border border-blue-400 p-2">Tổng giá</th>
              </tr>
            </thead>
            <tbody>
              {backendProducts.map((item, index) => {
                const totalAmount = item.soLuong * item.giaNhap;
                return (
                  <motion.tr
                    key={item.id}
                    className="hover:bg-blue-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="data-inventory border border-blue-400 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="data-inventory border border-blue-400 p-2 text-center">
                      {item.ma}
                    </td>
                    <td className="data-inventory border border-blue-400 p-2 text-center">
                      {item.ten}
                    </td>
                    <td className="data-inventory border border-blue-400 p-2 text-center">
                      {item.soLuong}
                    </td>
                    <td className="data-inventory border border-blue-400 p-2 text-center">
                      {item.giaNhap.toLocaleString()} VNĐ
                    </td>
                    <td className="data-inventory border border-blue-400 p-2 text-center">
                      {totalAmount.toLocaleString()} VNĐ
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="5"
                  className="border border-blue-400 p-2 text-right font-bold"
                >
                  Tổng giá trị hàng hóa:
                </td>
                <td className="border border-blue-400 p-2 text-right">
                  {totalValue.toLocaleString()} VNĐ
                </td>
              </tr>
            </tfoot>
          </table>
        </motion.div>
      </motion.div>
    </div>
      </>
    );
  }