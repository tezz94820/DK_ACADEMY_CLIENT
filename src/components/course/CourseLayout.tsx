import React from 'react'
import CourseLeft from './CourseLeft'

type CourseLayoutProps = {
    children: React.ReactNode;
}
function CourseLayout( {children} : CourseLayoutProps ) {
  return (
    <div className='h-[calc(100vh-4.6rem)] mt-4.6 w-screen flex flex-row md:overflow-hidden' >
        <CourseLeft />
        {children}
    </div>
  )
}

export default CourseLayout