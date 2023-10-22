import React from 'react'
import { courseLeftList } from '../../../../data/courseLeftList'
import styles from '../courseStyles.module.css'

function Filtering() {
  return (
    <div className={`mt-2 h-10 flex gap-2 overflow-x-scroll whitespace-nowrap ${styles.hide_scrollbar} md:hidden`}>
        {
          courseLeftList.map( item => (
            <div key={item.name} className=' flex justify- items-center hover:'>
              <button className='h-auto w-auto bg-violet-200 my-auto rounded-lg px-1 hover:bg-violet-400 active:bg-violet-400'>
                {item.name}
              </button>
            </div>
          ))
        }
    </div>
  )
}

export default Filtering