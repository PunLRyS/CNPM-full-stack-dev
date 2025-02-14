"use client";
import { Inter } from 'next/font/google';
import Nav_bar from '@/app/components/Nav/Nav_bar';
import VideoComponent from '@/app/components/VideoComponent';
import Link from "next/link";
import { useEffect, useState } from 'react';
import  { motion } from 'framer-motion';
import Image from 'next/image';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';

const montserrat = Inter({ subsets: ['latin'] }); // lấy font chữ

export default function Home(){
    const [showSecondComponent, setShowSecondComponent] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        const timer = setTimeout(()=> {
            setShowSecondComponent(true);
        }, 3600);

        return () => clearTimeout(timer);
    }, []);
}