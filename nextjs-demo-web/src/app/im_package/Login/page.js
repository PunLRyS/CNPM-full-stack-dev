"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';
import VideoComponent from '../../components/VideoComponent';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showLogin, setShowLogin] = useState(true); // Thêm trạng thái để kiểm soát hiển thị màn hình đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setShowLogin(false); // Ẩn màn hình đăng nhập nếu đã đăng nhập
      router.push('/'); // Điều hướng đến trang chính nếu đã đăng nhập
    }
  }, [router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
      setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
      setShowLogin(false); // Ẩn màn hình đăng nhập sau khi đăng nhập thành công
      router.push('/'); // Điều hướng đến trang chính sau khi đăng nhập thành công
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      alert('Registration successful');
      setIsLogin(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  return (
    <>
      <VideoComponent isLoggedIn={isLoggedIn} />
      {showLogin ? (
        <>
          <Image
            alt="Background"
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
          <motion.div
            className="flex relative flex-col space-y-4 mt-8 pt-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
          >
            <motion.h1
              className="text-2xl font-bold mr-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isLogin ? 'Login' : 'Register'}
            </motion.h1>
            <div className="w-full flex justify-center">
              <div className="w-3/5 border-t-2 border-blue-700"></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                  <label>
                    Username:
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </label>
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
                    Login
                  </button>
                  <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setIsLogin(false)} className="text-blue-500 underline">
                      Register
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                  <label>
                    Username:
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </label>
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
                    Register
                  </button>
                  <p className="text-center mt-4">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 underline">
                      Login
                    </button>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      ) : (
        <div>
          {/* Nội dung khác sau khi đăng nhập */}
        </div>
      )}
    </>
  );
};

export default LoginPage;