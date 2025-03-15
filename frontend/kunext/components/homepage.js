'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'


export default function Homepage() {

  const BASE_URL = 'https://yourdomainname'

  const [newsdataresponse, setNewsDataResponse] = useState([]);

  useEffect(()=>{
      shownews();
  },[]);

  function shownews(){
    const shownewsdata = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/readnews`)
            //console.log(response.data[0]);
            setNewsDataResponse(response.data);
        }catch(e){
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
    shownewsdata();
  }

  return (
    
    <div className='grid min-h-screen bg-white py-10 lg:px-8'>
      <div className='border rounded-md mx-auto w-3/4 p-5'>

        <div className='flex items-center my-2 text-black'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <p className='mx-4 text-lg'>ประกาศจาก Admin</p>
        </div>

        {newsdataresponse.map((item, index) => (
            <div key={item.id || index} className="bg-white mt-5 border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{item.news_title}</h5>
                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-400 dark:text-gray-400">{item.newsdatecreate} {item.newstimecreate}</h5>
                <p className="mb-4 font-normal text-gray-800 whitespace-pre-line dark:text-gray-800">{item.news_detail}</p>
                <p className="mb-3 text-sm font-normal text-gray-500 dark:text-gray-500">Admin : {item.std_fname} {item.std_lname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
