import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient'
import { toast } from 'react-toastify'
import SearchBar from '@/components/course/CourseRight/SearchBar'
import PyqCourseCard from '@/components/course/pyq/PyqCourseCard'

const allSubjects = ['Mathematics','Physics','Chemistry'];

type individualPyqCourseType = {
  _id:string,
  title:string,
  new_launch:boolean,
  thumbnail:string,
  class_name:string,
  free:boolean,
  old_price:string,
  price:string,
  exam_type:string,
  discount:string
}

const Mathematics = () => {

  const router = useRouter();
  const [pdfModuleswise, setPdfModuleswise] = useState([]);
  const [examType, setExamType] = useState<'mains'|'advance'>('mains');
  const [subject,setSubject] = useState(allSubjects[0]);

  const redirectWatsapp = (title:string,courseLink:string):void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: ${courseLink} #LearningTogether`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  // for fetching the courses as per the subject 
  useEffect( () => {

    const fetchPdfCourses = async () => {
      try {
        const res = await axiosClient.get(`pyq-pdf/subject/${subject}?exam_type=${examType}`);
        setPdfModuleswise(res.data.data);
      } catch (error:any) {
        toast.error(error.message);
      }
    }

    fetchPdfCourses();
  },[subject])

  // on switching of the exam_type fetch new courses according to exam_type 
  useEffect( () => {

    const fetchPdfCourses = async () => {
      try {
        const res = await axiosClient.get(`pyq-pdf/subject/mathematics?exam_type=${examType}`);
        setPdfModuleswise(res.data.data);
      } catch (error:any) {
        toast.error(error.message);
      }
    }

    fetchPdfCourses();
  },[examType])


  const handleSubjectChange = (sub:string) => {
    setSubject(sub);
  } 


  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:px-4 md:pb-8 relative`} >
            {/* subject selection toggle */}
            <div className='flex px-5 gap-5 w-full'>
            {/* subject title */}
            {
              allSubjects.map( sub => (
                <button key={sub} className={`w-1/3 font-semibold text-3xl tracking-widest rounded-lg border border-blue-800 px-6 py-2 text-blue-800 ${subject === sub ? 'bg-gradient-to-r from-yellow-300 to-orange-400 ': 'bg-white hover:bg-blue-800/20'}`}
                  onClick={() => handleSubjectChange(sub)}
                >
                  {sub}
                </button>
              ))
            }
          </div>
          <hr className='border border-blue-800 my-3'/>
          {/* mains or advance switch  */}
          <div className='flex justify-end sticky top-20 md:top-0 z-20'>
            {/* <SearchBar /> */}
            <div className=' flex w-max border-2 border-blue-800 divide-x-2 divide-blue-800 rounded-lg overflow-hidden bg-white'>
              <label className={`cursor-pointer p-1 text-center  text-xl font-semibold ${examType==="mains"?`bg-blue-800 text-white`:'text-blue-800'}`}>
                Mains
                <input type="radio" name="examType" value="mains" 
                  checked={examType === 'mains'}
                  className='hidden' 
                  onChange={ (e) => setExamType(e.target.value as 'mains') }
                />
              </label>
              <label className={`cursor-pointer p-1 text-center text-xl font-semibold ${examType==="advance"?`bg-blue-800 text-white`:'text-blue-800'}`}>
                Advance
                <input type="radio" name="examType" value="advance" 
                checked={examType === 'advance'}
                  className='hidden' 
                  onChange={ (e) => setExamType(e.target.value as 'advance') }
                />
              </label>
            </div>
          </div>
          {/* if no courses found */}
          {
            pdfModuleswise.length === 0 && 
              <div className='flex justify-center items-center'>
                <p className='text-xl font-semibold h-96 text-blue-800'>No Courses Found</p>
              </div>
          }
          {/* if even 1 course exists */}
          <div className='flex flex-col'>
          {
            pdfModuleswise.map( (item:any,moduleIndex) => (
              <div key={item.module} className='flex flex-col'>
                <h1 className='font-semibold text-blue-800 text-3xl mb-4 text-center align-middle'>{item.module}</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                  {
                    item.pdfs.map( (pdf:individualPyqCourseType) => (
                      <PyqCourseCard key={pdf._id} pyqCourse={pdf} showExplore={true}/> 
                    ))
                  } 
                </div>
                {
                  moduleIndex != pdfModuleswise.length-1 && <hr className='border border-purple-700 mt-10 mb-2' />
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

export default Mathematics