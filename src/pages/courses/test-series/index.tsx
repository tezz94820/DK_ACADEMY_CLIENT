import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React, { useEffect, useState } from 'react'
import axiosClient from '@/axios/axiosClient'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import TestCard from '@/components/TestSeries/IntroPage/TestCard'

type individualTest = {
  _id: string;
  title: string;
  type: string;
  start_date: string;
  end_date: string;
  duration: string;
  total_marks: string;
  free: boolean;
  thumbnail: string;
  start_time: string;
  end_time: string;
}

export const tabsList:string[] = ['Free Demo Test','Mathematics Test','Physics Test','Chemistry Test','Full Length Test']
export const databaseTypeList = [ 'free', 'mathematics', 'physics', 'chemistry', 'flt' ]

const TestSeries = () => {

  const [selectedTab, setSelectedTab] = useState<string>(tabsList[0]);
  const [tests, setTests] = useState<individualTest[]>([]);

  useEffect( () => {
    const fetchTests = async (category:string) => {
      try {
        const res = await axiosClient.get(`tests/test-list?type=${databaseTypeList[tabsList.indexOf(selectedTab)]}`);
        setTests(res.data.data);
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    fetchTests(selectedTab);
  },[selectedTab])

  return (
    <>
        <HeaderLayout>
            <CourseLayout>
              <div className='scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:px-4 md:pb-8'>
                {/* tabs */}
                <div className='hidden md:flex justify-evenly shadow-blue-800/50 shadow-lg bg-slate-100 rounded-lg  p-2 mb-4'>
                  {
                    tabsList.map( tab => {
                      return (
                          <div key={tab} className={`px-4 py-1 rounded-t-lg text-center cursor-pointer text-xl shadow-inner shadow-violet-500/50 border border-blue-800 text-blue-800 rounded-lg  ${selectedTab === tab ? 'bg-gradient-to-r from-yellow-300 to-orange-400 ' : 'bg-white hover:bg-blue-800/20'}`} onClick={() => setSelectedTab(tab)}>
                          <span>{tab}</span>
                        </div>
                      )
                    })
                  }
                </div>
                
                {/* tests */}
                <div className=' p-2 rounded-lg '>
                  { (tests && tests.length != 0 ) ?
                    tests.map( test => (
                      <TestCard key={test._id} testDetails={test}/>
                    ))

                    : <div className='text-center'>No Tests Available</div>
                  }
                </div>
              </div>
            </CourseLayout>
        </HeaderLayout>
    </>
  )
}

export default TestSeries