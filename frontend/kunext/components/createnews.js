'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'


export default function Createnewspage() {

    const BASE_URL = 'https://yourdomainname'

    const [newstitle,setnewstitle] = useState('')
    const [newsdetail,setnewsdetail] = useState('')
    const router = useRouter();
    const [userdata,setuserdata] = useState();
    const [newsdataresponse, setNewsDataResponse] = useState([]);

    const [newseditdata, setNewseditdata] = useState([]);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


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

    useEffect(()=>{
        shownews();
    },[]);

    function addnews(event){
        event.preventDefault()

        const createnewsdata = async() =>{
            try{
                if(newstitle.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(newsdetail.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    const newsdata = {
                        newstitle:newstitle,
                        newsdetail:newsdetail,
                        stdcode:userdata.std_code
                    }
                    const response = await axios.post(`${BASE_URL}/createnews`, newsdata)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                    shownews();
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

        createnewsdata();
        
    }

    function shownews(){
        const shownewsdata = async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/readnews`)
                //console.log(response.data);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewseditdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function editnews(news_id,news_title,news_detail){
        if(news_id&&news_title&&news_detail){
            const newsdataedit ={
                news_id:news_id,
                news_title:news_title,
                news_detail:news_detail,
            }
            setNewseditdata(newsdataedit)
            openModal()
        }
    }

    function editnewsdatabase(event){
        event.preventDefault()

        const editnewsdata = async() =>{
            try{
                if(newseditdata.news_title.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(newseditdata.news_detail.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else if(newseditdata.news_id.length<=1){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    const newnewsdataedit ={
                        news_id:newseditdata.news_id,
                        news_title:newseditdata.news_title,
                        news_detail:newseditdata.news_detail,
                        stdcode:userdata.std_code
                    }
                    //console.log(newnewsdataedit)
                    const response = await axios.post(`${BASE_URL}/editnews`, newnewsdataedit)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                    shownews();
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

        editnewsdata();
    }

    function deletenews(news_id){
        const news_id_data = news_id
        const deletenewsdatasend = async()=>{
            try{
                if(!news_id_data){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    const newnewsdatadelete ={
                        news_id:news_id_data,
                        stdcode:userdata.std_code
                    }
                    //console.log(newnewsdatadelete)
                    const response = await axios.post(`${BASE_URL}/deletenews`, newnewsdatadelete)
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                    shownews();
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

    return (
    
        <div className='grid min-h-screen bg-white py-10 lg:px-8'>
            <div className='mx-auto border rounded-md w-3/4 p-5'>

                <div className="bg-white text-black border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200">
                    <div className="p-5">
                        <Link className='flex' href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                </svg>
                                <h5 className="ml-2 mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">ประกาศข่าวสาร</h5>
                        </Link>
                        <form onSubmit={addnews}>
                            <div className='w-100 mt-8 mb-8'>
                                <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-900">หัวข้อข่าว</h5>
                                <input className='text-black border rounded-md p-1 w-full' type="text" name='newpassword' placeholder="เช่น Hello" onChange={(e)=> setnewstitle(e.target.value)}></input>
                                <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-900">รายละเอียด</h5>
                                <textarea className='text-black border rounded-md p-1 w-full' type="text" name='comfirmpassword' placeholder="เช่น How are you today?" onChange={(e)=> setnewsdetail(e.target.value)}></textarea>
                            </div>

                            <div className='w-100'>
                                <input type="submit" value="confirm" className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-gray-600 dark:focus:ring-4" />
                            </div>
                        </form>
                    </div>
                </div>

                

                <div className="hidden sm:block mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    News Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    News Detail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date Create
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time Create
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Writer
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
                            {newsdataresponse.map((item, index) => (
                                <tr key={item.id || index} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-gray-50 border-b dark:border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-900">
                                        {item.news_title}
                                    </th>
                                    <td className="px-6 py-4 whitespace-pre-line">
                                        {item.news_detail}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.newsdatecreate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.newstimecreate}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {item.std_fname} {item.std_lname}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => editnews(item.news_id,item.news_title,item.news_detail)} className="font-medium text-yellow-400 dark:text-yellow-400 hover:underline">Edit</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => deletenews(item.news_id)} className="font-medium text-red-500 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                <div className="block sm:hidden mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
                    {newsdataresponse.map((item, index) => (
                        
                        <div key={item.id || index} className="w-full mb-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200">
                            <div className="flex flex-col items-center pb-10 mt-10">
                                <h5 className="mb-1 px-5 text-md text-gray-900 dark:text-gray-900">{item.news_title}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-500">{item.newsdatecreate}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-500">{item.newstimecreate}</span>
                                <div className='w-full p-10'>
                                    <p className="text-md text-gray-500 whitespace-pre-line dark:text-gray-500">{item.news_detail}</p>
                                    <p className="text-sm text-gray-500 mt-10 dark:text-gray-500">{item.std_fname} {item.std_lname}</p>
                                </div>
                                <div className="flex mt-4 md:mt-6">
                                    <button onClick={() => editnews(item.news_id,item.news_title,item.news_detail)}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:focus:ring-blue-800">Edit</button>
                                    <button onClick={() => deletenews(item.news_id)}  className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border hover:bg-red-400 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-500 dark:text-white dark:hover:text-white dark:hover:bg-red-400">Delete</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>


            {isModalOpen && (
                <div id="authentication-modal" tabIndex="-1" aria-hidden="false" className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
                        <div className="bg-white rounded-lg shadow dark:bg-white">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">
                                News Edit
                                </h3>
                                <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form onSubmit={editnewsdatabase} className="space-y-4" action="#">
                                    <div>
                                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">News Title</p>
                                        <input type="text" value={newseditdata.news_title} onChange={handleChange} name="news_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="Hi" required />
                                    </div>
                                    <div>
                                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">News Detail</p>
                                        <textarea
                                            value={newseditdata.news_detail || ''}
                                            onChange={handleChange}
                                            name="news_detail"
                                            className="whitespace-pre-line bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900"
                                            placeholder="How are you today?"
                                            required
                                        />

                                    </div>
                                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit Comfirm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
