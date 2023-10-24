import React from 'react'
import styles from '../../courseStyles.module.css'
import SearchBar from './SearchBar'
import Carousel from './Carousel'
import Filtering from './Filtering'
import Content from './Content'

function index() {
  return (
    <>
        <div className={`${styles.scrollbar} w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:p-4`}>
            {/* search bar */}
            <SearchBar />
            <Carousel />
            {/* only for small screen */}
            <Filtering />
            <p className='mt-3'>13 courses available</p>
            <hr className='border border-purple-700'/>
            <Content />
        </div>
    </>
  )
}

export default index