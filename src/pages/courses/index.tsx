import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import IntroPage from '@/components/course/CourseRight/IntroPage'
import React from 'react'

function courses() {

  return (
    <HeaderLayout>
      <CourseLayout>
          {/* right part */}
          <IntroPage />
      </CourseLayout>
    </HeaderLayout>
  )
}

export default courses