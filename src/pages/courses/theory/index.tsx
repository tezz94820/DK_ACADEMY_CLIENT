import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient'
import { toast } from 'react-toastify'
import SearchBar from '@/components/course/CourseRight/SearchBar'
import PyqCourseCard from '@/components/course/pyq/PyqCourseCard'
import TheoryCourseCard from '@/components/course/theory/TheoryCourseCard'

const allSubjects = ['Mathematics','Physics','Chemistry'];

type individualTheoryCourseType = {
  _id:string,
  title:string,
  new_launch:boolean,
  thumbnail:string,
  class_name:string,
  is_purchased:boolean,
  old_price:string,
  price:string,
  discount:string
}

const TheoryCourse = () => {

  const router = useRouter();
  const [coursesModuleswise, setCoursesModuleswise] = useState([]);
  const [subject,setSubject] = useState(allSubjects[0]);
  const [loading, setLoading] = useState<boolean>(true);


  // for fetching the courses as per the subject and 
  useEffect( () => {
    const fetchTheoryCourses = async () => {
      const token = localStorage.getItem('token')
      try {
        //send the token if it is available
        const res = await axiosClient.get(`theory/subject/${subject}`,
          token ? 
            {
              headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            } :
            {} 
        );
        setCoursesModuleswise(res?.data?.data);
        setLoading(false);
      } catch (error:any) {
        toast.error(error.message);
      }
    }

    fetchTheoryCourses();
  },[subject])


  const handleSubjectChange = (sub:string) => {
    setSubject(sub);
    setLoading(true);
  } 

  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`scrollbar w-full h-full overflow-y-scroll md:w-5/6 p-2 md:px-4 md:pb-8 relative`} >
            {/* subject selection toggle */}
          <div className='flex px-2 lg:px-5 gap-2 lg:gap-5 w-full'>
            {/* subject title */}
            {
              allSubjects.map( sub => (
                <button key={sub} className={`w-1/3 font-semibold text-base sm:text-xl lg:text-3xl tracking-widest rounded-lg border border-blue-800  lg:px-6 py-2 text-blue-800 text-center align-middle ${subject === sub ? 'bg-gradient-to-r from-yellow-300 to-orange-400 ': 'bg-white hover:bg-blue-800/20'}`}
                  onClick={() => handleSubjectChange(sub)}
                >
                  {sub}
                </button>
              ))
            }
          </div>
          <hr className='border border-blue-800 my-3'/>
          {/* when the courses are loading */}
          {
            loading && 
              <div className='mt-32 flex justify-center items-center'> 
                <span className='loading loading-spinner bg-blue-800 h-10 w-10 '></span> 
              </div>
          } 
          {/* if no courses found */}
          {
            (coursesModuleswise.length === 0 && !loading) && 
              <div className='flex justify-center items-center'>
                <p className='text-xl font-semibold h-96 text-blue-800'>No Courses Found</p>
              </div>
          }
          {/* if even 1 course exists */}
          <div className='flex flex-col'>
          {
            coursesModuleswise.map( (item:any,moduleIndex) => (
              <div key={item.module} className='flex flex-col'>
                <h1 className='font-semibold text-blue-800 text-3xl mb-4 text-center align-middle'>{item.module}</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1'>
                  {
                    item.courses.map( (theoryCourse:individualTheoryCourseType) => (
                      <TheoryCourseCard key={theoryCourse._id} theoryCourse={theoryCourse} showFreeContent={true}/> 
                    ))
                  } 
                </div>
                {
                  moduleIndex != coursesModuleswise.length-1 && <hr className='border border-purple-700 mt-10 mb-2' />
                }
              </div>
            )) 
          }
          </div>
        </div>
      </CourseLayout>
    </HeaderLayout>
  )
}

export default TheoryCourse