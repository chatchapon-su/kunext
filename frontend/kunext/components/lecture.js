'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import React,{useState, useEffect} from 'react'
import axios from 'axios'
//https://sweetalert2.github.io/#download
import Swal from 'sweetalert2'


export default function Lecturepage() {

  const BASE_URL = 'https://yourdomainname'
  const router = useRouter();
  const [userdata,setuserdata] = useState();
  const [lectdata,setlectdata] = useState([]);
  const [subjectlect,setsubjectlect] = useState('')
  const [titlelect,settitlelect] = useState('')
  const [detaillect,setdetaillect] = useState('')

  const [searchlectdata,setsearchlectdata] = useState('')

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const [filesupdate, setFilesupdate] = useState([]);

  const handleFileupdateChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesupdate(selectedFiles);
  };

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
    //         console.log(userdata);
    //     }
    // }, [userdata]);

    useEffect(()=>{
        showlect()
    },[]);

    function showlect(){
        const showlectdata = async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/lectdata`)

                setlectdata(response.data);
            }catch(e){
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
        showlectdata()
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();
      
        // เพิ่มไฟล์ลงใน formData
        files.forEach(file => {
            formData.append('lect_file', file);
        });
      
        // เพิ่มข้อมูลอื่น ๆ ลงใน formData
        formData.append('lect_subject', subjectlect);
        formData.append('lect_title', titlelect);
        formData.append('lect_detail', detaillect);
        formData.append('std_code', userdata.std_code);
      
        try {
            // ส่งข้อมูลไปยัง backend
            formData.forEach((value, key) => {
                console.log(key, value);  // แสดง key และ value ที่ถูกส่งไปใน FormData
            });
            const response = await axios.post(`${BASE_URL}/upload-lecture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        
            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Lecture uploaded successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
                showlect();
            }
        } catch (error) {
            console.error('Error uploading lecture:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while uploading the lecture.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    function searchlectinput (searchinput){
        try{
            if(searchinput.length<=0 && searchinput!=searchlectdata){
                showlect();
            }

            setsearchlectdata(searchinput)
        }catch(error){
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while uploading the lecture.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const searchlectdatacheck=async()=>{
        try{
            if(searchlectdata){
                const response = await axios.get(`${BASE_URL}/searchlect/${searchlectdata}`)
                //console.log(response.data)
                setlectdata(response.data);
            }
            
        }catch(error){
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while uploading the lecture.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const [dropdownState, setDropdownState] = useState({});

    const choosemenu = (id) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [id]: true
        }));
    };

    const hidemenu = (id) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [id]: false
        }));
    };

    function deletelect(lect_id,std_code,lect_subject,lect_title,lect_detail,lect_file){

        const deleyelectdatacheck = {
            lect_id:lect_id,
            std_code:std_code,
            lect_subject:lect_subject,
            lect_title:lect_title,
            lect_detail:lect_detail,
            lect_file:lect_file,
            lect_status:"delete"
        }
        
        const delectlectdata = async()=>{
           try{
                console.log(deleyelectdatacheck)
                if(deleyelectdatacheck){
                    const response = await axios.post(`${BASE_URL}/deletelect`,deleyelectdatacheck)
                    //console.log(response.data)
                    showlect()
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

        delectlectdata()
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lectdataedit, setlectdataedit] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setlectdataedit((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRemoveFile = (index) => {
        const filesArray = lectdataedit.lect_file.split(",").map((file) => file.trim());
    
        const updatedFiles = filesArray.filter((_, fileIndex) => fileIndex !== index);
    
        setlectdataedit((prev) => ({
            ...prev,
            lect_file: updatedFiles.join(","),
        }));
    };
    

    function editlect(lect_id,std_code,lect_subject,lect_title,lect_detail,lect_file,lect_status){
        const lectdataforedit = {
            lect_id:lect_id,
            std_code:std_code,
            lect_subject:lect_subject,
            lect_title:lect_title,
            lect_detail:lect_detail,
            lect_file:lect_file,
            lect_status:lect_status
        }
        setlectdataedit(lectdataforedit)
        setIsModalOpen(true)
    }

    function editlectclose(){
        setFilesupdate([]);
        setIsModalOpen(false)
    }

    const editlectdatabase = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();
      
        filesupdate.forEach(file => {
            formData.append('lect_fileupdate', file);
        });
      
        formData.append('lect_id', lectdataedit.lect_id);
        formData.append('std_code', lectdataedit.std_code);
        formData.append('lect_subject', lectdataedit.lect_subject);
        formData.append('lect_title', lectdataedit.lect_title);
        formData.append('lect_detail', lectdataedit.lect_detail);
        formData.append('lect_file', lectdataedit.lect_file);

            try{
                formData.forEach((value, key) => {
                    console.log(key, value);
                });
                //console.log(filesupdate);

                const response = await axios.post(`${BASE_URL}/uploadnewlecture`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            
                if (response.data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Lecture uploaded successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    
                    showlect();
                }
            }catch(error){
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong update Lect',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }  
        
    }
    

  return (
    
    <div className='grid min-h-screen bg-white py-10 lg:px-8'>
        
        <div className='grid min-h-screen bg-white px-6 py-10 lg:px-8'>
            <div className='mx-auto w-full p-5 mb-5'>


                <div className="w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900">Share Your Lecture</h5>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Subject Code</label>
                            <input onChange={(e)=> setsubjectlect(e.target.value)}
                                type="text"
                                name="lectsubject"
                                id="lectsubject"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="What subject of your lecture?"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input onChange={(e)=> settitlelect(e.target.value)}
                                type="text"
                                name="lecttitle"
                                id="lecttitle"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="What title of your lecture?"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Detail</label>
                            <input onChange={(e)=> setdetaillect(e.target.value)}
                                type="text"
                                name="lectdetail"
                                id="lectdetail"
                                placeholder="Tell us about your lecture"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PDF (Multiple files allowed)</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept=".pdf"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                            <div className="mt-4 w-full">
                                {files.length > 0 && (
                                    <ul className="list-disc pl-4 text-gray-700">
                                        {files.map((file, index) => (
                                            <li key={index} className="text-sm">{file.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-500 dark:bg-black dark:hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5">Post</button>
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
                                <input onChange={(e)=> searchlectinput(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
                            </div>
                            <button type="button" onClick={(e)=> searchlectdatacheck()} className="p-2.5 ms-2 text-sm font-medium text-white bg-green-600 rounded-lg border hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </div>


                
                {lectdata.map((item, index) => (
                    <div key={item.id || index} className="mt-5 w-full mx-auto max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-white dark:border-gray-200">
                        
                        {userdata.std_code==item.std_code||userdata.std_rank=="superadmin"?
                        
                        <div className="flex justify-end px-4">
                            <button 
                                onClick={() => choosemenu(item.lect_id)} 
                                id="dropdownButton" 
                                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-200 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" 
                                type="button"
                            >
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                </svg>
                            </button>

                            {dropdownState[item.lect_id] && (
                                <div id="dropdown" className="absolute z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white">
                                    <ul className="py-2" aria-labelledby="dropdownButton">
                                        {userdata.std_code==item.std_code?
                                        <li>
                                            <p onClick={() => editlect(item.lect_id,item.std_code,item.lect_subject,item.lect_title,item.lect_detail,item.lect_file,item.lect_status)} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-100 dark:text-black dark:hover:text-black">Edit</p>
                                        </li>
                                        :""}
                                        <li>
                                            <p onClick={() => deletelect(item.lect_id,item.std_code,item.lect_subject,item.lect_title,item.lect_detail,item.lect_file)} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-100 dark:text-red-600 dark:hover:text-black">Delete</p>
                                        </li>
                                        <li>
                                            <p 
                                                onClick={() => hidemenu(item.lect_id)} 
                                                className="block px-4 py-2 text-sm text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-100 dark:text-yellow-500 dark:hover:text-black"
                                            >
                                                Close
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        :""}

                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-gray-700">{item.lect_subject}</h5>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{item.lect_title}</h5>
                        <p className="mb-3 font-normal text-sm text-gray-400 dark:text-gray-400">{item.std_fname} {item.std_lname}</p>
                        <p className="whitespace-pre-line mb-3 font-normal text-gray-800 dark:text-gray-800">{item.lect_detail}</p>
                        
                        {item.lect_file && item.lect_file.split(",").sort().map((file, fileIndex) => (
                            <div key={fileIndex}>
                                <Link href={`http://kunext.online:8200/lectfiles/${item.lect_id}/${file}`} className="mb-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-blue-800">
                                    {file}
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </Link>
                            </div>
                        ))}
                        <p className="mb-3 font-normal text-sm text-gray-400 dark:text-gray-400">
                            {item.lect_updatedate.length <= 1 
                            ? item.lect_createdate + " " + item.lect_createtime 
                            : item.lect_updatedate + " " + item.lect_updatetime}
                        </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
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
                                    Lect Edit
                                    </h3>
                                    <button onClick={() => editlectclose()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5">
                                    <form onSubmit={editlectdatabase} className="space-y-4" action="#">
                                        <div>
                                            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Lect Subject</p>
                                            <input type="text" value={lectdataedit.lect_subject} onChange={handleChange} name="lect_subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="subject" required />
                                        </div>
                                        <div>
                                            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Lect Title</p>
                                            <input type="text" value={lectdataedit.lect_title} onChange={handleChange} name="lect_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="title" required />
                                        </div>
                                        <div>
                                            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Lect detail</p>
                                            <input type="text" value={lectdataedit.lect_detail} onChange={handleChange} name="lect_detail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-900" placeholder="detail" required />
                                        </div>

                                        <div className="flex flex-col items-center justify-center w-full">
                                            <label htmlFor="dropzone-file-update" className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">PDF (Multiple files allowed)</p>
                                                </div>
                                                <input
                                                    id="dropzone-file-update"
                                                    type="file"
                                                    accept=".pdf"
                                                    multiple
                                                    className="hidden"
                                                    onChange={handleFileupdateChange}
                                                />
                                            </label>

                                            <div className="mt-4 w-full">
                                                {lectdataedit.lect_file.length > 0 && (
                                                    <ul className="list-disc pl-4 text-gray-700 flex flex-wrap">
                                                        {lectdataedit.lect_file
                                                            .split(",")
                                                            .map((file) => ({ name: file.trim() }))
                                                            .map((fileObj, index) => (
                                                                <li key={index} className="text-sm mx-2 flex items-center space-x-2">
                                                                    <span>{fileObj.name}</span>
                                                                    <p
                                                                        onClick={() => handleRemoveFile(index)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                        title="Remove File"
                                                                    >
                                                                        ✕
                                                                    </p>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                )}
                                            </div>


                                            <div className="mt-4 w-full">
                                                {filesupdate.length > 0 && (
                                                    <ul className="list-disc pl-4 text-gray-700">
                                                        {filesupdate.map((file, index) => (
                                                            <li key={index} className="text-sm">{file.name}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-blue-800">Edit Comfirm</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



    </div>

  );
}
