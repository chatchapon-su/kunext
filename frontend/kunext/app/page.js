'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'


export default function Home() {
  const [stdCode,setstdCode] = useState('')
  const [stdPassword,setstdPassword] = useState('')
  const router = useRouter()
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem('kunext');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log('Stored Data:', parsedData);
      }
    }
  }, []);

  function login(event){
    event.preventDefault()
    console.log({stdCode,stdPassword})


    const BASE_URL = 'https://yourdomainname'

    const checklogin = async ()=>{
      try{
        const userdata = {
            std_code: stdCode,
            std_password: stdPassword
        }
        const response = await axios.post(`${BASE_URL}/login`, userdata)
        console.log(response.data[0])
        if(response.data[0].std_status=="out"){
            throw{
                message:"Something went wrong"
            }
        }


        const stddatasession = {
          std_code: response.data[0].std_code,
          std_email: response.data[0].std_email,
          std_fname: response.data[0].std_fname,
          std_lname: response.data[0].std_lname,
          std_rank: response.data[0].std_rank,
          std_status: response.data[0].std_status,
          std_type: response.data[0].std_type,
          std_year: response.data[0].std_year
        }

        sessionStorage.setItem('kunext', JSON.stringify(stddatasession));
        
        Swal.fire({
            icon: "success",
            title: "Success",
            confirmButtonText: 'OK',
            timer: 2000
        });

        router.push('/home')
      }catch(e){
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'OK'
        })
      }
    }

    checklogin()
  }

  return (
    <div className="bg-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 text-black sm:p-20 font-Roboto">

      <Image
        className='mx-auto'
        aria-hidden
        src="https://my.ku.th/img/KU_Logo_PNG.png"
        alt="KU icon"
        width={120}
        height={150}
      />
      <div className="text-sm my-5 text-center">
          <p>เข้าใช้งานระบบ KU Next</p>
      </div>
      <div className='w-full'>
        <div className="mx-auto 2xl:w-1/4 xl:w-1/4 lg:w-1/4  md:w-1/3">
          <form onSubmit={login}>
            <p>รหัสนิสิต</p>
            <div className="border rounded-md my-1">
              <input className="p-1 w-full" type="text" name='stdCode' placeholder="เช่น 6521xxxxxx" onChange={(e)=> setstdCode(e.target.value)}/>
            </div>
            <p>รหัสผ่าน</p>
            <div className="border rounded-md my-1">
              <input className="p-1 w-full" type="password" name='stdPassword' placeholder="เช่น asded" onChange={(e)=>setstdPassword(e.target.value)}/>
            </div>

            <div className="">
              <div className="text-right text-blue-500 my-3">
                <Link href="https://kuhelp.anasaki.live/forgetpassword">
                  <p>ลืมรหัสผ่าน ?</p>
                </Link>
              </div>
              <div className="border rounded-md text-center py-1 text-white bg-green-500 hover:bg-green-400">
                <input className="w-full" type="submit" value={'login'}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
