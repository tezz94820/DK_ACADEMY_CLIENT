import React, { useEffect, useState } from 'react'
import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import dynamic from 'next/dynamic';
import { pdfjs } from 'react-pdf';
import VideoPlayer from '@/components/VideoPlayer';
import { useRouter } from 'next/router';
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DynamicPDF = dynamic(() => import('../../../../components/Solution'), {
    ssr: false,
})

const DynamicVideoPlayer = dynamic( () => import('../../../../components/VideoPlayer'), {
    ssr: false,
})


type SolutionType = {
  pdfLink: string,
  videoLink: string
}

const initialSolution:SolutionType = {
  pdfLink: '',
  videoLink: '',
}

const TestSolution = () => {

  const router = useRouter();
  const testId = router.query.test_id;
  const questionNumber = router.query.question_number;
  const [solution,setSolution] = useState<SolutionType>(initialSolution);


  const closeHandler = () => {
    window.close();
  }


  useEffect( () => {
    const getFileLink = async () => {
        try {
            if(!localStorage.getItem('token')){
                router.push('/courses/require-auth');
                return;
            }
            const res = await axiosClient.get(`tests/test/test-solutions/${testId}?question_number=${questionNumber}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            setSolution(res.data.data.solution);
        } catch (error:any) {
            const errorMessage = error.response.data.message || "An error occurred";
            toast.error(errorMessage);
        }
    }
    if(testId && questionNumber){
        getFileLink();
    }
  },[router,testId,questionNumber])



  return (
    <HeaderLayout>
      <div className={`print-hidden scrollbar w-full overflow-x-scroll md:overflow-y-scroll mt-24 flex flex-col gap-10`}>
          <DynamicVideoPlayer videoLink={solution.videoLink}/>
          <DynamicPDF pdfLink={solution.pdfLink}/>
        {/* back button */}
        <div className='fixed right-4 top-20 z-30'>
            <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-red-700 hover:bg-red-300' onClick={closeHandler}>Close</button>
        </div>
      </div>
    </HeaderLayout>
  )
}

export default TestSolution    