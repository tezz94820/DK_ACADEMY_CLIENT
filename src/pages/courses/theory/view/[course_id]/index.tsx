import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf';
import dynamic from 'next/dynamic';
import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import IndividualLecture from '@/components/course/theory/IndividualLecture';
import TheoryCourseCard from '@/components/course/theory/TheoryCourseCard';


type LecturesType = {
    _id:string;
    title:string;
    lecture_number:string;
}

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

const initialLectures = [{_id:"",title:'',lecture_number:""}] as LecturesType[];



const PaidTheoryCourse = () => {

    const router = useRouter();
    const courseId = router.query.course_id as string;
    const [lectures, setLectures] = useState<LecturesType[]>(initialLectures);
    const [theoryCourseDetails, setTheoryCourseDetails] = useState<individualTheoryCourseType>(IndividualCourseDetails);

    const fetchLectures = async () => {
        if(!courseId) return;
        try {
            const response = await axiosClient.get(`theory/lectures/${courseId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const responseData = response?.data?.data?.lectures;
            setLectures(responseData);
        }
        catch (err:any) {
            const errorMessage = err?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }

    useEffect( () => {
        fetchLectures();
    },[courseId])


  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`print-hidden scrollbar w-max h-full overflow-x-scroll md:overflow-y-scroll md:w-5/6 `}>
            <div className='flex flex-col gap-4 mx-1 sm:mx-5 lg:mx-10 py-5'>
                {
                    lectures.map( lecture => (
                        <IndividualLecture key={lecture._id} courseId={courseId} details={lecture}/>
                    ))
                }
            </div>
        </div>
      </CourseLayout>
    </HeaderLayout>
  )
}

export default PaidTheoryCourse