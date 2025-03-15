'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'
import { create } from 'axios';


export default function Verifypage() {

  const BASE_URL = 'https://yourdomainname'
  const router = useRouter();
  const [userdata,setuserdata] = useState();
  


    function passwordsetting (event){
        event.preventDefault()
        
        try{
            if(stdcode.length<10){
                throw{
                    message:"Something went wrong"
                }
            }else{
                const createuseracount = async () =>{
                    try{
                        const useracountdata = {
                            std_code: stdcode,
                            std_fname:stdfname,
                            std_lname:stdlname,
                            std_email:stdemail,
                            std_type:stdtype||userdata.std_type,
                            std_rank:stdrank||'user'
                        }
                        const response = await axios.post(`${BASE_URL}/createuser`, useracountdata)
                        console.log(response.data[0])
                        
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            confirmButtonText: 'OK',
                            timer: 2000
                        });
                        
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

    const [Dropdowntype, setDropdowntype] = useState(false);
    const [Dropdownrank, setDropdownrank] = useState(false);


    const choosetype = () => {
        setDropdowntype(true);
    };

    const hidetype = () => {
        setDropdowntype(false);
    };

    const chooserank = () => {
        setDropdownrank(true);
    };

    const hiderank = () => {
        setDropdownrank(false);
    };
    
    

  return (
    
    <div className='grid min-h-screen bg-white py-10 lg:px-8'>


        <div className='mx-auto p-5 bg-white'>
            <div className='mx-auto w-full p-5 mb-5'>

                <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
                <form onSubmit={passwordsetting} className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900">Create Account</h5>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Student Code</label>
                        <input onChange={(e)=> setstdcode(e.target.value)}
                            type="number"
                            name="std_code"
                            id="std_code"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Student Code"
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
