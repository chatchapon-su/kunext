'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'


export default function Lectlogpage() {

  const BASE_URL = 'https://yourdomainname'

  const [loglectdata,setloglectdata] = useState([]);

    useEffect(()=>{
        showlect()
    },[]);

    const bottomRef = useRef(null);

    useEffect(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [loglectdata]);

    function showlect(){
        const showlogdata = async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/loglectdata`)

                setloglectdata(response.data);
            }catch(e){
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
        showlogdata()
        
    }

    

  return (
    
    <div className="min-h-screen bg-white py-10 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Event Lect Logs</h2>
            <div className="overflow-y-auto max-h-[70vh]">
              {loglectdata.map((log, index) => (
                <div key={index} className="">
                  <div className="text-white mb-2">
                    <span className="text-sm">[ {log.lectlogdate} {log.lectlogtime} ]</span>
                    <span className="text-sm ml-2">{log.std_code}</span>
                    {log.lect_subject?<span className="text-sm ml-2">subject : {log.lect_subject}</span>:""}
                    <span className="text-sm ml-2">id : {log.lect_id}</span>
                    <span className="text-sm ml-2">status : {log.lect_status}</span>
                    <span className="text-sm ml-2">title : {log.lect_title}</span>
                    <span className="text-sm ml-2">detail : {log.lect_detail}</span>
                    {log.lect_file?<span className="text-sm ml-2">file : {log.lect_file}</span>:""}
                    
                  </div>
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
