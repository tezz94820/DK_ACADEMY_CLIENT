import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React from 'react'

const Mathematics = () => {
  return (
    <HeaderLayout>
      <CourseLayout>
        <div className='p-2'>
          <div>
            <h1 className='font-semibold text-2xl'>Mathematics</h1>
          </div>
          {/* <div className='grid grid-cols-1 md:grid-cols-3'>

          </div> */}
        </div>
      </CourseLayout>
    </HeaderLayout>
  )
}

export default Mathematics