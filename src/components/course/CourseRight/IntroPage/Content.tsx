'use client';

import React from 'react'
import  { contentList } from '../../../../../data/contentList'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function Content() {
  
  const router = useRouter(); 

  const redirectWatsapp = (title:string,courseLink:string):void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: ${courseLink} #LearningTogether`
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }
  const exploreClickHandler = ():void => {
    router.push('/courses/explore', {scroll: false});
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-3'>
        {
            contentList.map( (item) => (
                <div key={item.id} className='border-gray-200 border-2 rounded shadow-lg shadow-indigo-500/50 p-2'>
                    {/* top */}
                    <div className='flex h-12 w-full pt-1'>
                      <h3 className='text-sm w-3/4 font-bold'>{item.title}</h3>
                      {
                        item.new && <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
                      }
                      <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo" 
                        className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping' 
                        onClick={() => redirectWatsapp(item.title,item.courseLink)}
                      />
                    </div>
                    {/* thumbnail */}
                    <div className='w-full h-44'>
                      <Image src={item.thumbnail} height={300} width={300} alt="thumbnail" 
                        className='rounded-lg w-full h-full'
                      />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col'>
                      <div className='flex h-6 w-full'>
                        <Image src='/student.svg' width={3} height={3} alt='Student icon' 
                          className='w-4 h-4 mt-2.5'
                        />
                        <p className='mt-2 ml-2 text-sm'>For {item.class}</p>
                      </div>
                      <div className='flex h-auto w-full'>
                        <Image src='/clock.svg' width={3} height={3} alt='Student icon' 
                          className='w-4 h-4 mt-2.5'
                        />
                        <p className='mt-2 ml-2 text-sm'>Duration {item.lecturesCount} lectures, {item.duration} hrs</p>
                      </div>
                    </div>
                    
                    {/* separator */}
                    <hr className='border border-purple-700 my-1'/>
                    
                    
                    {/* bottom */}
                    <div className='flex flex-col'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <div className='flex'> 
                            <p className='text-base font-bold text-violet-900'>&#x20B9;{item.price}</p>
                            <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{item.old_price}</p>
                          </div>
                        <p className='text-xs'> &#40;For full {item.type}&#41; </p>
                        </div>
                        <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                          <Image src='/discount.svg' width={10} height={10} alt='Discount Icon' 
                            className='w-4 h-4 mr-1 align-middle' 
                          />
                          <p className='text-xs align-middle'> Discount of {item.discount}% applied</p>
                        </div>
                      </div>
                      {/* buttons */}
                      <div className='grid grid-cols-2 gap-5 justify-between mt-3 font-semibold'>
                        {/* <Link href='/courses/explore'> */}
                          <button 
                            className='bg-violet-200 text-violet-800 hover:animate-pulse rounded-lg p-0.5 text-sm text-center align-middle'
                            onClick={exploreClickHandler}
                          >
                            Explore
                          </button>
                        {/* </Link> */}
                        <button className='bg-violet-700 text-white hover:animate-pulse rounded-lg text-sm'>Buy Now</button>
                      </div>
                    </div>

                </div>
            )) 
        }
    </div>
  )
}

export default Content