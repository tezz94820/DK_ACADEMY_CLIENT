import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React from 'react'
import Image from 'next/image'
import { pdfModuleswise } from '../../../../data/pdfCourses'

const Mathematics = () => {

  const redirectWatsapp = (title:string,courseLink:string):void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: ${courseLink} #LearningTogether`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:px-4 md:pb-8`} >
          <div>
            <h1 className='font-semibold text-3xl '>Mathematics&nbsp;&#40;2000-2023&#41;</h1>
          </div>
          <hr className='border border-purple-700 mt-1 mb-4'/>
          <div className='flex flex-col'>
          {
            pdfModuleswise.map( (item,moduleIndex) => (
              <div key={item.module} className='flex flex-col'>
                <h1 className='font-semibold text-2xl mb-4 text-center align-middle '>{item.module}</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                  {
                    item.pdfs.map( pdf => (
                      <div key={pdf.id} className='border-gray-200 border-2 rounded shadow-lg shadow-indigo-500/50 p-2'>
                        {/* top */}
                        <div className='flex h-12 w-full pt-1'>
                          <h3 className='text-sm w-3/4 font-bold'>{pdf.title}</h3>
                          {
                            pdf.new && <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
                          }
                          <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo" 
                            className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping' 
                            onClick={() => redirectWatsapp(pdf.title,pdf.courseLink)}
                          />
                        </div>
                        {/* thumbnail */}
                        <div className='w-full h-44'>
                          <Image src={pdf.thumbnail} height={300} width={300} alt="thumbnail" 
                            className='rounded-lg w-full h-full'
                          />
                        </div>

                        {/* Description */}
                        <div className='flex flex-col'>
                          <div className='flex h-6 w-full'>
                            <Image src='/student.svg' width={3} height={3} alt='Student icon' 
                              className='w-4 h-4 mt-2.5'
                            />
                            <p className='mt-2 ml-2 text-sm'>For {pdf.class}</p>
                          </div>
                          <div className='flex h-auto w-full'>
                            <Image src='/clock.svg' width={3} height={3} alt='Student icon' 
                              className='w-4 h-4 mt-2.5'
                            />
                            {
                              pdf.free ?
                                <p className='mt-2 ml-2 text-sm'>Questions from <span className='text-blue-500 font-semibold'>2000-2023</span></p>
                              :
                                <p className='mt-2 ml-2 text-sm'>Duration {pdf.lecturesCount} lectures, {pdf.duration} hrs</p>
                            }
                          </div>
                        </div>
                        
                        {/* separator */}
                        <hr className='border border-purple-700 my-1'/>
                        
                        {
                          pdf.free ?
                            <div className='flex flex-col'>
                              <div className='flex justify-between'>
                                <div className='flex flex-col'>
                                  <div className='flex'> 
                                    <p className='text-base font-bold text-violet-900'>Free</p>
                                    <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{pdf.old_price}</p>
                                  </div>
                                <p className='text-xs'> &#40;For full {pdf.type}&#41; </p>
                                </div>
                                <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                                  <Image src='/discount.svg' width={10} height={10} alt='Discount Icon' 
                                    className='w-4 h-4 mr-1 align-middle' 
                                  />
                                  <p className='text-xs align-middle'> Discount of 100% applied</p>
                                </div>
                              </div>
                              {/* buttons */}
                              <div className=' flex justify-between items-center mt-3 font-semibold'>
                                <button className='bg-green-500 text-white hover:animate-pulse rounded-lg text-base w-full p-0.5 font-semibold'>Get it for Free</button>
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
                              <p className='text-xs'> &#40;For full {pdf.type}&#41; </p>
                              </div>
                              <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                                <Image src='/discount.svg' width={10} height={10} alt='Discount Icon' 
                                  className='w-4 h-4 mr-1 align-middle' 
                                />
                                <p className='text-xs align-middle'> Discount of {pdf.discount}% applied</p>
                              </div>
                            </div>
                            {/* buttons */}
                            <div className='grid grid-cols-2 gap-5 justify-between mt-3 font-semibold'>
                              <button className='bg-violet-200 text-violet-800 hover:animate-pulse rounded-lg p-0.5 text-sm text-center align-middle'>Explore</button>
                              <button className='bg-violet-700 text-white hover:animate-pulse rounded-lg text-sm'>Buy Now</button>
                            </div>
                          </div>
                        }
                    </div>
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