import React from 'react'
import { courseLeftList } from '../../../../data/courseLeftList'
import styles from '../courseStyles.module.css'

function CourseLeft() {
  
  return (
    <>
        <div className={`${styles.scrollbar} bg-blue-400 hidden md:block md:overflow-y-scroll w-1/5`} >
          <ul className='h-full w-full p-2'>
            {
              courseLeftList.map( link => (
                <li key={link.name} className='text-center font-bold p-4'>{link.name}</li>
              ))
            }            
          </ul>
        </div>   
    </>
  )
}

export default CourseLeft