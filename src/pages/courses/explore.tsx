import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import ExplorePage from '@/components/course/CourseRight/ExplorePage'
import React from 'react'

function explore() {
  return (
    <HeaderLayout>
      <CourseLayout>
            <ExplorePage />
      </CourseLayout> 
    </HeaderLayout>
  )
}

export default explore