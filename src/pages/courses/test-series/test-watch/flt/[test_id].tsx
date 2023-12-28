import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

type testDetailsType = {
  _id: string;
  title: string;
  duration: string;
  type: string;
}
const initialTestDetails: testDetailsType = {
  _id: '',
  title: '',
  duration: '',
  type: '',
}

const tabs = ['PHYSICS', 'PHYSICS NUMERIC', 'CHEMISTRY', 'CHEMISTRY NUMERIC', 'MATHEMATICS', 'MATHEMATICS NUMERIC'];


const TestWatch = () => {

  const router = useRouter();
  let testId = router.query.test_id;
  const [testDetails, setTestDetails] = useState<testDetailsType>(initialTestDetails);


  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect( () => {

    const startCamera = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
          if(videoRef.current){
              videoRef.current.srcObject = stream;
          }
      } catch (error:any) {
          console.error('Error accessing camera and microphone:', error);
      }
  }

    startCamera();
  },[])

  useEffect( () => {
    const fetchTestDetails = async () => {
        if(!testId){
         return;   
        }
        try {
            const res = await axiosClient.get(`tests/test-details/${testId}`);
            setTestDetails(res.data.data);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }
    fetchTestDetails();

  },[router,testId])

  console.log(testDetails);


  return (
    <div className='w-screen h-screen overflow-hidden'>
      {/* test header 13*/}
      <div className='flex justify-between items-center px-6 bg-sky-400 h-[13%]'>
        <h2 className='text-2xl font-bold bg-green-400 '>{testDetails.title}</h2>
        <div className='flex items-center gap-2 bg-violet-400 h-full'>
          <div className='bg-red-300'>Time</div>
          <video ref={videoRef} autoPlay playsInline height={100} width={100} className='rounded-lg border-4 border-black h-full w-auto' muted={true}/>
          <h3>Instructions</h3>
        </div>
      </div>

      {/* tabs 8*/}
      <div className='w-100 bg-blue-800 h-[8%] flex items-center' >
        <div className='flex justify-between  w-[75%] px-6 '>
          {
            tabs.map( tab => (
              <div key={tab}>
                <h3 className='text-base text-white cursor-pointer'>{tab}</h3>
              </div>
            ))
          }
        </div>
      </div>

      {/* test content 79 */}
      <div className='w-full flex h-[79%]'>
        
        {/* test section */}
        <div className='w-[75%] bg-green-400'>
          {/* test questions and answers */}
          <div className='w-full h-[85%] bg-purple-400'>
            <p>Hello</p>
          </div>
          {/* test question selection buttons  */}
          <div className='w-full h-[15%] bg-red-300'>
            <p>Hello</p>
          </div>
        </div>

          {/* analysis section */}
        <div className='w-[25%] bg-violet-500'>
          {/* information section */}
          <div className='h-[90%] bg-green-200'>
            <p>hello</p>
          </div>
          {/* submit test button */}
          <div className='h-[10%] flex justify-center items-center'>
            <button className='bg-red-500 px-6 py-2 rounded-lg '>Submit Test</button>
          </div>
        </div>
      
      </div>

    </div>
  )
}

export default TestWatch