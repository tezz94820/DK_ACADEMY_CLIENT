import React from 'react'
import SearchBar from './SearchBar'
import Carousel from './Carousel'
import Filtering from './Filtering'
import Content from './Content'
import CourseRightLayout from '../CourseRightLayout'

function IntroPage() {
  return (
    <CourseRightLayout>
        <div className='p-2 md:p-4'>
            {/* search bar */}
            <SearchBar />
            <Carousel />
            {/* only for small screen */}
            <Filtering />
            <p className='mt-3'>13 courses available</p>
            <hr className='border border-purple-700'/>
            <Content/>
        </div>
    </CourseRightLayout>
  )
}

export default IntroPage