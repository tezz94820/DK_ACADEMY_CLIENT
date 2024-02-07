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
        <div key={testDetails._id} className='flex p-4 m-2 rounded-lg shadow-lg shadow-blue-800/50 hover:scale-105'>
            {/* thumbnail */}
            <div className='w-1/4 '>
                <img src={testDetails.thumbnail} height={400} width={400} alt="test thumbnail" className='w-full h-36' />
            </div>
            <div className='pl-4 w-1/2 '>
                <h3 className='text-2xl font-bold tracking-widest text-blue-800'>{testDetails.title}</h3>
                <div className='flex justify-between  text-base mt-2'>
                    <div className=''>
                        <p className='text-xl '>{tabsList[databaseTypeList.indexOf(testDetails.type)]}</p>
                        <p className='text-xl '><span className='font-semibold'>Start :</span> {testDetails.start_date} {testDetails.start_time} </p>
                        <p className='text-xl '><span className='font-semibold'>End &nbsp;&nbsp;:</span> {testDetails.end_date} {testDetails.end_time}</p>
                    </div>
                    <div className=''>
                        <p className='text-xl '>{testDetails.duration} minutes</p>
                        <p className='text-xl '>{testDetails.total_marks} marks</p>
                        <p className='text-xl '>{testDetails.free ? 'Free' : 'Paid'}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center w-1/4'>
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