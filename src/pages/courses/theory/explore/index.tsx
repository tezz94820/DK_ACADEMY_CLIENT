import axiosClient from '@/axios/axiosClient'
import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import Description from '@/components/course/pyq/explore/Description'
import Teachers from '@/components/course/pyq/explore/Teachers'
import TheoryCourseCard from '@/components/course/theory/TheoryCourseCard'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type individualTheoryCourseType = {
  _id:string,
  title:string,
  new_launch:boolean,
  thumbnail:string,
  class_name:string,
  is_purchased:boolean,
  old_price:string,
  price:string,
  discount:string,
  teachers:{
    name:string,
    image:string,
    experience:string,
    subject:string
  }[],
  description:string[]
}

const IndividualCourseDetails:individualTheoryCourseType = {
  _id: "",
  title: "",
  new_launch: true,
  thumbnail: '',
  class_name: "",
  is_purchased:false,
  old_price: "",
  price: "",
  discount:"",
  description:[],
  teachers: [
      {
          name: "",
          image: '',
          experience: "",
          subject: ""
      }
  ]
}


function ExploreTheoryCourse() {

  const [theoryCourseDetails, setTheoryCourseDetails] = useState<individualTheoryCourseType>(IndividualCourseDetails);
  const router = useRouter();
  const courseId = router?.query?.course_id as string;

  useEffect( () => {
    const fetchCourseDetails = async () => {
      if(!courseId) return;
      try {
        const response = await axiosClient(`theory/course-details?course_id=${courseId}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response?.data?.data.theory_course_details;
        setTheoryCourseDetails(data);
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    fetchCourseDetails();
  }, [router] );


  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:py-4 md:px-6`}>
          {/* title */}
          <div className=' py-6 shadow-lg shadow-indigo-500/50 bg-blue-800 rounded-t-3xl flex items-center'>
            <p className='text-xl md:text-3xl font-bold text-white ml-5'>{theoryCourseDetails.title}</p>
          </div>
          {/* free content */}
          <div className='w-full h-max my-4 flex items-center justify-center animate-pulse hover:animate-none'>
            <button className='text-2xl text-blue-800 bg-gradient-to-r from-green-300 to-green-500 hover:text-white font-bold tracking-widest shadow-lg shadow-blue-800/50 p-1 md:px-5 md:py-2 border-gray-200 border-2 rounded-2xl'
              onClick={() => router.push(`explore/view-free-course?course_id=${theoryCourseDetails._id}`)}
            >
              Access Free Lectures
            </button>
          </div>
          <div className='md:grid md:grid-cols-6 lg:grid-cols-7 flex flex-col mt-5'>
          {/* left */}
          <div className='md:col-span-3 lg:col-span-4'>
            <Description description={theoryCourseDetails.description}/>
            <Teachers teachers={theoryCourseDetails.teachers}/> 
          </div>
          {/* right */}
          <div className='md:col-span-3 lg:col-span-3 px-5 my-5 sticky top-0 h-80'>
            <TheoryCourseCard theoryCourse={theoryCourseDetails} showFreeContent={false}/>
          </div>
        </div>  

        </div>
      </CourseLayout> 
    </HeaderLayout>
  )
}

export default ExploreTheoryCourse