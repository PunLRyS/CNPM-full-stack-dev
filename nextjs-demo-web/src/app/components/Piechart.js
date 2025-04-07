"use client"

import React, { useMemo } from "react"
import { Tablet, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell, YAxis, Area } from "recharts"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export default function Component() {
    const [backendProducts, setBackendProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
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
      
      const chartData = backendProducts.map(item => ({
          name: item.ten,
          value: item.soLuong * item.giaNhap, // Giá trị tổng
        }));
        const chartConfig = {
            Products: {
              label: "Products",
            },
            hoa: {
              label: "Hoa",
              color: "hsl(210, 100%, 80%)",  // Xanh nước biển tím nhạt
            },
            Laptop: {
              label: "Laptop",
              color: "hsl(220, 80%, 55%)",  // Xanh nước biển tím tươi
            },
            PCgaming: {
              label: "PCgaming",
              color: "hsl(230, 70%, 40%)",  // Xanh nước biển tím đậm
            },
            Mouse: {
              label: "Mouse",
              color: "hsl(240, 90%, 35%)",  // Xanh nước biển tím đậm hơn
            },
            Keyboard: {
              label: "Keyboard",
              color: "hsl(250, 60%, 70%)",  // Xanh nước biển tím nhẹ
            },
            Tablet: {
              label: "Tablet",
              color: "hsl(230, 70%, 50%)",  // Xanh nước biển tím trung bình
            },
          }
          

const totalValue = backendProducts.reduce((total, item) => {
    const itemTotal = item.soLuong * item.giaNhap;
    return total + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
                 {chartData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={chartConfig[entry.name]?.color || "#ccc"}
    />
  ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          VNĐ
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        Total value of each item in the warehouse <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

