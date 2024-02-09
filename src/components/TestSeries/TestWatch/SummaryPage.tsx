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
        summaryTabs = summaryTabs.filter(item => (item === 'TOTAL') || (item.split(' ')[0].toLowerCase() === (testType as string).toLowerCase()));
    }, [testType])

    const handleSummaryTabClicked = (newTab: string) => {
        dispatch(setSummaryTabSelected(newTab));
    }

    return (
        <>
            <div className="w-screen h-screen overflow-hidden select-none absolute bg-white z-20">
                {/* top heading */}
                <div className={`flex flex-col gap-4  items-center justify-center bg-blue-800 ${fullScreenEnabled ? 'py-10' : 'py-5'}`}>
                    <button className={`border border-green-800 bg-green-700 px-4 py-2 text-white font-bold text-xl rounded-lg animate-pulse ${fullScreenEnabled ? 'hidden' : 'block'} hover:text-green-700 hover:bg-white hover:animate-none`} onClick={handleFullScreenEnabled}>Enable FullScreen Mode</button>
                    <h1 className='text-3xl font-bold text-white'>Exam Summary</h1>
                </div>
                {/* subject tabs */}
                <div className='w-full flex gap-10 px-10 bg-gray-200'>
                    {
                        summaryTabs.map(tab => (
                            <button key={tab} className={` py-2 font-semibold ${summaryTabSelected === tab ? ' text-blue-800 underline underline-offset-8 decoration-4' : 'text-gray-600'} rounded-lg`} onClick={() => handleSummaryTabClicked(tab)}>{tab}</button>
                        ))
                    }
                </div>
                {/* tab content */}
                <div className='px-10 mt-10 w-[30%]'>
                    <div className='flex justify-between font-bold text-blue-500 text-lg'>
                        <p>Number of Questions</p>
                        <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].total_questions}</p>
                    </div>
                    <div className='flex justify-between text-green-500 font-bold mt-2 text-lg'>
                        <p>Answered</p>
                        <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].answered}</p>
                    </div>
                    <div className='flex justify-between text-red-500 font-bold mt-2 text-lg'>
                        <p>Not Answered</p>
                        <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].not_answered}</p>
                    </div>
                    <div className='flex justify-between text-marked font-bold mt-2 text-lg'>
                        <p>Marked For Review</p>
                        <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].marked_review}</p>
                    </div>
                    <div className='flex justify-between font-bold mt-2 text-lg'>
                        <p>Not Visited</p>
                        <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].not_visited}</p>
                    </div>
                </div>

                <div className='w-full flex items-center justify-center gap-10 absolute bottom-5'>
                    <button className='px-6 py-1 border-2 border-blue-800 text-blue-800 rounded-full font-bold text-lg w-36 hover:bg-blue-100' onClick={() => dispatch(setShowSummary(false))}>Back</button>
                    <button className='px-6 py-1 border-2 border-blue-800 rounded-full font-bold text-lg bg-blue-800 text-white w-36 hover:bg-blue-700' onClick={() => dispatch(setShowSubmitModal(true))}>Submit</button>
                </div>

                {/* modal */}
                <div className={`absolute top-0 left-0 w-full h-full flex items-center z-10 justify-center  ${showSubmitModal ? 'block' : 'hidden'}`}>
                    <div className='absolute h-full z-10 w-full bg-gray-800 opacity-80'></div>
                    <div className='w-[28%] h-[30%] z-20 bg-white rounded-lg flex flex-col items-center justify-center gap-5 relative'>
                        <h3 className='text-xl font-semibold'>Are you sure you want to end the Test ?</h3>
                        <div className='flex gap-5'>
                            <button className='px-6  border-2 border-blue-800 rounded-full bg-blue-800 text-white text-xl font-semibold hover:bg-blue-700' onClick={handleEntireTestSubmit}>OK</button>
                            <button className='px-6  border-2 border-blue-800 rounded-full  text-xl font-semibold hover:bg-blue-100' onClick={() => dispatch(setShowSubmitModal(false))}>Cancel</button>
                        </div>
                        <button className='absolute top-2 right-2 h-8 w-8' onClick={() => dispatch(setShowSubmitModal(false))}>
                            <Image src="/cancel.svg" height={100} width={100} alt="Close" className="w-full h-full  text-blue-800" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryPage