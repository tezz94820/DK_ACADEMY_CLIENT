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
    <div className='flex justify-between items-center w-full border-blue-200 border-2 shadow-lg shadow-blue-800/50 rounded py-4 px-6 hover:scale-105'>
        <div className='flex flex-row w-[72%]'>
          <p className='w-[20%] text-blue-800 font-semibold text-xl px-5 flex items-center justify-center text-nowrap'>Lecture - {details.lecture_number}</p>
          <p className='w-[80%] text-blue-800 font-semibold text-xl px-5 flex items-center '>{details.title}</p>
        </div>
        <div className='flex gap-2 w-[28%]'>
          <button className='text-white bg-blue-800  font-semibold hover:bg-blue-600 rounded px-4 py-2'
            onClick={() => window.open( `/courses/theory/view/${courseId}/lecture/${details._id}`, '_blank')}
          >
            Watch Lecture + Lecture Notes
          </button>
        </div>
    </div>
  )
}

export default IndividualLecture