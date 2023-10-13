import CourseLeft from '@/components/course/CourseLeft'
import CourseRight from '@/components/course/CourseRight'
import React from 'react'

function courses() {

  return (
    <div className='absolute top-16 md:top-24 left-0 h-auto  md:h-5/6 w-screen flex flex-row md:overflow-hidden bg-red-200'>
        {/* left part */}
        <CourseLeft />

        {/* right part */}
        <CourseRight />
        
    </div>
  )
}

export default courses