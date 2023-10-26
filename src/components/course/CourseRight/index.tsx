import React, { useState } from 'react'
import ExplorePage from './ExplorePage'
import IntroPage from './IntroPage';


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