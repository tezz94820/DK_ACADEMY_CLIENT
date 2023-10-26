import React,{ useState} from 'react'
import { IndividualCourseDetails } from '../../../../../../data/IndividualCourseDetails'
import styles from '../../courseStyles.module.css'
import LeftDescription from './LeftDescription'
import Teachers from './Teachers'
import RightCard from './RightCard'

function index() {
  return (
    <>
        <div className='md:grid md:grid-cols-7 flex flex-col'>
          {/* left */}
          <div className='md:col-span-4'>
            <LeftDescription description={IndividualCourseDetails.description}/>
            <Teachers teachers={IndividualCourseDetails.teachers}/>
          </div>
          {/* right */}
          <div className='md:col-span-3 '>
            <RightCard item={IndividualCourseDetails}/>
          </div>
        </div>  
    </>
  )
}

export default index