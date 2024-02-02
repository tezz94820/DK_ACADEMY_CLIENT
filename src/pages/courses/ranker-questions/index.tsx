import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React from 'react'

const RankerQuestionsPage = () => {
  return (
    <HeaderLayout>
        <CourseLayout>
            <div className={`scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:px-4 md:pb-8 relative`} >
                RankerQuestionsPage
            </div>
        </CourseLayout>
    </HeaderLayout>
  )
}

export default RankerQuestionsPage