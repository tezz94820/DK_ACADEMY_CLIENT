import axiosClient from '@/axios/axiosClient';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify';

type LecturesType = {
    _id:string;
    title:string;
    lecture_number:string;
    video_check:boolean;
    notes_check:boolean;
}

const initialLectures = [{_id:"",title:'',video_check:false,notes_check:false}] as LecturesType[];

const UploadLectures = () => {

    const router = useRouter();
    const courseId = router.query.course_id;

    const [tabSelected, setTabSelected] = useState<boolean>(false);
    const [lectures, setLectures] = useState<LecturesType[]>(initialLectures);

    const handleTabSelection = () => {
        setTabSelected( prev => !prev);
    }

    const fetchLectures = async () => {
        if(!courseId) return;
        try {
            const response = await axiosClient.get(`admin/lectures-check/${courseId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const responseData = response?.data?.data?.lectures;
            setLectures(responseData);
        }
        catch (err:any) {
            const errorMessage = err?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }

    useEffect( () => {
        fetchLectures();
    },[courseId])

    
    const handleAddLecture = async () => {
        try {
            const response = await axiosClient.get(`admin/add-lecture/${courseId}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(` New Lecture Added Successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }

        //fetch the solutions from the server
        fetchLectures();

    }


    const handleDeleteLecture = async () => {
        try {
            const response = await axiosClient.delete(`admin/delete-lecture/${courseId}`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(` Lecture Deleted Successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }

        //fetch the solutions from the server
        fetchLectures();
    }


    const individualSolutionSubmit = async (event:FormEvent<HTMLFormElement>,lectureId:string) => {
        event.preventDefault();

        const title = (event.currentTarget.title as unknown as HTMLInputElement).value;
        const notesFile:File|null = event.currentTarget.notes.files[0];
        const videoFile:File|null = event.currentTarget.video.files[0];
        
        const payload = {lecture_id:lectureId, title, video:videoFile ? "true" : "false", notes:notesFile ? "true" : "false"}
        try {
            const response = await axiosClient.post(`admin/upload-lecture-content/${courseId}`, payload, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })

            const presignedUrl = response.data.data.presignedUrl;
            //upload pdf / video whichever is asked for using presigned url
            const uploadPromises = [];
            if(presignedUrl.notes){
                const notesPromise = axiosClient.put(presignedUrl.notes, notesFile, {
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                })
                uploadPromises.push(notesPromise);
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
            toast.success(` lecture changed successfully`);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);    
        }
        //refetch all the solutions again
        fetchLectures();
    }


  return (
    <div className='py-10 px-5'>
        
        <h1 className='text-4xl text-violet-700 mb-4 font-bold text-center'>Lectures</h1>
        <div className='w-full p-2 flex divide-x-4 sticky top-0'>
            <h1 className='w-[5%] flex items-center justify-center text-center rounded-lg text-lg bg-violet-500 text-white font-bold'>Lecture No.</h1>
            <h1 className='w-[17.5%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Existing title</h1>
            <h1 className='w-[17.5%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>New Title</h1>
            <h1 className='w-[10%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Notes Exists</h1>
            <h1 className='w-[10%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Video Exists</h1>
            <h1 className='w-[25%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Change Notes and VIDEO </h1>
            <h1 className='w-[15%] flex items-center justify-center text-center rounded-lg text-2xl bg-violet-500 text-white font-bold'>Action Buttons</h1>
        </div>

        <hr className='w-full h-2 bg-violet-500 my-5'/>

        {/* individual lecture  */}
        <div className='flex flex-col gap-5 mt-5'>
            {
                lectures.map( lecture => (
                    <div key={lecture.lecture_number} className='w-full border-2 border-violet-500 rounded-lg p-2 ' >
                        <form className='w-full flex items-center divide-x-4 divide-violet-500' onSubmit={(event) => individualSolutionSubmit(event, lecture._id)}>
                            {/* Lecture Number*/}
                            <div className='w-[5%]  flex justify-center'>
                                <p className='text-3xl font-bold '>{lecture.lecture_number}</p>
                            </div>
                            {/* Existing Title */}
                            <div className='w-[17.5%]  flex justify-center'>
                                <p className='text-2xl border-2 border-blue-500 px-3 rounded w-max'>{lecture.title}</p> 
                            </div>
                            {/* to change Title */}
                            <div className='w-[17.5%]  flex justify-center'>
                                <input type="text" name="title" className=' border-2 rounded-lg border-violet-500  text-violet-500 text-2xl pl-4 py-1 w-[80%]'/>
                            </div>
                            {/* Notes solution */}
                            <div className='w-[10%]  flex justify-center'>
                                <input type="checkbox" checked={lecture.notes_check} className='h-8 w-8' readOnly/>
                            </div>
                            {/* Video solution */}
                            <div className='w-[10%] flex  justify-center'>
                                <input type="checkbox" checked={lecture.video_check} className='h-8 w-8' readOnly/>
                            </div>
                            {/* update pdf and video */}
                            <div className='w-[25%] flex flex-col gap-3  divide-y-4 divide-violet-500 px-2'>
                                <div className='text-xl text-violet-600 flex flex-col '>
                                    <p className=''>New Notes</p>  
                                    <input type="file" name="notes" accept=".pdf"/> 
                                </div>
                                <div className='text-xl text-violet-600 flex flex-col'>
                                    <p className=''>New Video</p>  
                                    <input type="file" name="video" accept=".mp4"/> 
                                </div>
                            </div>
                            {/* preview and submit button */}
                            <div className='w-[15%] flex flex-col gap-2  justify-center'>
                                <input type="Submit" className='border border-violet-600 rounded-lg text-violet-600 hover:text-white hover:bg-violet-600 text-2xl mx-2' />
                                <button type='button' className='border border-violet-600 rounded-lg text-violet-600  hover:text-white hover:bg-violet-600 text-2xl mx-2 ' >Preview</button>
                                {/* <button type='button' className='border border-violet-600 rounded-lg text-violet-600  hover:text-white hover:bg-violet-600 text-2xl mx-2 ' onClick={ () => window.open(`/courses/pyq-pdf/view/${courseId}/solution/${lecture.lecture_number}`, '_blank')} >Preview</button> */}
                            </div>
                        </form>
                    </div>
                ))
            }
        </div>

        {/* Add and Delete button */}
        <div className='w-full flex justify-center gap-6 my-5'>
            <button className={`border border-green-600 rounded-lg text-green-600 hover:text-white hover:bg-green-600 text-2xl px-4 py-1 `} onClick={handleAddLecture} >Add</button>
            <button className='border border-red-600 rounded-lg text-red-600 hover:text-white hover:bg-red-600 text-2xl px-4 py-1' onClick={handleDeleteLecture} >Delete</button>
        </div>

    </div>
  )
}

export default UploadLectures