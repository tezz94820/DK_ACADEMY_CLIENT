import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axiosClient from '@/axios/axiosClient'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

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
  
  const tabsList:string[] = ['Free Demo Test','Mathematics Test','Physics Test','Chemistry Test','Full Length Test']
  const databaseTypeList = [ 'free', 'mathematics', 'physics', 'chemistry', 'flt' ]

  

const AllTest = () => {

    const [selectedTab, setSelectedTab] = useState<string>(tabsList[0]);
    const [tests, setTests] = useState<individualTest[]>([]);
    const router = useRouter();



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


    const handleEditTest = (id:string) => {
        router.push(`/admin/test-series/edit-test?test_id=${id}`);
    }
    

  return (
    <div className='p-5'>
        {/* tabs */}
        <div className='hidden md:flex justify-evenly shadow-violet-500/50 shadow-lg bg-slate-100 rounded-lg  p-2 mb-4'>
            {
              tabsList.map( tab => {
                return (
                    <div key={tab} className={`px-4 py-1 rounded-t-lg text-center cursor-pointer text-xl shadow-inner shadow-violet-500/50 ${selectedTab === tab ? 'bg-violet-600 text-white rounded-lg ' : 'bg-violet-200 text-blue-800 rounded-lg'}`} onClick={() => setSelectedTab(tab)}>
                    <span>{tab}</span>
                  </div>
                )
              })
            }
        </div>
        {/* tests */}
        <div className='shadow-lg shadow-violet-500/50 p-2 rounded-lg bg-slate-100'>
            {
            (tests && tests.length != 0 ) ?
            tests.map( test => (
              <div key={test._id} className='flex bg-violet-200 p-4 m-2 rounded-lg '>
                {/* thumbnail */}
                <div className='w-1/4 '>
                  <Image src={test.thumbnail} height={400} width={400} alt="test thumbnail" className='w-full h-36' />
                </div>
                <div className='pl-4 w-1/2 '>
                  <h3 className='text-2xl font-bold tracking-widest'>{test.title}</h3>
                  <div className='flex justify-between  text-base mt-2'>
                    <div className=''>
                      <p>{tabsList[databaseTypeList.indexOf(test.type)]}</p>
                      <p><span className='font-semibold'>Start :</span> {test.start_date} {test.start_time} </p>
                      <p><span className='font-semibold'>End &nbsp;&nbsp;:</span> {test.end_date} {test.end_time}</p>
                    </div>
                    <div className=''>
                      <p>{test.duration} minutes</p>
                      <p>{test.total_marks} marks</p>
                      <p>{test.free ? 'Free' : 'Paid'}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-evenly items-center w-1/4'>
                  <button className='text-center align-middle px-6 py-2 rounded-lg bg-violet-600 flex items-center  justify-center gap-2 text-white w-3/4 text-base'
                    onClick={() => handleEditTest(test._id)}
                  >
                    <p>Edit Test</p>
                  </button>
                  <button className='text-center align-middle px-6 py-2 rounded-lg bg-violet-600 flex items-center  justify-center gap-2 text-white w-3/4 text-base'
                    onClick={() => router.push('/admin/test-series/create-questions?test_id=' + test._id)}
                  >
                    <p>Create Questions</p>
                  </button>
                </div>
              </div>
            ))

            : <div className='text-center'>No Tests Available</div>
            }
        </div>
    </div>
  )
}

export default AllTest