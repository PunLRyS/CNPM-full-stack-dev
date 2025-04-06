"use client"

import React from 'react';
import Pie_chart from '../components/Piechart';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useState } from "react";
import Nav_bar from '../components/Nav/Nav_bar';
import Search_bar from '../components/Nav/Search_bar';
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
    desktop: {
      label: "Giá trị hàng hóa",
      color: "hsl(var(--chart-1))",
    },
  };
  
  export default function Component() {
    const [backendProducts, setBackendProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showItemTotal, setShowItemTotal] = useState(true); // State để điều khiển biểu đồ nào được hiển thị
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/hanghoa/get-du-lieu');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setBackendProducts(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    // Tính tổng giá trị hàng hóa
    const totalValue = backendProducts.reduce((total, item) => {
      const itemTotal = item.soLuong * item.giaNhap;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    
    const chartData = backendProducts.map(item => ({
      ten: item.ten,
    //   itemTotal: item.soLuong * item.giaNhap, 
    soLuong: item.soLuong, // Số lượng
      giaNhap: item.giaNhap, // Giá nhập
    }));
    const tableAnimation = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
    };
  
    return (
      <>
      <div className='bg-gray-100 h-full w-full'>
      <Nav_bar />
      <Search_bar />
<div className="flex gap-4 mt-24">
      <Card className="ml-[21%] mt-10 w-1/2">
        <CardContent>
        
          <div className="w-full h-[35%] mt-10">
            <div className="flex gap-4 mb-4 justify-end">
            
              <button 
                className={`px-4 py-2 rounded ${showItemTotal ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                onClick={() => setShowItemTotal(true)}>
                Quantity
              </button>
              <button 
                className={`px-4 py-2 rounded ${!showItemTotal ? 'bg-purple-500 text-white' : 'bg-gray-200'}`} 
                onClick={() => setShowItemTotal(false)}>
                Price
              </button>
            </div>
  
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="ten"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  type="number"
                  domain={['auto', 'auto']}
                  interval="preserveStartEnd"
                  tickFormatter={(tick) => `${tick / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                
                {showItemTotal && (
                  <Area
                    dataKey="soLuong"
                    type="natural"
                    fill="blue"
                    fillOpacity={0.6}
                    stroke="blue"
                  />
                )}
                {!showItemTotal && (
                  <Area
                    dataKey="giaNhap"
                    type="natural"
                    fill="purple"
                    fillOpacity={0.6}
                    stroke="purple"
                  />
                )}
              </AreaChart>
            </ChartContainer>
          </div>

        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
              Quantity and import price of each source of goods <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>         
       <div className="w-1/2 h-[35%] mt-10">
            <div className='w-full h-[50%]'>
                <Pie_chart />
            </div>
            <div className="w-full h-[50%] mt-4 bg-white flex items-center justify-between p-4 rounded-lg shadow-md">
                <img 
                    src="/path-to-your-bank-card-image.png" 
                    alt="Bank Card" 
                    className="w-16 h-16 object-contain" 
                />
                
                {/* Số liệu doanh thu */}
                <div className="text-xl font-semibold">
                    <p>Total Revenue</p>
                    <p className="text-green-500">$12,345.67</p> {/* Bạn có thể thay đổi số liệu này */}
                </div>
            </div>

        </div>
        </div>
        <div className="ml-[21%] mt-10 pt-10 relative border-2 solid rounded-lg bg-white">
          <motion.div
            className="container mx-auto"
            initial="hidden"
            animate="visible"
            variants={tableAnimation}
          >
            <h1 className="text-2xl font-bold text-center text-blue-800">
              Products List
            </h1>
            <motion.div
              className="overflow-x-auto mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
            >
              <table className="bg-white border border-blue-400 w-full">
                <thead>
                  <tr className="bg-blue-200 text-blue-900">
                    <th className="name-data border border-blue-400 p-2">Serial Number</th>
                    <th className="name-data border border-blue-400 p-2">Product Code</th>
                    <th className="name-data border border-blue-400 p-2">Product Name</th>
                    <th className="name-data border border-blue-400 p-2">Quantity</th>
                    <th className="name-data border border-blue-400 p-2">Price</th>
                    <th className="name-data border border-blue-400 p-2">Total Price</th>
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
                      className="border border-blue-400 p-2 text-right text-blue-900 font-bold"
                    >
                     Total Product Value: 
                    </td>
                    <td className="border border-blue-400 p-2 text-center font-bold">
                      {totalValue.toLocaleString()} VNĐ
                    </td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
          </motion.div>
        </div>
        </div>
        </>
  );
}
