import CourseLeft from '@/components/course/CourseLeft'
import CourseRight from '@/components/course/CourseRight'
import React from 'react'

function courses() {

  return (
    <div className='h-[calc(100vh-5rem)] mt-20 w-screen flex flex-row md:overflow-hidden bg-red-200'>
        {/* left part */}
        <CourseLeft />

        {/* right part */}
        <CourseRight />
        
    </div>
  )
}

export default courses