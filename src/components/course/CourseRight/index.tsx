import React, { useState } from 'react'
import IntroPage from './IntroPage'
import ExplorePage from './ExplorePage'


function CourseRight() {

  const [page, setPage] = useState('intro');
  const changePage = (newPage:string):void => {
    setPage(newPage);
  }
  return (
    <>
        { page === 'intro' && <IntroPage changePage={changePage}/>}
        { page === 'explore' && <ExplorePage />}
        
    </>
  )
}

export default CourseRight