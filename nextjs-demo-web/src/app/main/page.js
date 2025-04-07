"use client"

import React from 'react';
import Pie_chart, { chartConfig, chartData } from '../components/Piechart';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useState } from "react";
import Nav_bar from '../components/Nav/Nav_bar';
import Search_bar from '../components/Nav/Search_bar';
import Chatbot from '../components/Chatbot-main';
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Label,RadialBar,RadialBarChart, PolarRadiusAxis,Bar,BarChart} from "recharts";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card";
import {ChartContainer,ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

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
    
   
    const tableAnimation = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
    };

    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [goodsResponse, dealersResponse] = await Promise.all([
            fetch('http://localhost:3000/phieu-xuat-hang-hoa/get-du-lieu'),
            fetch('http://localhost:3000/phieu-xuat-dai-ly/get-du-lieu'),
            ]);

            if (!goodsResponse.ok || !dealersResponse.ok) {
            throw new Error('Không thể lấy dữ liệu từ một trong các API');
            }

            const goodsData = await goodsResponse.json();
            const dealersData = await dealersResponse.json();

            console.log("Dữ liệu từ API phieu-xuat-hang-hoa/get-du-lieu:", goodsData);

            const enrichedGoodsData = await Promise.all(
            goodsData.map(async (goodsItem) => {
                const goodsDetailResponse = await fetch(`http://localhost:3000/hanghoa/find/${goodsItem.maHangHoa}`);
                const goodsDetailData = goodsDetailResponse.ok ? await goodsDetailResponse.json() : {};
                return { 
                ...goodsItem, 
                tenHangHoa: goodsDetailData.ten || 'Tên không có sẵn',
                };
            })
            );

            const enrichedDealersData = await Promise.all(
            dealersData.map(async (dealerItem) => {
                const dealerDetailResponse = await fetch(`http://localhost:3000/daily/get-by-ma/${dealerItem.maDaiLy}`);
                const dealerDetailData = dealerDetailResponse.ok ? await dealerDetailResponse.json() : {};
                return { ...dealerItem, ...dealerDetailData };
            })
            );

            const combinedData = enrichedGoodsData.map((goodsItem) => {
            const dealer = enrichedDealersData.find((dealerItem) => dealerItem.maPhieuXuat === goodsItem.maPhieuXuat) || {};
            return { ...goodsItem, ...dealer };
            });

            setCombinedData(combinedData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
        };

        fetchData();
    }, []);

    // Tính tổng doanh thu
    const totalRevenue = combinedData.reduce((sum, item) => {
        return sum + (item.soLuong * item.giaNhap);
    }, 0);

    const chartData = backendProducts.map(item => ({
        ten: item.ten,
        soLuong: item.soLuong, // Số lượng
        giaNhap: item.giaNhap, // Giá nhập
        tongDoanhThu: totalRevenue, // Tổng doanh thu
        tonggiaNhap: totalValue,
    }));

    const chartConfig = {
        desktop: {
          label: "Giá trị hàng hóa",
          color: "hsl(var(--chart-1))",
        },
    };

    const totalOrders = combinedData.length;
    const totalProfit = totalRevenue - totalValue; // Tính tổng lợi nhuận
    const totalProfitPercentage = ((totalProfit / totalRevenue) * 100).toFixed(2); // Tính phần trăm lợi nhuận
    return (
      <>
        <div className='bg-gray-100 h-full w-full'>
            <Nav_bar />
            <Search_bar />
            <div className="flex gap-4 mt-16">
                    <Card className="ml-[21%] mt-10 w-1/2">
                        <CardContent>
                            <div className="w-full h-[35%] mt-10">
                                <div className="flex gap-4 mb-4 justify-end">
                                    <button 
                                        className={`px-4 py-2 rounded ${showItemTotal ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} 
                                        onClick={() => setShowItemTotal(true)}>
                                        Quantity
                                    </button>
                                    <button 
                                        className={`px-4 py-2 rounded ${!showItemTotal ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                                        onClick={() => setShowItemTotal(false)}>
                                        Price
                                    </button>
                                </div>
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <BarChart accessibilityLayer data={chartData} margin={{left: 12, right: 12}}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                        dataKey="ten"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <YAxis
                                            type="number"
                                            domain={['auto','auto']}
                                            interval="preserveStartEnd"
                                            tickFormatter={(tick) => `${tick / 1000}k`}
                                        />
                                        <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                        />
                                        {showItemTotal && (
                                            <Bar
                                                dataKey="soLuong"
                                                type="natural"
                                                fill="blue"
                                                fillOpacity={0.9}
                                                stroke="blue"
                                                radius={8}
                                            />
                                        )}
                                        {!showItemTotal && (
                                            <Bar
                                                dataKey="giaNhap"
                                                type="natural"
                                                fill="blue"
                                                fillOpacity={0.5}
                                                stroke="blue"
                                                radius={8}
                                            />
                                        )}
                                    </BarChart>
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
                        <div className="w-full h-[50%] mt-4 bg-white flex gap-4 p-4 rounded-lg shadow-md">
                            <img 
                                src="/599d157d5c31ef6fb620.jpg" 
                                alt="Bank Card" 
                                className="w-1/2 h-full object-contain rounded-lg shadow-md" 
                            />
                            
                            <div className="mt-4 ml-6">
                                <div className='flex mb-4'>
                                    <p className='text-2xl font-semibold '>Total Profit</p>
                                    <p className="text-green-500 text-2xl font-semibold text-center ml-2">{totalProfit.toLocaleString()}</p>
                                </div>
                                <Card className="flex flex-col shadow-none border-none">
                                    <CardContent className="flex items-center justify-center pb-0 min-h-[50px]">
                                        <ChartContainer
                                            config={chartConfig}
                                            className="w-full max-w-[180px] h-[130px]" // đủ không gian hiển thị
                                        >
                                            <RadialBarChart
                                                data={chartData}
                                                endAngle={180}
                                                innerRadius={50}       
                                                outerRadius={70}    
                                            >
                                                <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel />}
                                                />
                                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                return (
                                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                                        <tspan
                                                                        x={viewBox.cx}
                                                                        y={(viewBox.cy || 0) - 16}
                                                                        className="fill-foreground text-xl font-bold"
                                                                        >
                                                                            {totalOrders.toLocaleString()}
                                                                        </tspan>
                                                                        <tspan
                                                                        x={viewBox.cx}
                                                                        y={(viewBox.cy || 0) + 10}
                                                                        className="fill-muted-foreground text-sm"
                                                                        >
                                                                            Total Orders
                                                                        </tspan>
                                                                    </text>
                                                                );
                                                            }
                                                            return null;
                                                        }}
                                                    />
                                                </PolarRadiusAxis>

                                                <RadialBar
                                                dataKey="tongDoanhThu"
                                                stackId="a"
                                                cornerRadius={5}
                                                fill="var(--color-desktop)"
                                                className="stroke-transparent stroke-2"
                                                />
                                                <RadialBar
                                                dataKey="tonggiaNhap"
                                                fill="var(--color-mobile)"
                                                stackId="a"
                                                cornerRadius={5}
                                                className="stroke-transparent stroke-2"
                                                />
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                    <CardFooter className="flex-col gap-2 text-sm">
                                            <div className="flex items-center gap-2 font-medium leading-none">
                                            {totalProfitPercentage.toLocaleString()}<TrendingUp className="h-4 w-4" />
                                            </div>
                                            <div className="leading-none text-muted-foreground">
                                            Showing total profit percentage
                                            </div>
                                    </CardFooter>
                                </Card>

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
                <div className="fixed bottom-0 right-0 m-4 z-50">
                    <Chatbot />
                </div>
        </div>
    </>
  );
}
