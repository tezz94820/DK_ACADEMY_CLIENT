import React, { useState } from 'react'
import IntroPage from './IntroPage/Index'
import ExplorePage from './ExplorePage/Index'


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