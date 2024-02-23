import React, { useEffect } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxRootState } from '@/app/store';
import { setShowSubmitModal, setShowSummary, setSummaryTabSelected } from '@/app/features/testWatchSlice';
import { useRouter } from 'next/router';

let summaryTabs = ['TOTAL', 'PHYSICS', 'PHYSICS NUMERICAL', 'CHEMISTRY', 'CHEMISTRY NUMERICAL', 'MATHEMATICS', 'MATHEMATICS NUMERICAL'];

interface SummaryPageProps {
    handleEntireTestSubmit: () => void
    handleFullScreenEnabled: () => void
}
const SummaryPage = ({ handleEntireTestSubmit, handleFullScreenEnabled }: SummaryPageProps) => {
    const router = useRouter();
    const { test_type: testType } = router?.query;
    const dispatch = useDispatch();
    const fullScreenEnabled = useSelector((state: ReduxRootState) => state.testWatch.fullScreenEnabled);
    const summaryTabSelected = useSelector((state: ReduxRootState) => state.testWatch.summaryTabSelected);
    const testSummaryDetails = useSelector((state: ReduxRootState) => state.testWatch.testSummaryDetails);
    const showSubmitModal = useSelector((state: ReduxRootState) => state.testWatch.showSubmitModal);

    useEffect(() => {
        //setting summary tabs :- delete all the other than total,flt,flt_numerical
        if (testType !== 'flt'){
            summaryTabs = summaryTabs.filter(item => (item === 'TOTAL') || (item.split(' ')[0].toLowerCase() === (testType as string).toLowerCase()));
        }
    }, [testType])

    const handleSummaryTabClicked = (newTab: string) => {
        dispatch(setSummaryTabSelected(newTab));
    }

    console.log(testSummaryDetails);

    return (
        <>
            <div className="w-screen h-screen overflow-hidden select-none absolute bg-white z-20">
                {/* top heading test header 13*/}
                <div className='h-[13%] relative w-full'>
                    {
                        !fullScreenEnabled && 
                            <div className='flex justify-center items-center px-6 h-full w-full z-20 absolute bg-red-500 '>
                                <button className={`border border-green-800 bg-green-700 px-4 py-2 text-white font-bold text-xl rounded-lg animate-pulse hover:text-green-700 hover:bg-white hover:animate-none`} onClick={handleFullScreenEnabled}>Enable FullScreen Mode</button>
                            </div>
                    }
                    <div className={`flex items-center justify-center bg-blue-800 h-full w-full`}>
                        <h1 className='text-3xl font-bold text-white'>Exam Summary</h1>
                    </div>
                </div>
                {/* subject tabs */}
                <div className='w-full flex gap-10 px-10 bg-gray-200 overflow-x-scroll scrollbar-blue-2'>
                    {
                        summaryTabs.map(tab => (
                            <button key={tab} className={` py-2 font-semibold whitespace-nowrap  ${summaryTabSelected === tab ? ' text-blue-800 underline underline-offset-8 decoration-4' : 'text-gray-600'} rounded-lg`} onClick={() => handleSummaryTabClicked(tab)}>{tab}</button>
                        ))
                    }
                </div>
                {/* tab content */}
                <div className='px-4 sm:px-10 mt-10 w-full sm:w-[60%] lg:w-[33%]'>
                    <div className='grid grid-cols-4 font-bold text-blue-500 text-lg'>
                        <span className='col-span-3'>Number of Questions</span>
                        <span className='col-span-1'>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].total_questions}</span>
                    </div>
                    <div className='grid grid-cols-4 text-green-500 font-bold mt-2 text-lg'>
                        <p className='col-span-3'>Answered</p>
                        <p className='col-span-1'>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].answered}</p>
                    </div>
                    <div className='grid grid-cols-4 text-red-500 font-bold mt-2 text-lg'>
                        <p className='col-span-3'>Not Answered</p>
                        <p className='col-span-1'>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].not_answered}</p>
                    </div>
                    <div className='grid grid-cols-4 text-marked font-bold mt-2 text-lg'>
                        <p className='col-span-3'>Marked For Review</p>
                        <p className='col-span-1'>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].marked_review}</p>
                    </div>
                    <div className='grid grid-cols-4 font-bold mt-2 text-lg'>
                        <p className='col-span-3'>Not Visited</p>
                        <p className='col-span-1'>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].not_visited}</p>
                    </div>
                </div>

                <div className='w-full flex items-center justify-center gap-10 absolute bottom-5'>
                    <button className='px-6 py-1 border-2 border-blue-800 text-blue-800 rounded-full font-bold text-lg w-36 hover:bg-blue-100' onClick={() => dispatch(setShowSummary(false))}>Back</button>
                    <button className='px-6 py-1 border-2 border-blue-800 rounded-full font-bold text-lg bg-blue-800 text-white w-36 hover:bg-blue-700' onClick={() => dispatch(setShowSubmitModal(true))}>Submit</button>
                </div>

                {/* modal */}
                <div className={`absolute top-0 left-0 w-full h-full flex items-center z-10 justify-center  ${showSubmitModal ? 'block' : 'hidden'}`}>
                    <div className='absolute h-full z-10 w-full bg-gray-800 opacity-80'></div>
                    <div className='w-[90%] sm:w-[60%] lg:w-[38%] h-[21%] sm:h-[26%] px-2 sm:px-4 z-20 bg-white rounded-lg flex flex-col items-center justify-center gap-5 relative'>
                        <h3 className='text-lg sm:text-xl font-semibold text-center '>Are you sure you want to end the Test ?</h3>
                        <div className='flex gap-5'>
                            <button className='px-6  border-2 border-blue-800 rounded-full bg-blue-800 text-white text-xl font-semibold hover:bg-blue-700' onClick={handleEntireTestSubmit}>OK</button>
                            <button className='px-6  border-2 border-blue-800 rounded-full  text-xl font-semibold hover:bg-blue-100' onClick={() => dispatch(setShowSubmitModal(false))}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryPage