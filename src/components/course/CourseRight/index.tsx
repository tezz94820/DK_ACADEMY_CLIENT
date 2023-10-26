import React, { useState } from 'react'
import ExplorePage from './ExplorePage/Index'
import IntroPage from './IntroPage/Index';


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