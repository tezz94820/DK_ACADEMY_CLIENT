import React from 'react'

interface IndividualLectureProps {
    details: {
        _id:string;
        title:string;
        lecture_number:string;
    },
    courseId: string;
}


const IndividualLecture = ({details, courseId}:IndividualLectureProps) => {
  return (
    <div className='flex justify-between items-center w-full border-blue-200 border-2 shadow-lg shadow-blue-800/50 rounded py-4 px-1 md:px-6 sm:hover:scale-105'>
      <div className='w-4/5 grid grid-cols-5 '>
        <p className=' text-blue-800 col-span-1 font-bold text-xs lg:text-xl sm:text-sm my-auto'>Lecture - {details.lecture_number}</p>
        <p className=' text-blue-800 col-span-4 font-semibold text-xs lg:text-xl sm:text-sm px-1 '>{details.title}</p>
      </div>
      <button className='w-1/5 font-semibold text-white bg-blue-800 hover:bg-blue-600 rounded p-1 lg:px-4 lg:py-2 text-xs sm:text-base lg:text-xl'
        onClick={() => window.open( `/courses/theory/view/${courseId}/lecture/${details._id}`, '_blank')}
      >
        <p>Watch Lecture</p>
        {/* <p className='leading-5'>+</p>
        <p className='leading-5'>Lecture Notes</p> */}
      </button>
    </div>
  )
}

export default IndividualLecture