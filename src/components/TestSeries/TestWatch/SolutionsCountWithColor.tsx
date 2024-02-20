import { ReduxRootState } from '@/app/store';
import React from 'react'
import { useSelector } from 'react-redux';

const SolutionsCountWithColor = () => {

    const questionInteractionAnalysis = useSelector((state: ReduxRootState) => state.testWatch.questionInteractionAnalysis);

    
    return (
        <>
            <div className=' hidden sm:flex h-[45%] flex-col justify-evenly px-3 border-2 border-l-blue-600'>
                <div className='flex items-center justify-start gap-2'>
                    <p className='bg-[url("/trial/answered.svg")] h-8 w-8 bg-no-repeat flex items-center justify-center text-base text-white'>{questionInteractionAnalysis['answered']}</p>
                    <p>Answered</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='bg-[url("/trial/not-answered.svg")] h-8 w-8 bg-no-repeat text-center align-middle text-base text-white'>{questionInteractionAnalysis['not-answered']}</p>
                    <p>Not Answered</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className=' border border-gray-800 bg-gray-200 rounded h-8 w-8 bg-no-repeat flex items-center justify-center text-base text-black'>{questionInteractionAnalysis['not-visited']}</p>
                    <p>Not Visited</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='bg-marked rounded-full h-9 w-9 bg-no-repeat flex items-center justify-center text-base text-white'>{questionInteractionAnalysis['marked']}</p>
                    <p>To Be Reviewed</p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <p className='bg-[url("/trial/marked-answered.svg")] h-9 w-10 bg-no-repeat flex items-center justify-center text-base text-white'>{questionInteractionAnalysis['marked-answered']}</p>
                    <p>Answered & marked for <br />review &#40;will be evaluated&#41;</p>
                </div>
            </div>
        </>
    )
}

export default SolutionsCountWithColor