import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient'
import { toast } from 'react-toastify'
import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import Image from 'next/image'
import Link from 'next/link';

const allSubjects = ['Physics','Chemistry','Mathematics'];

const AllPyq = () => {

  const router = useRouter();
  const [pdfModuleswise, setPdfModuleswise] = useState([]);
  const [examType, setExamType] = useState<'mains' | 'advance'>('mains');
  const [subject, setSubject] = useState<string>('Mathematics');

  const redirectWatsapp = (title:string,courseLink:string):void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: ${courseLink} #LearningTogether`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }


  // for fetching all the courses at the start of page i.e of mains exam_type
  useEffect(() => {

    const fetchPdfCourses = async () => {
      try {
        const res = await axiosClient.get(`pyq-pdf/subject/${subject}?exam_type=${examType}`);
        setPdfModuleswise(res.data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchPdfCourses();
  }, [examType,subject])


  return (
    <div className={`scrollbar w-full h-full md:overflow-y-scroll p-2 md:px-4 md:pb-8 relative`} >
      <div className='flex justify-evenly'>
        {/* subject title */}
        {
          allSubjects.map( sub => (
            <button key={sub} className={`font-semibold text-xl rounded-lg border border-blue-500 px-6 py-2 hover:bg-blue-500 ${subject === sub ? 'bg-blue-500': 'bg-white'}`}
              onClick={() => setSubject(sub)}
            >
              {sub}
            </button>
          ))
        }
      </div>
      <hr className='border border-purple-700 mt-1 mb-2' />
      {/* mains or advance switch  */}
      <div className='flex justify-end sticky top-20 md:top-0'>
        <div className=' flex w-max border-2 border-purple-700 divide-x-2 divide-purple-700 rounded-lg overflow-hidden bg-white'>
          <label className={`cursor-pointer p-1 text-center  ${examType === "mains" ? `bg-purple-400` : ''}`}>
            Mains
            <input type="radio" name="examType" value="mains"
              checked={examType === 'mains'}
              className='hidden'
              onChange={(e) => setExamType(e.target.value as 'mains')}
            />
          </label>
          <label className={`cursor-pointer p-1 text-center ${examType === "advance" ? `bg-purple-400` : ''}`}>
            Advance
            <input type="radio" name="examType" value="advance"
              checked={examType === 'advance'}
              className='hidden'
              onChange={(e) => setExamType(e.target.value as 'advance')}
            />
          </label>
        </div>
      </div>
      <div className='flex flex-col'>
        {
          pdfModuleswise.map((item: any, moduleIndex) => (
            <div key={item.module} className='flex flex-col'>
              <h1 className='font-semibold text-2xl mb-4 text-center align-middle '>{item.module}</h1>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                {
                  item.pdfs.map((pdf: any) => (
                    <div key={pdf._id} className='border-gray-200 border-2 rounded shadow-lg shadow-indigo-500/50 p-2'>
                      {/* top */}
                      <div className='flex h-12 w-full pt-1'>
                        <h3 className='text-sm w-3/4 font-bold'>{pdf.title}</h3>
                        {
                          pdf.new_launch && <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
                        }
                        <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo"
                          className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping'
                          onClick={() => redirectWatsapp(pdf.title, pdf.content_link)}
                        />
                      </div>
                      {/* thumbnail */}
                      <div className='w-full h-44'>
                        <img src={pdf.thumbnail} height={300} width={300} alt="thumbnail"
                          className='rounded-lg w-full h-full'
                        />
                      </div>

                      {/* Description */}
                      <div className='flex flex-col'>
                        <div className='flex h-6 w-full'>
                          <Image src='/student.svg' width={3} height={3} alt='Student icon'
                            className='w-4 h-4 mt-2.5'
                          />
                          <p className='mt-2 ml-2 text-sm'>For {pdf.class_name}</p>
                        </div>
                        <div className='flex h-auto w-full'>
                          <Image src='/clock.svg' width={3} height={3} alt='Student icon'
                            className='w-4 h-4 mt-2.5'
                          />
                          {
                            pdf.free ?
                              <p className='mt-2 ml-2 text-sm'>Questions from <span className='text-blue-500 font-semibold'>2000-2023</span></p>
                              :
                              <p className='mt-2 ml-2 text-sm'>Duration 123 lectures, 12 hrs</p>
                          }
                        </div>
                      </div>

                      {/* separator */}
                      <hr className='border border-purple-700 my-1' />

                      {
                        pdf.free ?
                          <div className='flex flex-col'>
                            <div className='flex justify-between'>
                              <div className='flex flex-col'>
                                <div className='flex'>
                                  <p className='text-base font-bold text-violet-900'>Free</p>
                                  <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{pdf.old_price}</p>
                                </div>
                                <p className='text-xs'> &#40;For full PDF&#41; </p>
                              </div>
                              <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                                <Image src='/discount.svg' width={10} height={10} alt='Discount Icon'
                                  className='w-4 h-4 mr-1 align-middle'
                                />
                                <p className='text-xs align-middle'> Discount of 100% applied</p>
                              </div>
                            </div>
                          </div>
                          :
                          <div className='flex flex-col'>
                            <div className='flex justify-between'>
                              <div className='flex flex-col'>
                                <div className='flex'>
                                  <p className='text-base font-bold text-violet-900'>&#x20B9;{pdf.price}</p>
                                  <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{pdf.old_price}</p>
                                </div>
                                <p className='text-xs'> &#40;For full PDF&#41; </p>
                              </div>
                              <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                                <Image src='/discount.svg' width={10} height={10} alt='Discount Icon'
                                  className='w-4 h-4 mr-1 align-middle'
                                />
                                <p className='text-xs align-middle'> Discount of {pdf.discount}% applied</p>
                              </div>
                            </div>
                          </div>
                      }

                      {/* buttons */}
                      <div className='grid grid-cols-2 gap-5 justify-between my-3 font-semibold'>
                        <Link href={`/admin/pyq-pdf/edit-pyq?pdf_id=${pdf._id}`} className='bg-violet-200 text-violet-800  rounded-lg text-center align-middle px-3 py-2 text-sm hover:bg-violet-700 hover:text-white' >Edit Course</Link>
                        <Link href={`/admin/pyq-pdf/upload-pdf-solutions?pdf_id=${pdf._id}`} className='bg-violet-200 text-violet-800  rounded-lg  text-center align-middle px-3 py-2 text-sm hover:bg-violet-700 hover:text-white'> Upload pdf and solutions</Link>
                      </div>

                    </div>
                  ))
                }
              </div>
              {
                moduleIndex != pdfModuleswise.length - 1 && <hr className='border border-purple-700 mt-10 mb-2' />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllPyq