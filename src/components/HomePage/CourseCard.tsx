import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type CourseCardType = {
  details: {
    teacherImage: string,
    heading: string,
    topics: string[],
    courseLink: string
  }
}

const CourseCard = ({ details }: CourseCardType) => {
  return (
    <div className='rounded-lg border-2 border-gray-400 w-full md:w-[31%] h-[20rem] md:h-[24rem] relative shadow-lg shadow-blue-800'>
      <Image src={details.teacherImage} className="absolute right-0 h-full w-[65%] p-1" height="500" width="300" alt="D.K sir Image" />
      <div className=' h-full absolute left-0 w-[70%] p-3 '>
        <h1 className='font-bold text-xl text-center  tracking-wider text-orange-400 '>JEE Mains + Advance</h1>
        <h1 className='font-bold text-xl text-start tracking-wider mt-3 text-blue-800'>{details.heading}</h1>
        <div className='mt-4 flex flex-col gap-2 flex-wrap  '>
          {
            details.topics.map((item, index) => (
              <span className='border w-max text-orange-400 border-black rounded-lg px-1 py-0.5 text-lg whitespace-nowrap bg-white hover:bg-orange-400 hover:text-white font-semibold'>{item}</span>
            ))
          }
        </div>
      </div>
      <div className='absolute bottom-4 sm:bottom-5 flex justify-center items-center w-full'>
        <Link href={details.courseLink} className='text-white bg-gradient-to-r from-yellow-400 to-orange-400 px-5 py-2 rounded-lg font-bold text-xl hover:text-blue-800' >{details.heading}</Link>  
      </div>
    </div>
  )
}

export default CourseCard