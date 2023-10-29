import React,{ useState} from 'react'
import TitleComponent from './TitleComponent'
import styles from '../../courseStyles.module.css'
import { explorePageNavLinks } from '../../../../../data/explorePageNavLinks'
import { IndividualCourseDetails } from '../../../../../data/IndividualCourseDetails'
import Description from './Description'
import CourseRightLayout from '../CourseRightLayout'



function ExplorePage() {
  const [pageNavLink, setPageNavLink] = useState('1')
  const changePageNavLink = (component:string) => {
    setPageNavLink(component)
  }
  return (
    <CourseRightLayout>
      <div className='p-5 md:px-32' >
        <TitleComponent title={IndividualCourseDetails.title} pageNavLink={pageNavLink} changePageNavLink={changePageNavLink}/>
        { pageNavLink === '1' && <Description /> }
      </div>
    </CourseRightLayout>
  )
}

export default ExplorePage