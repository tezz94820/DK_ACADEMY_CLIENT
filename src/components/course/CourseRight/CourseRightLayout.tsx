import React from 'react'
import styles from '../courseStyles.module.css'
import SearchBar from './SearchBar'
import Carousel from './IntroPage/Carousel'
import Filtering from './IntroPage/Filtering'


type CourseRightLayoutProps = {
    children: React.ReactNode
}
function CourseRightLayout( {children} : CourseRightLayoutProps) {
  return (
    <div className={`${styles.scrollbar} w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:p-4`}>
      <SearchBar />
      <Carousel />
      {/* only for small screen */}
      <Filtering />
      {children}
    </div>
  )
}

export default CourseRightLayout