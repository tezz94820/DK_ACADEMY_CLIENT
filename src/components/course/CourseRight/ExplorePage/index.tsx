import React,{ useState} from 'react'
import TitleComponent from './TitleComponent'
import styles from '../../courseStyles.module.css'
import { explorePageNavLinks } from '../../../../../data/explorePageNavLinks'
import { IndividualCourseDetails } from '../../../../../data/IndividualCourseDetails'
import Description from './Description'



function index() {
  const [pageNavLink, setPageNavLink] = useState('1')
  const changePageNavLink = (component:string) => {
    setPageNavLink(component)
  }
  return (
    <div className={`${styles.scrollbar}  w-full h-full md:overflow-y-scroll md:w-5/6 p-5 md:px-32`} >
        <TitleComponent title={IndividualCourseDetails.title} pageNavLink={pageNavLink} changePageNavLink={changePageNavLink}/>
        { pageNavLink === '1' && <Description /> }
        
    </div>
  )
}

export default index