"use client"

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { remark } from 'remark';
import html from 'remark-html';

export default function Chatbotpage() {
    const router = useRouter();
    const [userdata, setuserdata] = useState(null);

    const [chatpopup, setchatpopup] = useState(false);

    const openchat = () => setchatpopup(true);
    const closechat = () => setchatpopup(false);

    const [messageContent, setMessageContent] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const GEMINI_API_KEY = 'your gemini api key';

    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = sessionStorage.getItem('kunext');
            if (!storedData) {
                router.push('/');
            } else {
                setuserdata(JSON.parse(storedData));
            }
        }
    }, [router]);

    function setchatpopupstatus() {
        try {
            if (chatpopup == false) {
                openchat()
            } else {
                closechat()
            }
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const handleSendMessage = async () => {

        if (!messageContent.trim()) return;

        const userMessage = {
            sender: userdata.std_fname,
            text: messageContent
        };

        setChatMessages((prev) => [...prev, userMessage]);
        setMessageContent('');

        try {
            let prompt = `ชื่อว่า Kirin เป็น AI ผู้ช่วยสำหรับการศึกษา เพศหญิง เป็นคนตลด สดใส และ คอยให้กำลังใจกับทุกคน เป็นมิตรและใจดี ทุกครั้งที่ตอบกลับไม่ต้องบอกว่า User:และ ตอนนี้กำลังพูดคุยอยู่กับ ${userdata.std_fname}\n${userdata.std_fname}: ${messageContent}\nKirin:`;

            // console.log(chatMessages);

            if (chatMessages.length > 0) {
                prompt = prompt + `นี่คือประวัติการพูดคุยของคุณกับ ${userdata.std_fname}`;

                for (let i = 0; i < chatMessages.length; i++) {
                    prompt = prompt + chatMessages[i].sender + ":" + chatMessages[i].text;
                }
            }

            // console.log(prompt);



            const response = await model.generateContent(prompt);
            console.log(response.response.text());

            const assistantMessage = {
                sender: 'assistant',
                text: response.response.text() || 'ไม่สามารถตอบคำถามได้ในขณะนี้'
            };

            // console.log(userdata);

            // console.log(response.data?.candidates?.[0]?.content?.parts?.[0].text)

            setChatMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error fetching response:', error.response?.data || error.message);
            Swal.fire('Error', 'ไม่สามารถเชื่อมต่อกับ API ได้', 'error');
        }

    };

    const convertMarkdownToHTML = (markdownText) => {
        const result = remark().use(html).processSync(markdownText);
        return result.toString();
    };

    return (
        <div className=''>
            <div className="fixed bottom-0 right-0 mb-4 mr-4">
                <button onClick={setchatpopupstatus} id="open-chat" className="bg-green-600 hover:bg-green-500 dark:bg-gray-800 text-white py-2 px-4 rounded-md dark:hover:bg-gray-900 transition duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                </button>
            </div>

            {chatpopup && (
                <div className="fixed bottom-16 right-4 max-w-[90vw] sm:w-[650px]">
                    <div className="bg-white shadow-md rounded-lg w-full">
                        <div className="p-4 border-b bg-green-600 dark:bg-gray-800 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Kirin Assistant</p>
                            <div className="position-right">
                                <button className="" onClick={setchatpopupstatus}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={`mb-2 flex ${msg.sender === userdata.std_fname ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`overflow-y-auto rounded-lg py-2 px-4 inline-block ${msg.sender === userdata.std_fname ? 'bg-green-600 dark:bg-gray-800 text-white' : 'bg-green-400 dark:bg-gray-600 text-white'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(msg.text) }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t flex">
                            <input
                                id="user-input"
                                type="text"
                                placeholder="ข้อความ"
                                className="w-full text-gray-800 px-3 py-2 border rounded-l-md focus:outline-none"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                            />
                            <button
                                id="send-button"
                                className="bg-green-600 hover:bg-green-500 dark:bg-gray-800 dark:hover:bg-gray-900 text-white px-4 py-2 rounded-r-md transition duration-300"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
