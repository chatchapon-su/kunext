'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'
import { create } from 'axios';


export default function Studentpage() {

    const BASE_URL = 'https://yourdomainname'
    const router = useRouter();
    const [userdata,setuserdata] = useState();
    const [stdtype,setstdtype] = useState('');
    const [stdrank,setstdrank] = useState('');

    const [stdcode,setstdcode] = useState('');
    const [stdfname,setstdfname] = useState('');
    const [stdlname,setstdlname] = useState('');
    const [stdemail,setstdemail] = useState('');

    const [stddatalist,setstddatalist] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [accounteditdata,setaccounteditdata] = useState([]);

    const [searchaccountdata,setsearchaccountdata] = useState('')
  


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

    // useEffect(() => {
    //     if (userdata) {
    //     console.log(userdata);
    //     }
    // }, [userdata]);


    useEffect(() => {
        if (userdata) {
            showaccount(userdata.std_year, userdata.std_type);
        }
    }, [userdata]);
    
    function showaccount(std_year, std_type) {
        const showaccountdata = async () => {
            try {
                const userdatasearch = {
                    std_year: std_year,
                    std_type: std_type,
                };
    
                const response = await axios.post(`${BASE_URL}/showuserlist`, userdatasearch);
                setstddatalist(response.data);
            } catch (e) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };
        showaccountdata();
    }
    




    // useEffect(() => {
    //     try{
    //         const showuserlist = async() =>{
    //             if(userdata){
    //                 const userdatasearch = {
    //                     std_year:userdata.std_year,
    //                     std_type:userdata.std_type,
    //                 }
                    
    //                 const response = await axios.post(`${BASE_URL}/showuserlist`, userdatasearch)
    //                 //console.log(response.data)
    //                 setstddatalist(response.data)
    //             }
                
    //         }
    //         showuserlist()
    //         // console.log("Test List")
    //         // console.log(stddatalist)
    //     }catch(e){
    //         Swal.fire({
    //             title: 'Error Student List!',
    //             text: 'Something went wrong',
    //             icon: 'error',
    //             confirmButtonText: 'OK'
    //         })
    //     }
    // },[userdata,stddatalist]);




    function createuser (event){
        event.preventDefault()
        
        try{
            if(stdcode.length<10){
                throw{
                    message:"Something went wrong"
                }
            }else{
                const createuseracount = async () =>{
                    try{
                        if(userdata.std_rank!="superadmin"){
                            //console.log('test')
                            const yearacountdata = stdcode[0]+stdcode[1]
                            if(userdata.std_year!=yearacountdata){
                                throw{
                                    message:"Something went wrong"
                                }
                            }
                        }
                        
                        const useracountdata = {
                            std_code: stdcode,
                            std_fname:stdfname,
                            std_lname:stdlname,
                            std_email:stdemail,
                            std_type:stdtype||userdata.std_type,
                            std_rank:stdrank||'user'
                        }
                        const response = await axios.post(`${BASE_URL}/createuser`, useracountdata)
                        //console.log(response.data[0])
                        
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


    const [Dropdownedittype, setDropdownedittype] = useState(false);
    const [Dropdowneditrank, setDropdowneditrank] = useState(false);
    const [Dropdowneditstatus, setDropdowneditstatus] = useState(false);


    const chooseedittype = () => {
        setDropdownedittype(true);
    };

    const hideedittype = () => {
        setDropdownedittype(false);
    };

    const chooseeditrank = () => {
        setDropdowneditrank(true);
    };

    const hideeditrank = () => {
        setDropdowneditrank(false);
    };

    const chooseeditstatus = () => {
        setDropdowneditstatus(true);
    };

    const hideeditstatus = () => {
        setDropdowneditstatus(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setaccounteditdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function editaccount(std_code,std_year,std_fname,std_lname,std_email,std_type,std_rank,std_status){
        if(std_code&&std_year&&std_fname&&std_lname&&std_email&&std_type&&std_rank&&std_status){
            const accountdataedit ={
                std_code:std_code,
                std_year:std_year,
                std_fname:std_fname,
                std_lname:std_lname,
                std_email:std_email,
                std_type:std_type,
                std_rank:std_rank,
                std_status:std_status
            }
            setaccounteditdata(accountdataedit)
            //console.log(accounteditdata)
            openModal()
            //console.log(isModalOpen)
        }
    }


    function editaccountdatabase(event){
        event.preventDefault()


        const editaccountdata = async() =>{
            try{
                if(accounteditdata.std_code.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_year.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_fname.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_lname.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_email.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_type.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_rank.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(accounteditdata.std_status.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    //console.log(accounteditdata)
                    const response = await axios.post(`${BASE_URL}/editaccount`, accounteditdata)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                    showaccount(userdata.std_year, userdata.std_type);
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

        editaccountdata();


    }


    function deleteaccount(std_code,std_status){
        const deletenewsdatasend = async()=>{
            try{
                if(!std_code||!std_status){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    if(std_status=='study'){
                        std_status='out'
                    }else if(std_status=='out'){
                        std_status='study'
                    }else{
                        throw{
                            message:"Error"
                        }
                    }
                    const newaccountdatadelete ={
                        std_code:std_code,
                        std_status:std_status
                    }
                    //console.log(newaccountdatadelete)
                    const response = await axios.post(`${BASE_URL}/deleteaccount`, newaccountdatadelete)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                    if(!searchaccountdata){
                        showaccount(userdata.std_year, userdata.std_type);
                    }else{
                        const stdsearchaccountdata = {
                            std_search:searchaccountdata
                        }
                        
                        const response = await axios.post(`${BASE_URL}/showsearchuserlist`,stdsearchaccountdata)
                        setstddatalist(response.data);
                    }
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

        deletenewsdatasend()
        
    }


    function searchaccountinput (searchinput){
        try{
            if(searchinput.length<=0 && searchinput!=searchaccountdata){
                showaccount(userdata.std_year, userdata.std_type);
            }

            setsearchaccountdata(searchinput)
        }catch(error){
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const searchaccountdatacheck=async()=>{
        try{
            if(searchaccountdata){
                const stdsearchaccountdata = {
                    std_search:searchaccountdata,
                    std_year:userdata.std_year,
                    std_type:userdata.std_type,
                    std_rank:userdata.std_rank
                }
                //console.log(stdsearchaccountdata)
                const response = await axios.post(`${BASE_URL}/showsearchuserlist`,stdsearchaccountdata)
                //console.log(response.data)
                //setlectdata(response.data);
                setstddatalist(response.data);
            }
            
        }catch(error){
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    
    

  return (
    
    <div className='grid min-h-screen bg-white py-10 lg:px-8'>


        <div className='mx-auto p-5 bg-white'>
            <div className='mx-auto w-full p-5 mb-5'>

                <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
                    <form onSubmit={createuser} className="space-y-6">
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

                        <div className='flex'>
                            <div className='mr-3'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Firstname</label>
                                <input onChange={(e)=> setstdfname(e.target.value)}
                                    type="text"
                                    name="std_fname"
                                    id="std_fname"
                                    placeholder="Firstname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className='ml-3'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Lastname</label>
                                <input onChange={(e)=> setstdlname(e.target.value)}
                                    type="text"
                                    name="std_lname"
                                    id="std_lname"
                                    placeholder="Lastname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input onChange={(e)=> setstdemail(e.target.value)}
                                type="email"
                                name="std_email"
                                id="std_email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="Email"
                                required
                            />
                        </div>


                        <div className='flex'>

                            {userdata && userdata.std_rank=='superadmin'?
                            <div className='mr-5'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                                
                                <p onMouseEnter={choosetype} onMouseLeave={hidetype} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800" type="button">
                                    {stdtype.length <= 0 ? "Choose Type" : stdtype=="normal"?"ภาคปกติ":"ภาคพิเศษ"}
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </p>


                                {Dropdowntype && (
                                <div onMouseEnter={choosetype} onMouseLeave={hidetype} id="dropdownHover" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-bg-white">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownHoverButton">
                                        <li>
                                            <p onClick={(e)=>setstdtype('normal')} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">ภาคปกติ</p>
                                        </li>
                                        <li>
                                            <p onClick={(e)=>setstdtype('special')} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">ภาคพิเศษ</p>
                                        </li>
                                    </ul>
                                </div>
                                )}

                            </div>:""}



                            {userdata && (userdata.std_rank=='superadmin'||userdata.std_rank=='admin')?
                                <div className='ml-5'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Rank</label>
                                    
                                    <p onMouseEnter={chooserank} onMouseLeave={hiderank} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800" type="button">
                                        {stdrank.length <= 0 ? "Choose Type" : stdrank}
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </p>


                                    {Dropdownrank && (
                                    <div onMouseEnter={chooserank} onMouseLeave={hiderank} id="dropdownHover" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-bg-white">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownHoverButton">
                                            <li>
                                                <p onClick={(e)=>setstdrank('user')} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">user</p>
                                            </li>
                                            <li>
                                                <p onClick={(e)=>setstdrank('admin')} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">admin</p>
                                            </li>
                                            {userdata && userdata.std_rank=='superadmin'?
                                                <li>
                                                    <p onClick={(e)=>setstdrank('superadmin')} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">superadmin</p>
                                                </li>:""
                                            }
                                        </ul>
                                    </div>
                                    )}

                                </div>:""}
                        </div>
                        


                        

                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-500 dark:bg-black dark:hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5">Create Account</button>
                    </form>

                </div>

                <div className="w-full mx-auto max-w-lg p-4 bg-white sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
                    <div className='my-0'>
                        <form className="flex items-center max-w-sm mx-auto">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                </svg>

                                </div>
                                <input onChange={(e)=> searchaccountinput(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
                            </div>
                            <button type="button" onClick={(e)=> searchaccountdatacheck()} className="p-2.5 ms-2 text-sm font-medium text-white bg-green-600 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </div>


                <div className="hidden xl:block mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    year
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Firstname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lastname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stddatalist.map((item, index) => (
                                <tr key={item.id || index} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-gray-50 border-b dark:border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-900">
                                        {item.std_code}
                                    </th>
                                    <td className="px-6 py-4 whitespace-pre-line">
                                        {item.std_year}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.std_fname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.std_lname}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {item.std_email}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {item.std_type}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {item.std_rank}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {item.std_status}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => editaccount(item.std_code,item.std_year,item.std_fname,item.std_lname,item.std_email,item.std_type,item.std_rank,item.std_status)} className="font-medium text-yellow-400 dark:text-yellow-400 hover:underline">Edit</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => deleteaccount(item.std_code,item.std_status)} className="font-medium text-red-500 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




                <div className="block xl:hidden mt-5 relative overflow-x-auto sm:rounded-lg">
                    {stddatalist.map((item, index) => (
                        
                        <div key={item.id || index} className="mx-auto w-full mb-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200">
                            <div className="flex flex-col items-center pb-10 mt-10">
                                <div className='w-full p-10'>
                                    <span className="text-md text-gray-500 dark:text-gray-500">{item.std_code}</span>
                                    <div className='my-5'>
                                        <h5 className="text-xl text-black dark:text-black">{item.std_fname} {item.std_lname}</h5>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-500">Email : {item.std_email}</span>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">Type: {item.std_type}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">Year: {item.std_year}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">Rank: {item.std_rank}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">Status: {item.std_status}</p>
                                </div>
                                <div className="flex mt-4 md:mt-6">
                                    <button onClick={() => editaccount(item.std_code,item.std_year,item.std_fname,item.std_lname,item.std_email,item.std_type,item.std_rank,item.std_status)}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:focus:ring-blue-800">Edit</button>
                                    <button onClick={() => deleteaccount(item.std_code,item.std_status)}  className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-400 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-500 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-400">Delete</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>



                {isModalOpen && (
                    <div id="authentication-modal" tabIndex="-1" aria-hidden="false" className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                            <div className="bg-white rounded-lg shadow dark:bg-white">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">
                                    Account Edit
                                    </h3>
                                    <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <form onSubmit={editaccountdatabase} className="space-y-4" action="#">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">
                                                {accounteditdata.std_code}
                                            </h3>
                                            <div className='flex my-2'>
                                                <div className='mr-2'>
                                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Firstname</p>
                                                    <input type="text" value={accounteditdata.std_fname} onChange={handleChange} name="std_fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="Firstname" required />
                                                </div>
                                                <div className='ml-2'>
                                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Lastname</p>
                                                    <input type="text" value={accounteditdata.std_lname} onChange={handleChange} name="std_lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="Lastname" required />
                                                </div>
                                            </div>

                                            <div className='my-2'>
                                                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Email</p>
                                                <input type="text" value={accounteditdata.std_email} onChange={handleChange} name="std_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="Email" required />
                                            </div>

                                            <div className='flex'>

                                            {userdata.std_rank=="superadmin" && (
                                                <div className='mr-2'>
                                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Type</p>
                                                    
                                                    <p onMouseEnter={chooseedittype} onMouseLeave={hideedittype} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-green-600 hover:bg-green-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800" type="button">
                                                        {accounteditdata.std_type.length <= 0 ? "Choose Type" : accounteditdata.std_type=="normal"?"ภาคปกติ":"ภาคพิเศษ"}
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                        </svg>
                                                    </p>


                                                    {Dropdownedittype && (
                                                    <div onMouseEnter={chooseedittype} onMouseLeave={hideedittype} id="dropdownHover" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-bg-white">
                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownHoverButton">
                                                            <li>
                                                                <p 
                                                                    onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_type: "normal",
                                                                    }))} 
                                                                    className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100"
                                                                >
                                                                    ภาคปกติ
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <p 
                                                                    onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_type: "special",
                                                                    }))} 
                                                                    className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100"
                                                                >
                                                                    ภาคพิเศษ
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    )}

                                                </div>)}


                                                <div className='ml-2'>
                                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Rank</p>
                                                    
                                                    <p onMouseEnter={chooseeditrank} onMouseLeave={hideeditrank} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-green-600 hover:bg-green-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800" type="button">
                                                        {accounteditdata.std_rank.length <= 0 ? "Choose Type" : accounteditdata.std_rank}
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                        </svg>
                                                    </p>


                                                    {Dropdowneditrank && (
                                                    <div onMouseEnter={chooseeditrank} onMouseLeave={hideeditrank} id="dropdownHover" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-bg-white">
                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownHoverButton">
                                                            <li>
                                                                <p onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_rank: "user",
                                                                    }))}  className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">user</p>
                                                            </li>
                                                            <li>
                                                                <p onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_rank: "admin",
                                                                    }))} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">admin</p>
                                                            </li>
                                                            {userdata && userdata.std_rank=='superadmin'?
                                                                <li>
                                                                    <p onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_rank: "superadmin",
                                                                    }))} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">superadmin</p>
                                                                </li>:""
                                                            }
                                                        </ul>
                                                    </div>
                                                    )}

                                                </div>

                                                <div className='ml-2'>
                                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Status</p>
                                                    
                                                    <p onMouseEnter={chooseeditstatus} onMouseLeave={hideeditstatus} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-green-600 hover:bg-green-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800" type="button">
                                                        {accounteditdata.std_status.length <= 0 ? "Choose Type" : accounteditdata.std_status}
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                        </svg>
                                                    </p>


                                                    {Dropdowneditstatus && (
                                                    <div onMouseEnter={chooseeditstatus} onMouseLeave={hideeditstatus} id="dropdownHover" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-bg-white">
                                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-700" aria-labelledby="dropdownHoverButton">
                                                            <li>
                                                                <p onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_status: "study",
                                                                    }))}  className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">study</p>
                                                            </li>
                                                            <li>
                                                                <p onClick={(e) => setaccounteditdata(prev => ({
                                                                        ...prev,
                                                                        std_status: "out",
                                                                    }))} className="block w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray-100">out</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    )}

                                                </div>
                                            </div>
                                            
                                        </div>
                                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800">Edit Comfirm</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>
    </div>

  );
}
