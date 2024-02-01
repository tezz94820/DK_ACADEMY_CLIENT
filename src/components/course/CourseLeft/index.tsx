import React, { useState } from 'react'
import { courseLeftList } from '../../../../data/courseLeftList'
import styles from '../courseStyles.module.css'
import Image from 'next/image'; 
import Link from 'next/link';
function CourseLeft() {

  const [ focusedButton, setFocusedButton ] = useState('');

  return (
    <>
        <div className={`${styles.scrollbar} hidden w-1/6 bg-gradient-to-r from-yellow-300 to-orange-500 md:flex items-center`} >
          <ul className='h-max w-full flex flex-col gap-5 my-auto'>
            {
              courseLeftList.map( item => (
                <li key={item.id} className='text-center font-bold h-14 w-full flex items-center px-2 '>
                  <Link 
                    href={item.href}
                    className={`flex gap-2 w-full  hover:bg-violet-300 rounded-lg shadow-sm shadow-indigo-500/50 bg-white ${focusedButton==item.id ? 'bg-violet-800 ' : ''} `}
                    onClick={() => setFocusedButton(item.id)}
                  >
                    <Image src={item.icon} alt="icon" height={5} width={5} className='h-8 w-8 my-1 ml-1'/>
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