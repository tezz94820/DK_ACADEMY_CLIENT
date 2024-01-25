import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link';

type SolutionsType = {
    question:string;
    answer:string;
    video_check:boolean;
    pdf_check:boolean;
}

const initialSolutions = [{question:'',answer:"",video_check:false,pdf_check:false}] as SolutionsType[];

const UploadPdfSolutions = () => {

    const router = useRouter();
    const pdfId = router.query.pdf_id;

    const [tabSelected, setTabSelected] = useState<boolean>(false);
    const [solutions, setSolutions] = useState<SolutionsType[]>(initialSolutions);

    const handleTabSelection = () => {
        setTabSelected( prev => !prev);
    }

    const fetchSolutions = async () => {
        if(!pdfId) return;
        try {
            const response = await axiosClient.get(`admin/solutions-with-check/${pdfId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const responseData = response?.data?.data?.solutions;
            setSolutions(responseData);
        }
        catch (err:any) {
            const errorMessage = err?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }


    useEffect( () => {
        fetchSolutions();
    },[pdfId])

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


    const handleAddQuestion = async (questionNumber:string) => {
        try {
            const response = await axiosClient.get(`admin/add-pdf-solution/${pdfId}?question_number=${questionNumber}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(` Question Added Successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }

        //fetch the solutions from the server
        fetchSolutions();

    }


    const handleDeleteQuestion = async (questionNumber:string) => {
        try {
            const response = await axiosClient.delete(`admin/delete-pdf-solution/${pdfId}?question_number=${questionNumber}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(` Question Deleted Successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }

        //fetch the solutions from the server
        fetchSolutions();
    }


    const individualSolutionSubmit = async (event:FormEvent<HTMLFormElement>,questionNumber:string) => {
        event.preventDefault();

        const answer = event.currentTarget.answer.value;
        const pdfFile:File|null = event.currentTarget.pdf.files[0];
        const videoFile:File|null = event.currentTarget.video.files[0];
        
        const payload = {question_number:questionNumber, answer, video:videoFile ? "true" : "false", pdf:pdfFile ? "true" : "false"}
        
        try {
            const response = await axiosClient.post(`admin/create-pdf-solution/${pdfId}`, payload, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })

            const presignedUrl = response.data.data.presignedUrl;
            //upload pdf / video whichever is asked for using presigned url
            const uploadPromises = [];
            if(presignedUrl.pdf){
                const pdfPromise = axiosClient.put(presignedUrl.pdf, pdfFile, {
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                })
                uploadPromises.push(pdfPromise);
            }
            if(presignedUrl.video){
                const videoPromise = axiosClient.put(presignedUrl.video, videoFile, {
                    headers: {
                        'Content-Type': 'video/mp4'
                    }
                })
                uploadPromises.push(videoPromise);
            }

            await Promise.all(uploadPromises);
            toast.success(` question-${questionNumber} changed successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }
        //refetch all the solutions again
        fetchSolutions();
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

        <div>
            {/* <Link href={}>Preview PYQ PDF</Link> */}
        </div>

        <hr className='h-2 w-full bg-violet-800 my-10'/>

        <h1 className='text-4xl text-violet-700 mb-4 font-bold text-center'>Solutions</h1>
        <div className='w-full p-2 flex divide-x-4 sticky top-0'>
            <h1 className='w-[10%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Question</h1>
            <h1 className='w-[10%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Existing Solution</h1>
            <h1 className='w-[20%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>New Solution</h1>
            <h1 className='w-[10%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>PDF Exists</h1>
            <h1 className='w-[10%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>VIDEO Exists</h1>
            <h1 className='w-[25%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Change PDF and VIDEO </h1>
            <h1 className='w-[15%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Action Buttons</h1>
        </div>

        {/* Add and Delete button */}
        <div className='w-full flex justify-center gap-6 my-5'>
            <button className={`border border-green-600 rounded-lg text-green-600 hover:text-white hover:bg-green-600 text-2xl px-4 py-1 `} onClick={() => handleAddQuestion('1')} >Add</button>
            <button className='border border-red-600 rounded-lg text-red-600 hover:text-white hover:bg-red-600 text-2xl px-4 py-1' onClick={() => handleDeleteQuestion('1')}>Delete</button>
        </div>

        <hr className='w-full h-2 bg-violet-500 my-5'/>

        {/* individual solutions  */}
        <div className='flex flex-col gap-5 mt-5'>
            {
                solutions.map( solution => (
                    <div key={solution.question} className='w-full border-2 border-violet-500 rounded-lg p-2 ' >
                        <form className='w-full flex items-center divide-x-4 divide-violet-500' onSubmit={(event) => individualSolutionSubmit(event, solution.question)}>
                            {/* Question Number*/}
                            <div className='w-[10%]  flex justify-center'>
                                <p className='text-3xl font-bold '>{solution.question}</p>
                            </div>
                            {/* Existing Solution */}
                            <div className='w-[10%]  flex justify-center'>
                                <p className='text-2xl border-2 border-blue-500 px-3 rounded w-max'>{solution.answer}</p> 
                            </div>
                            {/* to change solution */}
                            <div className='w-[20%]  flex justify-center'>
                                <input type="text" name="answer" className=' border-2 rounded-lg border-violet-500  text-violet-500 text-2xl pl-4 py-1 w-[80%]'/>
                            </div>
                            {/* PDF solution */}
                            <div className='w-[10%]  flex justify-center'>
                                <input type="checkbox" checked={solution.pdf_check} className='h-8 w-8' readOnly/>
                            </div>
                            {/* VIDEO solution */}
                            <div className='w-[10%] flex  justify-center'>
                                <input type="checkbox" checked={solution.video_check} className='h-8 w-8' readOnly/>
                            </div>
                            {/* update pdf and video */}
                            <div className='w-[25%] flex flex-col gap-3  divide-y-4 divide-violet-500 px-2'>
                                <div className='text-xl text-violet-600 flex flex-col '>
                                    <p className=''>New PDF</p>  
                                    <input type="file" name="pdf" accept=".pdf"/> 
                                </div>
                                <div className='text-xl text-violet-600 flex flex-col'>
                                    <p className=''>New Video</p>  
                                    <input type="file" name="video" accept=".mp4"/> 
                                </div>
                            </div>
                            {/* preview and submit button */}
                            <div className='w-[15%] flex flex-col gap-2  justify-center'>
                                <input type="Submit" className='border border-violet-600 rounded-lg text-violet-600 hover:text-white hover:bg-violet-600 text-2xl mx-2' />
                                <button type='button' className='border border-violet-600 rounded-lg text-violet-600  hover:text-white hover:bg-violet-600 text-2xl mx-2 ' onClick={ () => window.open(`/courses/pyq-pdf/view/${pdfId}/solution/${solution.question}`, '_blank')} >Preview</button>
                            </div>
                        </form>
                    </div>
                ))
            }
        </div>

        {/* Add and Delete button */}
        <div className='w-full flex justify-center gap-6 my-5'>
            <button className={`border border-green-600 rounded-lg text-green-600 hover:text-white hover:bg-green-600 text-2xl px-4 py-1 `} onClick={() => handleAddQuestion(String(solutions.length+1))} >Add</button>
            <button className='border border-red-600 rounded-lg text-red-600 hover:text-white hover:bg-red-600 text-2xl px-4 py-1' onClick={() => handleDeleteQuestion(String(solutions.length))} >Delete</button>
        </div>

    </div>
  )
}

export default UploadPdfSolutions