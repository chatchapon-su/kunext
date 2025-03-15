'use client';

import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import Homepage from './homepage';
import Notfound from './404';
import Profilepage from './profile';
import Createnewspage from './createnews';
import Lecturepage from './lecture';
import Studentpage from './student';
import Newslogpage from './newslog';
import Lectlogpage from './lectlog';
import Chatbotpage from './chatbot';

export default function Bar(props) {
    const {pagepath} = props;
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLogOpen, setIsLogOpen] = useState(false);
    const [userdata,setuserdata] = useState();

    const BASE_URL = 'https://yourdomainname'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = sessionStorage.getItem('kunext');
            if (!storedData){
                router.push('/');
            }else{
                // setuserdata(JSON.parse(storedData))
                recheckuser(JSON.parse(storedData));
            }
        }
    }, [router]);

    // useEffect(() => {
    //     if (userdata) {
    //     console.log(userdata);
    //     }
    // }, [userdata]);

    // useEffect(() => {
    //     if (userdata) {
    //         recheckuser(userdata);
    //     }
    // }, []);

    function recheckuser(dataforcheck){

        const checkuserdata = async () =>{
            try{
                if(dataforcheck){
                    const userdatacheck = {
                        std_code : dataforcheck.std_code
                    }
                    const response = await axios.post(`${BASE_URL}/checkupdateuser`, userdatacheck)
                    // console.log("Check Userdata")
                    // console.log(response.data[0]);
                    // console.log("Check New Userdata")
                    setuserdata(response.data[0]);
                }
                
            }catch(e){
                Swal.fire({
                    title: 'Error!',
                    text: `Something went wrong ${e}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }

        checkuserdata()
        
    }

    useEffect(()=>{
        if(userdata){
            if(userdata.std_rank=='user'&&pagepath[0]!='home'){
                if(userdata.std_rank=='user'&&pagepath[0]!='lect'){
                    if(userdata.std_rank=='user'&&pagepath[0]!='profile'){
                        router.push('/home');
                    }
                }
            }
        }
    },[userdata, pagepath]);

    function logout(){
        sessionStorage.clear();
        router.push('/');
    }

    return (
        <div>
            <nav className="bg-green-600 border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <button onClick={() => setIsDrawerOpen(true)} className="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-green-600 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-green-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <p className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white" aria-current="page">{userdata ? userdata.std_code : 'Loading...'} {userdata ? userdata.std_fname : 'Loading...'} {userdata ? userdata.std_lname : 'Loading...'}</p>
                        </li>
                        <li>
                            <button onClick={logout}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white hover:text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <path d="M7 6a7.75 7.75 0 1 0 10 0" />  
                                <line x1="12" y1="4" x2="12" y2="12" />
                            </svg>
                            </button>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {isDrawerOpen && (
                <div
                id="drawer-navigation"
                className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-black border dark:bg-gray-800"
                >
                    <Link className='flex' href="/profile">
                        <Image
                        className='mx-3'
                        src="/user.png"
                        width={40}
                        height={40}
                        alt="User"
                        />
                        <div className='text-start'>
                            <h5 id="drawer-navigation-label" className="text-sm font-Roboto text-gray-500 dark:text-gray-400">{userdata ? userdata.std_fname : 'Loading...'} {userdata ? userdata.std_lname : 'Loading...'}</h5>
                            <h5 id="drawer-navigation-label" className="text-sm font-Roboto text-gray-500 dark:text-gray-400">{userdata ? userdata.std_status : 'Loading...'}</h5>
                        </div>
                    </Link>
                    
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <div className="py-4 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link className='flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group' href="/home">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                <p className="flex items-center p-2 text-white rounded-lg dark:text-white ...">
                                    Home
                                </p>
                                </Link>
                            </li>
                            <li>
                                <Link className='flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group' href="/lect">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>

                                <p className="flex items-center p-2 text-white rounded-lg dark:text-white ...">
                                    Lect
                                </p>
                                </Link>
                            </li>
                            {userdata ? userdata.std_rank == 'admin' || userdata.std_rank == 'superadmin'? <li>
                                <Link className='flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group' href="/createnews">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                </svg>

                                <p className="flex items-center p-2 text-white rounded-lg dark:text-white ...">
                                    Create News
                                </p>
                                </Link>
                            </li>: '' : 'Loading...'}
                            {userdata ? userdata.std_rank == 'admin' || userdata.std_rank == 'superadmin'? <li>
                                <Link className='flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group' href="/student">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>

                                <p className="flex items-center p-2 text-white rounded-lg dark:text-white ...">
                                    Student Name
                                </p>
                                </Link>
                            </li>: '' : 'Loading...'}
                            {userdata ? userdata.std_rank == 'superadmin'? <li>
                                <button onClick={() => isLogOpen==true?setIsLogOpen(false):setIsLogOpen(true)} type="button" className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-600 dark:text-white dark:hover:bg-gray-600" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                </svg>

                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Log</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>

                                {isLogOpen && (
                                    <ul id="dropdown-example" className="py-2 space-y-2">
                                        <li>
                                            <Link href="/newslog" className="flex items-center w-full p-2 text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">News Log</Link>
                                        </li>
                                        <li>
                                            <Link href="/lecturelog" className="flex items-center w-full p-2 text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Lecture Log</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>: '' : 'Loading...'}
                            <li>
                                <div className='flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group' href="/dashboard">
                                <button onClick={logout} className="w-full flex items-center p-2 text-red-500 rounded-lg dark:text-red-500 ...">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>
                                    <p className="items-center p-2">logout</p>
                                </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {pagepath=='home' ? 
                <Homepage/>
                : 
                pagepath=='profile'?
                <Profilepage/>
                :
                pagepath=='createnews'?
                <Createnewspage/>
                :
                pagepath=='lect'?
                <Lecturepage/>
                :
                pagepath=='student'?
                <Studentpage/>
                :
                pagepath=='newslog'?
                <Newslogpage/>
                :
                pagepath=='lecturelog'?
                <Lectlogpage/>
                :
                <Notfound/>
            }


            <Chatbotpage/>
        </div>
    );
}
