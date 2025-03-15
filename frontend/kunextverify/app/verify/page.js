'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'

import { useSearchParams } from 'next/navigation'


export default function Verifypage() {

  const BASE_URL = 'https://yourdomainname'
  const router = useRouter();
  const [userdata,setuserdata] = useState([]);

  const [setpassword,setsetpassword] = useState();
  const [confirmpassword,setconfirmpassword] = useState();

  const [verifytoken, setverifytoken] = useState(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setverifytoken(searchParams.get('verifytoken'))
  }, [])

    useEffect(() => {
     const checktoken = async () => {
        if(verifytoken){
            try {
                const userdatatoken = { std_verifytoken: verifytoken }
                console.log('Test')
                console.log(userdatatoken)
                const response = await axios.post(`${BASE_URL}/checktoken`, userdatatoken, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Test2', response.data)

                if (response.data && response.data.std_code) {
                    setuserdata(response.data)
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Invalid token or user data not found.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                    router.push('https://yourdomainname/')
                }
            } catch (e) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                router.push('https://yourdomainname/')
            }
        }
         
     }
     checktoken()
 }, [verifytoken]);

  


    function passwordsetting (event){
        event.preventDefault()
        
        try{
            if ((!setpassword || !confirmpassword) || setpassword !== confirmpassword) {
                throw {
                    message: "Something went wrong"
                }
            }
            else{
                const createuseracount = async () =>{
                    try{
                        const userdatapassword = {
                            std_code:userdata.std_code,
                            std_password:setpassword
                        }
                        const response = await axios.post(`${BASE_URL}/confirmpassword`, userdatapassword)
                        console.log(response.data[0])
                        
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            confirmButtonText: 'OK',
                            timer: 2000
                        });

                        router.push('http://yourdomainname/')
                        
                    }catch(e){
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                }


                createuseracount()
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
    
    

  return (
    
    <div className='grid min-h-screen bg-white py-10 lg:px-8'>


        <div className='mx-auto p-5 bg-white'>
            <div className='mx-auto w-full p-5 mb-5'>

                <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
                <form onSubmit={passwordsetting} className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900">Create Account</h5>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Setting Password</label>
                        <input onChange={(e)=> setsetpassword(e.target.value)}
                            type="text"
                            name="std_code"
                            id="std_code"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Setting Password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                        <input onChange={(e)=> setconfirmpassword(e.target.value)}
                            type="text"
                            name="std_code"
                            id="std_code"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>


                    <button type="submit" className="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5">Create Account</button>
                </form>

                </div>

            </div>

        </div>
    </div>

  );
}
