import { databaseTypeList, tabsList } from '@/pages/courses/test-series';
import React from 'react'
import Link from 'next/link';

interface TestCardProps {
    testDetails:{
        _id:string;
        thumbnail: string;
        title: string;
        type: string;
        start_date: string;
        end_date: string;
        start_time: string;
        end_time: string;
        duration: string;
        total_marks: string;
        free: boolean;
    }
}

const TestCard = ({testDetails}:TestCardProps) => {
    return (
        <div key={testDetails._id} className='flex flex-col sm:flex-row p-4 sm:m-2 rounded-lg shadow-lg shadow-blue-800/50 sm:hover:scale-105'>
            <div className='block sm:hidden w-full mb-1'>
                <h3 className=' text-lg lg:text-2xl font-bold tracking-widest text-blue-800'>{testDetails.title}</h3>
            </div>
            {/* thumbnail */}
            <div className='w-full sm:w-[40%] lg:w-1/4'>
                <img src={testDetails.thumbnail} height={400} width={400} alt="test thumbnail" className='w-full h-36' />
            </div>
            <div className='w-full sm:w-[60%] lg:w-1/2 sm:pl-4'>
                <h3 className='hidden sm:block text-lg lg:text-2xl font-bold tracking-widest text-blue-800'>{testDetails.title}</h3>
                <div className='flex justify-between mt-2 text-base xs:text-[1.075rem] lg:text-xl'>
                    <div>
                        <p>{tabsList[databaseTypeList.indexOf(testDetails.type)]}</p>
                        <p><span className='font-semibold'>Start :</span> {testDetails.start_date} {testDetails.start_time} </p>
                        <p><span className='font-semibold'>End :</span> {testDetails.end_date} {testDetails.end_time}</p>
                    </div>
                    <div>
                        <p>{testDetails.duration} minutes</p>
                        <p>{testDetails.total_marks} marks</p>
                        <p>{testDetails.free ? 'Free' : 'Paid'}</p>
                    </div>
                </div>
                <div className='block lg:hidden mt-4'>
                    <Link 
                        href={`/courses/test-series/instructions/${testDetails._id}`} 
                        className='flex items-center justify-center text-center text-xl font-bold align-middle px-2 py-1 rounded-lg bg-blue-800 hover:bg-blue-700 text-white'
                    >
                        Start Test
                    </Link>
                </div>    
                
            </div>
            <div className='hidden lg:flex justify-center items-center w-1/4 '>
                <Link 
                    href={`/courses/test-series/instructions/${testDetails._id}`} 
                    className='text-center text-xl font-bold align-middle px-6 py-3 rounded-lg bg-blue-800 hover:bg-blue-700 flex items-center  justify-center gap-2 text-white'
                >
                    Start Test
                </Link>
            </div>
        </div>
    )
}

export default TestCard