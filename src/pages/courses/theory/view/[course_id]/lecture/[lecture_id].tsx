import React, { useEffect, useState } from 'react'
import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import dynamic from 'next/dynamic';
import { pdfjs } from 'react-pdf';
import { useRouter } from 'next/router';
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DynamicPDF = dynamic(() => import('../../../../../../components/Solution'), {
    ssr: false,
})

const DynamicVideoPlayer = dynamic( () => import('../../../../../../components/VideoPlayer'), {
    ssr: false,
})


const DisplayLectureContent = () => {

    const router = useRouter();
    const {course_id:courseId, lecture_id:lectureId } = router.query;
    const [ notesLink, setNotesLink ] = useState('');
    const [ videoLink, setVideoLink ] = useState('');

    useEffect( () => {
        const getFileLink = async () => {
            try {
                if(!localStorage.getItem('token')){
                    router.push('/courses/require-auth');
                    return;
                }
                const res = await axiosClient.get(`theory/lecture-content/${courseId}/${lectureId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                const data = res.data.data.presigned_url;
                setNotesLink(data.notes);
                setVideoLink(data.video);
            } catch (error:any) {
                const errorMessage = error.response.data.message || "An error occurred";
                toast.error(errorMessage);
            }
        }
        if(courseId && lectureId){
            getFileLink();
        }
    },[router, courseId, lectureId])

    const closeHandler = () => {
        window.close();
    }
    
    return (
        <HeaderLayout>
            <CourseLayout>
                <div className={`print-hidden scrollbar w-max h-full overflow-x-scroll md:overflow-y-scroll md:w-5/6 `}>
                    <DynamicVideoPlayer videoLink={videoLink}/>
                    <DynamicPDF pdfLink={notesLink}/>
                    {/* back button */}
                    <div className='fixed right-4 top-20 z-30'>
                        <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-red-700 hover:bg-red-300' onClick={closeHandler}>Close</button>
                    </div>
                </div>
            </CourseLayout>
        </HeaderLayout>
      )
}

export default DisplayLectureContent