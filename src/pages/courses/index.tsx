import CourseLayout from '@/components/course/CourseLayout'
import IntroPage from '@/components/course/CourseRight/IntroPage'
import React from 'react'

function courses() {

  return (
    <CourseLayout>
        {/* right part */}
        <IntroPage />
    </CourseLayout>
  )
}

export default courses