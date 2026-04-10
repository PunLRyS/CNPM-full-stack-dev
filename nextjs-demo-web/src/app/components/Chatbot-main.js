// import { useEffect } from "react";
// import Head from "next/head";
// import "./Nav/Chatbot.css"

// export default function Chatbot() {
//     useEffect(() => {
//         if (!document.querySelector(`script[src="/js/Chatbot.js"]`)) {
//             const script = document.createElement("script");
//             script.src = "/js/Chatbot.js";
//             script.async = true;
//             document.body.appendChild(script);
//         } else {
//             console.log("Script already loaded.");
//         }
//     }, []);
//     return (
//         <>
//             <Head>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" />
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" />
//             </Head>
//             <div className="chatbot-popup">
//                 <div className="chat-header">
//                     <div className="header-infor">
//                         <svg className="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
//                             <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
//                         </svg>
//                         <h1 className="logo-text">Chatbot</h1>

//                     </div>
//                     <button id="close-chatbot" className="material-symbols-rounded">
//                         <i class="fa-solid fa-chevron-down"></i>
//                     </button>
//                 </div>

//                 <div className="chatbot-body">
//                     <div className="message bot-message">
//                         <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
//                             <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
//                         </svg>
//                         <div className="message-text">Hey there! <br /> How are you today ?</div>
//                     </div>
//                 </div>

//                 <div className="chatbot-footer">
//                     <form action="" className="chat-form">
//                         <textarea placeholder="Message ..." id="" className="message-input" required></textarea>
//                         <div className="chat-controls">
//                             <button type="button" className="material-symbols-rounded"><i class="fa-solid fa-face-smile"></i></button>
//                             <div className="file-upload-wrapper">
//                                 <input type="file" accept="image/*" id="file-input" hidden />
//                                 <img src="#" />
//                                 <button type="button" id="file-upload" className="material-symbols-rounded"><i class="fa-solid fa-paperclip"></i></button>
//                                 <button type="button" id="file-cancel" className="material-symbols-rounded"><i class="fa-solid fa-xmark"></i></button>
//                             </div>
//                             <button type="button" className="material-symbols-rounded" id="send-message"><i class="fa-solid fa-arrow-up"></i></button>
//                         </div>
//                     </form>
//                 </div>

//             </div>
//             <button id="toggle-chat" className="material-symbols-rounded"><i class="fa-brands fa-rocketchat"></i></button>
//         </>
//     );
// };

import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import "./Nav/Chatbot.css";

export default function Chatbot() {
    // 1. Quản lý trạng thái (State)
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hey there! <br /> How are you today ?", file: null, isThinking: false }
    ]);

    // 2. Tham chiếu đến các phần tử DOM (Refs)
    const chatBodyRef = useRef(null);
    const fileInputRef = useRef(null);

    // CẤU HÌNH API
    const API_KEY = "AIzaSyCbbJC76nqsq-8qJI3Fhbx5_RNzq2MbzxI"; // Lời khuyên: Đưa vào file .env
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // 3. Tự động cuộn xuống cuối mỗi khi có tin nhắn mới
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, isOpen]);

    // 4. Xử lý tải file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result.split(",")[1];
            setSelectedFile({
                data: base64String,
                mime_type: file.type,
                previewUrl: event.target.result // Dùng để hiển thị ảnh preview
            });
            // Reset input file để có thể chọn lại cùng 1 file
            if (fileInputRef.current) fileInputRef.current.value = "";
        };
        reader.readAsDataURL(file);
    };

    const handleCancelFile = () => {
        setSelectedFile(null);
    };

    // 5. Xử lý gửi tin nhắn & Gọi API Gemini
    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();

        const userText = inputValue.trim();
        if (!userText && !selectedFile) return; // Không gửi nếu trống

        // Lưu dữ liệu hiện tại và clear form lập tức
        const fileToSend = selectedFile;
        setInputValue("");
        setSelectedFile(null);

        // Thêm tin nhắn của User vào mảng
        const newUserMessage = { role: "user", text: userText, file: fileToSend, isThinking: false };

        // Thêm tin nhắn Bot ở trạng thái "Đang suy nghĩ"
        const botThinkingMessage = { role: "bot", text: "", file: null, isThinking: true };

        setMessages((prev) => [...prev, newUserMessage, botThinkingMessage]);

        // Chuẩn bị data gọi API
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: userText || "Mô tả ảnh này" }, // Nếu chỉ có ảnh, mặc định là hỏi về ảnh
                        ...(fileToSend ? [{ inline_data: { data: fileToSend.data, mime_type: fileToSend.mime_type } }] : [])
                    ]
                }]
            })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();

            if (!response.ok) throw new Error(data.error?.message || "Lỗi kết nối API");

            const apiResponseText = data.candidates[0].content.parts[0].text.trim();

            // Cập nhật lại tin nhắn Bot cuối cùng với kết quả trả về
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "bot",
                    text: apiResponseText,
                    file: null,
                    isThinking: false
                };
                return newMessages;
            });

        } catch (error) {
            console.error("Lỗi API Gemini:", error);
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: "bot",
                    text: "Xin lỗi, tôi đang gặp sự cố kết nối. (Hoặc hết Quota, vui lòng thử lại sau vài phút)",
                    file: null,
                    isThinking: false
                };
                return newMessages;
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" />
            </Head>

            {/* Popup Chatbot */}
            <div className="chatbot-popup" style={{ display: isOpen ? "block" : "none" }}>
                {/* Header */}
                <div className="chat-header">
                    <div className="header-infor">
                        <svg className="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                        </svg>
                        <h1 className="logo-text">Chatbot</h1>
                    </div>
                    <button className="material-symbols-rounded" onClick={() => setIsOpen(false)}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </button>
                </div>

                {/* Body (Hiển thị mảng messages) */}
                <div className="chatbot-body" ref={chatBodyRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role === "bot" ? "bot-message" : "user-message"} ${msg.isThinking ? "thinking" : ""}`}>
                            {msg.role === "bot" && (
                                <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                                </svg>
                            )}
                            <div className="message-text">
                                {/* Khối xử lý hiển thị ảnh do user gửi */}
                                {msg.file && (
                                    <img src={msg.file.previewUrl} className="attachment" alt="User upload" />
                                )}

                                {/* Khối xử lý hiển thị hiệu ứng thinking */}
                                {msg.isThinking ? (
                                    <div className="thinking-indicator">
                                        <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                                    </div>
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer (Input & Upload) */}
                <div className="chatbot-footer">
                    <form className="chat-form" onSubmit={handleSendMessage}>
                        <textarea
                            placeholder="Message ..."
                            className="message-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <div className="chat-controls">
                            <button type="button" className="material-symbols-rounded">
                                <i className="fa-solid fa-face-smile"></i>
                            </button>

                            <div className={`file-upload-wrapper ${selectedFile ? "file-uploaded" : ""}`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <img src={selectedFile?.previewUrl || "#"} alt="preview" />
                                <button type="button" className="material-symbols-rounded" onClick={() => fileInputRef.current.click()}>
                                    <i className="fa-solid fa-paperclip"></i>
                                </button>
                                <button type="button" className="material-symbols-rounded" id="file-cancel" onClick={handleCancelFile}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <button type="submit" className="material-symbols-rounded" id="send-message">
                                <i className="fa-solid fa-arrow-up"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Nút Toggle */}
            <button
                id="toggle-chat"
                className="material-symbols-rounded"
                style={{ display: isOpen ? "none" : "block" }}
                onClick={() => setIsOpen(true)}
            >
                <i className="fa-brands fa-rocketchat"></i>
            </button>
        </>
    );
}