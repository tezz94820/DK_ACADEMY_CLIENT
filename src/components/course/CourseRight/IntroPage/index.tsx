import React from 'react'
import SearchBar from '../SearchBar'
import Carousel from './Carousel'
import Filtering from './Filtering'
import Content from './Content'
import CourseRightLayout from '../CourseRightLayout'

function IntroPage() {
  return (
    <CourseRightLayout>
        <>
            <p className='mt-3'>13 courses available</p>
            <hr className='border border-purple-700'/>
            <Content/>
        </>
    </CourseRightLayout>
  )
}

export default IntroPage