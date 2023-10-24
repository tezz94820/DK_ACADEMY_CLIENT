import React, { useEffect, useState } from 'react'
import { courseLeftList } from '../../../../data/courseLeftList'
import styles from '../courseStyles.module.css'
import Image from 'next/image'; 
import Link from 'next/link';
function CourseLeft() {

  const [ focusedButton, setFocusedButton ] = useState('');

  return (
    <>
        <div className={`${styles.scrollbar} hidden md:block md:overflow-y-scroll w-1/6 bg-gradient-to-r from-violet-100 to-violet-100`} >
          <ul className='h-full w-full'>
            {
              courseLeftList.map( item => (
                <li key={item.id} className='text-center font-bold h-14 w-full flex items-center px-2 '>
                  <Link 
                    href={item.href}
                    className={`flex gap-2 w-full  hover:bg-violet-300 rounded-lg shadow-sm shadow-indigo-500/50 ${focusedButton==item.id ? 'border-b-2 bg-violet-300 border-violet-600' : ''} `}
                    onClick={() => setFocusedButton(item.id)}
                  >
                    <Image src={item.icon} alt="icon" height={5} width={5} className='h-8 w-8'/>
                    <p className='text-xs my-auto'>{item.name}</p>
                  </Link>
                </li>
              ))
            }            
          </ul>
        </div>   
    </>
  )
}

export default CourseLeft