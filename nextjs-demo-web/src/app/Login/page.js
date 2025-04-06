// "use client";
// import { Inter } from 'next/font/google';
// import VideoComponent from "@/app/components/VideoComponent";
// import { useEffect, useState } from 'react';
// import backgroundsection from '/public/Subdone.svg';
// import logo from '/public/logo-removebg-preview.png';
// import  { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation'; // Dùng Next router để chuyển trang

// // Import font Montserrat from Google Fonts
// const montserrat = Inter({ subsets: ['latin'] }); 
// // Home page component
// export default function Home() {
//   const router = useRouter();
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');

//   const [showSecondComponent, setShowSecondComponent] = useState(false); 
//   useEffect(() => {
//     // Set a timeout to show the second component after 4 seconds
//     const timer = setTimeout(() => {
//       setShowSecondComponent(true); //set thời gian hiển thị cho component thứ 2
//     }, 2800);

//     // Cleanup the timer on component unmount
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (showSecondComponent) {
//       const video = document.querySelector("video");
//       if (video) {
//         video.style.display = "none"; 
//       }
//     }
//   }, [showSecondComponent]);

//   return (
//     <main className="h-screen overflow-auto">
//       <VideoComponent />
// {showSecondComponent && (
//   <motion.div 
//     className="flex"
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -20 }}
//     transition={{ duration: 0.5 }}
//   >
//     {/* Background Section */}
//     <motion.div 
//       className="relative top-6 left-10 w-[60%] h-[95%]"
//       initial={{ y: 50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ delay: 0.2, duration: 1 }}  
//     >
//       <Image
//         className="w-full h-full object-cover rounded-2xl"
//         alt="Background Section"
//         src={backgroundsection}
//       />
//       <motion.div 
//         className="absolute left-5 top-5 flex items-center space-x-4"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.8 }} 
//       >
//         <Image className="w-20" alt="Logo" src={logo} />
//         <p className="text-4xl font-bold text-white">FRAXA</p>
//       </motion.div>
//       <motion.div 
//         className="absolute left-[-0.5rem] bottom-[-0.5rem]"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 2.5 }} 
//       >
//         <p className="text-8xl font-bold text-blue-900">MANAGEMENT</p>
//       </motion.div>
//       <motion.div 
//         className="absolute left-[-0.5rem] bottom-20"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 2.5}}  
//       >
//         <p className="text-8xl font-bold text-blue-900">PACKAGE</p>
//       </motion.div>
//     </motion.div>

//     {/* Login Form */}
//     <div className="relative top-6 ml-20 w-[30%] h-auto rounded-2xl">
//       <motion.div 
//         className="relative w-full h-full p-8 bg-blue-900 text-white rounded-2xl"
//         initial={{ x: 50, opacity: 0 }}  
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.7, duration: 0.5 }}  
//       >
//         {/* Close Button */}
//         <div className="absolute top-4 right-4 w-16 h-16 flex items-center justify-center bg-white text-blue-900 font-bold rounded-full cursor-pointer">
//         <i class="fa-solid fa-2xl fa-chevron-right"></i>
//         </div>
        
//         {/* Heading */}
//         <h2 className="text-5xl font-bold text-center mt-20">WELCOME BACK!</h2>
//         <p className="text-base text-2xl mt-2 text-center">Please enter your details</p>
        
//         {/* Form */}
//         <form 
//         className="mt-6"
//         onSubmit={async (e) => {
//           e.preventDefault();
      
//           try {
//             const response = await fetch('http://localhost:3000/auth/login', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 username: username,
//                 password: password,
//               }),
//             });
      
//             const data = await response.json();
      
//             if (response.ok) {
//               router.push('/main');
//             } else {
//               alert(data.message || 'Login failed');
//             }
//           } catch (error) {
//             console.error('Login error:', error);
//             alert('Something went wrong. Please try again.');
//           }
//         }}
//         >
//           <label className="block text-base font-medium">Email</label>
//           <div className="flex items-center bg-white p-2 rounded-md text-black mt-1">
//             <i className="fa-solid fa-user text-blue-900"></i>
//             <input 
//             type="email" 
//             placeholder="Example@Something.com" 
//             className="w-full outline-none ml-2"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <label className="block text-base font-medium mt-4">Password</label>
//           <div className="flex items-center bg-white p-2 rounded-md text-black mt-1">
//             <i className="fa-solid fa-lock text-blue-900"></i>
//             <input type="password" placeholder="••••••" className="w-full outline-none ml-2"  value={password}  onChange={(e) => setPassword(e.target.value)}/>
//           </div>
          
//           <button className="w-full bg-white text-blue-900 py-2 mt-6 rounded-md font-bold">Log In</button>
//         </form>
//       </motion.div>
//     </div>
//   </motion.div>
// )}

//     </main>
//   );
// }



// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { motion } from 'framer-motion';
// // import Image from 'next/image';
// // import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';

// // const punycode = require('punycode/');

// // const LoginPage = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [showLogin, setShowLogin] = useState(true); // Thêm trạng thái để kiểm soát hiển thị màn hình đăng nhập
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
// //   const router = useRouter();

// //   useEffect(() => {
// //     // Kiểm tra trạng thái đăng nhập từ localStorage
// //     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
// //     setIsLoggedIn(loggedIn);
// //     if (loggedIn) {
// //       setShowLogin(false); // Ẩn màn hình đăng nhập nếu đã đăng nhập
// //       router.push('/'); // Điều hướng đến trang chính nếu đã đăng nhập
// //     }
// //   }, [router]);

// //   const handleLoginSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch('http://localhost:3000/auth/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Login failed');
// //       }

// //       const data = await response.json();
// //       localStorage.setItem('token', data.access_token);
// //       localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
// //       setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
// //       setShowLogin(false); // Ẩn màn hình đăng nhập sau khi đăng nhập thành công
// //       router.push('/'); // Điều hướng đến trang chính sau khi đăng nhập thành công
// //     } catch (error) {
// //       console.error('Error:', error);
// //       alert('Login failed');
// //     }
// //   };

// //   const handleRegisterSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch('http://localhost:3000/auth/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Registration failed');
// //       }

// //       alert('Registration successful');
// //       setIsLogin(true);
// //     } catch (error) {
// //       console.error('Error:', error);
// //       alert('Registration failed');
// //     }
// //   };

// //   return (
// //     <>
// //       {showLogin ? (
// //         <>
// //           <Image
// //             alt="Background"
// //             src={Background}
// //             placeholder="blur"
// //             quality={100}
// //             sizes="100vw"
// //             style={{
// //               objectFit: 'cover',
// //               position: 'fixed',
// //             }}
// //             className="blur-sm absolute w-screen h-screen"
// //           />
// //           <motion.div
// //             className="flex relative flex-col space-y-4 mt-8 pt-16"
// //             initial="hidden"
// //             animate="visible"
// //             variants={{
// //               hidden: { opacity: 0, y: 20 },
// //               visible: { opacity: 1, y: 0, transition: { duration: 1 } },
// //             }}
// //           >
// //             <motion.h1
// //               className="text-2xl font-bold mr-4 text-center"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 0.5 }}
// //             >
// //               {isLogin ? 'Login' : 'Register'}
// //             </motion.h1>
// //             <div className="w-full flex justify-center">
// //               <div className="w-3/5 border-t-2 border-blue-700"></div>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //               {isLogin ? (
// //                 <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
// //                   <label>
// //                     Username:
// //                     <input
// //                       type="text"
// //                       value={username}
// //                       onChange={(e) => setUsername(e.target.value)}
// //                       required
// //                       className="border border-gray-300 p-2 rounded w-full"
// //                     />
// //                   </label>
// //                   <label>
// //                     Password:
// //                     <input
// //                       type="password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       required
// //                       className="border border-gray-300 p-2 rounded w-full"
// //                     />
// //                   </label>
// //                   <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
// //                     Login
// //                   </button>
// //                   <p className="text-center mt-4">
// //                     Don't have an account?{' '}
// //                     <button type="button" onClick={() => setIsLogin(false)} className="text-blue-500 underline">
// //                       Register
// //                     </button>
// //                   </p>
// //                 </form>
// //               ) : (
// //                 <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
// //                   <label>
// //                     Username:
// //                     <input
// //                       type="text"
// //                       value={username}
// //                       onChange={(e) => setUsername(e.target.value)}
// //                       required
// //                       className="border border-gray-300 p-2 rounded w-full"
// //                     />
// //                   </label>
// //                   <label>
// //                     Password:
// //                     <input
// //                       type="password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       required
// //                       className="border border-gray-300 p-2 rounded w-full"
// //                     />
// //                   </label>
// //                   <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
// //                     Register
// //                   </button>
// //                   <p className="text-center mt-4">
// //                     Already have an account?{' '}
// //                     <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 underline">
// //                       Login
// //                     </button>
// //                   </p>
// //                 </form>
// //               )}
// //             </div>
// //           </motion.div>
// //         </>
// //       ) : (
// //         <div>
// //           {/* Nội dung khác sau khi đăng nhập */}
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default LoginPage;