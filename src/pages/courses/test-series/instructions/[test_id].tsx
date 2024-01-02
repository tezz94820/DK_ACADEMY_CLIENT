import axiosClient from '@/axios/axiosClient'
import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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

const Instructions = () => {

    const [checkboxClicked, setcheckboxClicked] = useState(false);
    const [proceedDisabled, setProceedDisabled] = useState(true);
    const [testDetails, setTestDetails] = useState<testDetailsType>(initialTestDetails);
    const router = useRouter();
    let testId = router.query.test_id;

    const handleProceed = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let testAttemptId:string; 

        try {
            const response = await axiosClient.get(`tests/test-attempt-registry/${testId}`, {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}});
            testAttemptId = response.data.data.test_attempt_id;
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return;
        }
        router.push(`/courses/test-series/test-watch/${testDetails.type}/${testDetails._id}?test_attempt_id=${testAttemptId}`);
        const element = document.documentElement;
        if(element.requestFullscreen){
            element.requestFullscreen();
        }
    }

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

    const handleGivePermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
        } catch (error:any) {
            toast.error(error.message || "An error occurred while accessing camera and microphone");    
        }
        setProceedDisabled(false);
        toast.success('Video and Audio enabled');
    }
  return (
    <>
        <HeaderLayout>
            <CourseLayout>
            <div className='scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:px-4 md:pb-8'>
                <h1 className='text-center text-2xl font-bold text-blue-700'>Please read the instructions carefully</h1>
                {/* general instructions */}
                <div className='mt-4 '>
                    <h2 className='text-xl font-semibold underline text-blue-700'>General Instructions:</h2>
                    <ol className='list-decimal list-outside pl-10 pt-3'>
                        <li>Total duration of {testDetails.title} is {testDetails.duration} min.</li>
                        <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                        <li>
                            The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                            <ul className='list-disc list-outside pl-10'>
                                <li className='align-middle my-2'>
                                    <div className='flex items-center'>
                                        <p className=' border border-gray-800 bg-gray-200 rounded h-8 w-8 bg-no-repeat flex items-center justify-center text-base text-black mr-4'>01</p>
                                        <span>You have not visited the question yet.</span>
                                    </div>
                                </li>
                                <li className='align-middle my-2'>
                                    <div className='flex items-center'>
                                        <p className='bg-[url("/trial/not-answered.svg")] h-8 w-8 bg-no-repeat text-center align-middle text-base text-white mr-4'>01</p>
                                        <span>You have not answered the question.</span>
                                    </div>
                                </li>
                                <li className='align-middle my-2'>
                                    <div className='flex items-center'>
                                        <p className='bg-[url("/trial/answered.svg")] h-8 w-8 bg-no-repeat flex items-center justify-center text-base text-white mr-4'>01</p>
                                        <span>You have answered the question.</span>
                                    </div>
                                </li>
                                <li className='align-middle my-2'>
                                    <div className='flex items-center'>
                                        <p className='bg-marked rounded-full h-9 w-9 bg-no-repeat flex items-center justify-center text-base text-white mr-4'>01</p>
                                        <span>You have NOT answered the question, but have marked the question for review.</span>
                                    </div>
                                </li>
                                <li className='align-middle my-2'>
                                    <div className='flex items-center'>
                                        <p className='bg-[url("/trial/marked-answered.svg")] h-9 w-10 bg-no-repeat flex items-center justify-center text-base text-white mr-4'>01</p>
                                        <span>The question&#40;s&#41; &34;Answered and Marked for Review&34; will be considered for evalution.</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>You can click on the &34;&gt;&34; arrow which apperes to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on &34;&lt;&34; which appears on the right side of question window.</li>
                        <li>You can click on your &34;Profile&34; image on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile image you will get a drop-down to change the question content to the desired language.</li>
                    </ol>
                </div>
                {/* Navigating to a Question: */}
                <div className='mt-4 '>
                    <h2 className='text-xl font-semibold underline text-blue-700'>Navigating to a Question:</h2>
                    <ol className='list-decimal list-outside pl-10 pt-3'>
                        <li>To answer a question, do the following:
                            <ol className='list-decimal list-outside pl-10 pt-3'>
                                <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                                <li>Click on <b>Save & Next</b> to save your answer for the current question and then go to the next question.</li>
                                <li>Click on <b>Mark for Review & Next</b> to save your answer for the current question, mark it for review, and then go to the next question.</li>
                            </ol>
                        </li>
                    </ol>
                </div>
                {/* Answering a Question:*/}
                <div className='mt-4 '>
                    <h2 className='text-xl font-semibold underline text-blue-700'>Answering a Question:</h2>
                    <ol className='list-decimal list-outside pl-10 pt-3'>
                        <li>Procedure for answering a multiple choice type question:
                            <ol className='list-decimal list-outside pl-10 pt-3'>
                                <li>To select you answer, click on the button of one of the options.</li>
                                <li>To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button</li>
                                <li>To change your chosen answer, click on the button of another option</li>
                                <li>To save your answer, you MUST click on the Save & Next button.</li>
                                <li>To mark the question for review, click on the Mark for Review & Next button.</li>
                            </ol>
                        </li>
                        <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
                    </ol>
                </div>
                {/* Navigating through sections:*/}
                <div className='mt-4 '>
                    <h2 className='text-xl font-semibold underline text-blue-700'>Navigating through sections:</h2>
                    <ol className='list-decimal list-outside pl-10 pt-3'>
                        <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by click on the section name. The section you are currently viewing is highlighted.</li>
                        <li>After click the Save & Next button on the last question for a section, you will automatically be taken to the first question of the next section.</li>
                        <li>You can shuffle between sections and questions anything during the examination as per your convenience only during the time stipulated.</li>
                        <li>Candidate can view the corresponding section summery as part of the legend that appears in every section above the question palette.</li>
                    </ol>
                </div>

                {/* final checbox and proceed button */}
                <form onSubmit={(event) => handleProceed(event)} className='mt-10 '>
                    <label className={`align-middle ${checkboxClicked ? 'text-green-800' : 'text-red-800'}`}>
                        <input type="checkbox" className='h-5 w-5 mr-2' required
                            onChange={(e) => setcheckboxClicked(e.target.checked)}
                        />
                        I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall.I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations
                    </label><br/>
                    <div className='flex justify-center gap-5'>
                        <button type="button" className='mt-10 px-10 py-2 rounded-lg bg-green-500 text-white text-xl' onClick={handleGivePermission}>Give Permissions</button>
                        <button type="submit" className={`mt-10 px-10 py-2 rounded-lg  text-white text-xl ${proceedDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 cursor-pointer'} `} disabled={proceedDisabled}>Proceed</button>
                    </div>
                </form>
            </div>
            </CourseLayout>
        </HeaderLayout>
    </>
  )
}

export default Instructions