'use client'

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'


export default function Profilepage() {
    const [newpassword,setnewpassword] = useState('')
    const [comfirmpassword,setcomfirmpassword] = useState('')
    const router = useRouter();
    const [userdata,setuserdata] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
        const storedData = sessionStorage.getItem('kunext');
        if (!storedData){
            router.push('/');
        }else{
            setuserdata(JSON.parse(storedData))
        }
        }
    }, [router]);

    useEffect(() => {
        if (userdata) {
        console.log(userdata);
        }
    }, [userdata]);

    function resetpassword(event){
        event.preventDefault()
        const BASE_URL = 'https://yourdomainname'

        const resetpassword = async ()=>{
            try{
                if (newpassword !== comfirmpassword) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                } else if (newpassword.length <= 1 || comfirmpassword <= 1) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                } else {
                    const newpassworddata = {
                        std_code: userdata.std_code,
                        std_newpassword: newpassword
                    }
                    const response = await axios.post(`${BASE_URL}/user`, newpassworddata)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                }
            }catch(e){
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
    
        resetpassword()
    }

    return (
    
        <div className='grid min-h-screen place-items-center bg-white px-6 py-10 lg:px-8'>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200">
                <div className="flex flex-col items-center p-5">
                    <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/user.png" alt="Bonnie image" width={150} height={150}/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray-900">{userdata ? userdata.std_fname : 'Loading...'} {userdata ? userdata.std_lname : 'Loading...'}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-500">รหัสนิสิต {userdata ? userdata.std_code : 'Loading...'}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">สถานะ {userdata ? userdata.std_status : 'Loading...'}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">ภาค {userdata ? userdata.std_type=='normal'? 'ปกติ': 'พิเศษ' : 'Loading...'}</span>
                    
                    <form onSubmit={resetpassword}>
                        <div className='w-100 mt-8 mb-8'>
                            <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-gray-900">Reset password</h5>
                            <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-900">New password</h5>
                            <input className='text-black border rounded-md p-1' type="text" name='newpassword' placeholder="เช่น asdvs" onChange={(e)=> setnewpassword(e.target.value)}></input>
                            <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-900">Comfirm password</h5>
                            <input className='text-black border rounded-md p-1' type="text" name='comfirmpassword' placeholder="เช่น asdvs" onChange={(e)=> setcomfirmpassword(e.target.value)}></input>
                        </div>

                        <div className='w-100'>
                            <input type="submit" value="confirm" className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800" />
                        </div>
                    </form>
                </div>
            </div>

        </div>

  );
}
