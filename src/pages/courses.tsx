import CourseLeft from '@/components/course/CourseLeft/Index'
import CourseRight from '@/components/course/CourseRight/Index'
import React from 'react'

function courses() {

  return (
    <div className='h-[calc(100vh-4.6rem)] mt-4.6 w-screen flex flex-row md:overflow-hidden '>
        {/* left part */}
        <CourseLeft />

        {/* right part */}
        <CourseRight />
        
        
    </div>
  )
}

export default courses