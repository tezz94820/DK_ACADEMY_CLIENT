import React from 'react'
import styles from '../courseStyles.module.css'


type CourseRightLayoutProps = {
    children: React.ReactNode
}
function CourseRightLayout( {children} : CourseRightLayoutProps) {
  return (
    <div className={`${styles.scrollbar} w-full h-full md:overflow-y-scroll md:w-5/6`}>
        {children}
    </div>
  )
}

export default CourseRightLayout