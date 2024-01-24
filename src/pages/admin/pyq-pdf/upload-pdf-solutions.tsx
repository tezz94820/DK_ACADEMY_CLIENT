import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify';

const UploadPdfSolutions = () => {

    const [tabSelected, setTabSelected] = useState<boolean>(false);
    const router = useRouter();
    const pdfId = router.query.pdf_id;

    const handleTabSelection = () => {
        setTabSelected( prev => !prev);
    }


    const handlePyqCourseSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const file = event?.currentTarget?.coursePdf?.files[0];
        if(!file){
            toast.error(`please select course pdf`)
            return;
        }
        
        try {
            const response = await axiosClient.get(`admin/upload-pyq-pdf/${pdfId}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const presignedUrl = response.data.data.presignedUrl;
            if(presignedUrl.coursePdf){
                await axiosClient.put(presignedUrl.coursePdf, file, {
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                })
            }
            toast.success(` course PYQ PDF changed successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }
        
    }


  return (
    <div className='py-10 px-5'>
        
        {/* PYQ Course PDF  */}
        <div className=' bg-gray-300 rounded-2xl h-max p-2'>
            {/* title */}
            <button className='flex flex-row justify-between items-center w-full py-3 px-10 text-black'
                onClick={handleTabSelection}
            >
                <h3 className=' text-xl font-bold tracking-wider'>Upload PYQ PDF </h3>
                <span className=' text-3xl font-bold'>{tabSelected ? '-' :'+'}</span>
            </button>
            {/* container */}
            <div className={`mt-5 px-10 ${!tabSelected && 'hidden' } w-auto`}>
                <form onSubmit={ handlePyqCourseSubmit } className='w-auto flex gap-2 items-center'>
                    <label className='flex justify-center items-center gap-3 w-3/4 '>
                        <p className='text-blue-600 text-lg cursor-pointer w-1/6 px-2 font-semibold text-center'>Choose PDF</p>
                        <input type="file" className='border border-blue-600  h-10 rounded-xl px-4 w-5/6 py-1' name='coursePdf' required accept=".pdf" />
                    </label>
                    <input type='submit' value={"Submit"} className='w-1/4 h-10 border-2 border-blue-500 text-blue-500 rounded-xl text-xl font-semibold hover:bg-blue-500 hover:text-white' />
                </form>
            </div>
        </div>

    </div>
  )
}

export default UploadPdfSolutions