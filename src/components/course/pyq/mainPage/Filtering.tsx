import React, { useState } from 'react'

import { courseLeftList } from '../../../../../data/courseLeftList'
import styles from '../../courseStyles.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';

interface FilteringProps {
    topics: string[];
}

function Filtering({topics}: FilteringProps) {

  const [ focusedButton, setFocusedButton ] = useState('');
  const router = useRouter();


  const handleButtonClick = (item:any) => {
    setFocusedButton(item.id);
    router.push(item.href);
  }
  return (
    <div className={`mt-2 h-10 flex gap-2 overflow-x-scroll whitespace-nowrap ${styles.hide_scrollbar} md:hidden`}>
        {
          courseLeftList.map( item => (
            <div key={item.name} className=' flex justify-center items-center'>
              <button 
                onClick={() => handleButtonClick(item)}
                className={`h-auto flex w-max bg-violet-200 my-auto rounded-lg px-1 hover:bg-violet-400 ${focusedButton==item.id ? 'border-b-2 bg-violet-300 border-violet-600' : ''}`}
              >
                  <Image src={item.icon} alt="icon" height={10} width={10} className='h-6 w-6 my-1'/>
                  <p className='text-xs my-auto ml-1'>{item.name}</p>
              </button>
            </div>
          ))
        }
    </div>
  )
}

export default Filtering