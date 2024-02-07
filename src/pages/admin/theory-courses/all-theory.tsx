import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link';

const allSubjects = ['Mathematics', 'Physics', 'Chemistry'];

const AllTheoryCourses = () => {

  const router = useRouter();
  const [coursesModuleswise, setCoursesModuleswise] = useState([]);
  const [subject, setSubject] = useState<string>(allSubjects[0]);

  const redirectWatsapp = (title: string, courseLink: string): void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: ${courseLink} #LearningTogether`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  // for fetching all the courses at the start of page i.e of mains exam_type
  useEffect(() => {

    const fetchTheoryCourses = async () => {
      try {
        const res = await axiosClient.get(`theory/subject/${subject}`);
        setCoursesModuleswise(res?.data?.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchTheoryCourses();
  }, [subject])


  return (
    <div className={`scrollbar w-full h-full md:overflow-y-scroll p-2 md:px-4 md:pb-8 relative`} >
      <div className='flex justify-evenly'>
        {/* subject title */}
        {
          allSubjects.map(sub => (
            <button key={sub} className={`font-semibold text-xl rounded-lg border border-blue-500 px-6 py-2 hover:bg-blue-500 ${subject === sub ? 'bg-blue-500' : 'bg-white'}`}
              onClick={() => setSubject(sub)}
            >
              {sub}
            </button>
          ))
        }
      </div>
      <hr className='border border-purple-700 mt-1 mb-2' />
      <div className='flex flex-col'>
        {
          coursesModuleswise.map((item: any, moduleIndex) => (
            <div key={item.module} className='flex flex-col'>
              <h1 className='font-semibold text-2xl mb-4 text-center align-middle '>{item.module}</h1>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                {
                  item.courses.map((theoryCourse: any) => (
                    <div key={theoryCourse._id} className='border-gray-200 border-2 rounded shadow-lg shadow-indigo-500/50 p-2'>
                      {/* top */}
                      <div className='flex h-12 w-full pt-1'>
                        <h3 className='text-sm w-3/4 font-bold'>{theoryCourse.title}</h3>
                        {
                          theoryCourse.new_launch && <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
                        }
                        <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo"
                          className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping'
                          onClick={() => redirectWatsapp(theoryCourse.title, theoryCourse.content_link)}
                        />
                      </div>
                      {/* thumbnail */}
                      <div className='w-full h-44'>
                        <img src={theoryCourse.thumbnail} height={300} width={300} alt="thumbnail"
                          className='rounded-lg w-full h-full'
                        />
                      </div>

                      {/* Description */}
                      <div className='flex flex-col'>
                        <div className='flex h-6 w-full'>
                          <Image src='/student.svg' width={3} height={3} alt='Student icon'
                            className='w-4 h-4 mt-2.5'
                          />
                          <p className='mt-2 ml-2 text-sm'>For {theoryCourse.class_name}</p>
                        </div>
                        <div className='flex h-auto w-full'>
                          <Image src='/clock.svg' width={3} height={3} alt='Student icon'
                            className='w-4 h-4 mt-2.5'
                          />
                          <p className='mt-2 ml-2 text-sm'><span className='text-blue-500 font-semibold'>Mains + Advance</span></p>
                        </div>
                      </div>

                      {/* separator */}
                      <hr className='border border-purple-700 my-1' />

                      <div className='flex flex-col'>
                        <div className='flex justify-between'>
                          <div className='flex flex-col'>
                            <div className='flex'>
                              <p className='text-base font-bold text-violet-900'>&#x20B9;{theoryCourse.price}</p>
                              <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{theoryCourse.old_price}</p>
                            </div>
                            <p className='text-xs'> &#40;For full PDF&#41; </p>
                          </div>
                          <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                            <Image src='/discount.svg' width={10} height={10} alt='Discount Icon'
                              className='w-4 h-4 mr-1 align-middle'
                            />
                            <p className='text-xs align-middle'> Discount of {theoryCourse.discount}% applied</p>
                          </div>
                        </div>
                      </div>

                      {/* buttons */}
                      <div className='grid grid-cols-2 gap-5 justify-between my-3 font-semibold'>
                        <Link href={`/admin/theory-courses/edit-theory?course_id=${theoryCourse._id}`} className='bg-violet-200 text-violet-800  rounded-lg text-center align-middle px-3 py-2 text-sm hover:bg-violet-700 hover:text-white' >Edit Course</Link>
                        <Link href={`/admin/theory-courses/upload-lectures?course_id=${theoryCourse._id}`} className='bg-violet-200 text-violet-800  rounded-lg  text-center align-middle px-3 py-2 text-sm hover:bg-violet-700 hover:text-white'> Upload Lectures</Link>
                      </div>

                    </div>
                  ))
                }
              </div>
              {
                moduleIndex != coursesModuleswise.length - 1 && <hr className='border border-purple-700 mt-10 mb-2' />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllTheoryCourses