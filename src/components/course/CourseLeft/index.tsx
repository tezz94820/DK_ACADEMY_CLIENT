import React, { useEffect, useState } from 'react'
import { courseLeftList } from '../../../../data/courseLeftList'
import styles from '../courseStyles.module.css'
import Image from 'next/image'; 
import Link from 'next/link';
import { useRouter } from 'next/router';
function CourseLeft() {

  const [ selectedTab, setSelectedTab ] = useState('');
  const router = useRouter();
  const routePathname = router.pathname;

  useEffect( () => {
    courseLeftList.forEach( item => {
      routePathname.startsWith(item.href) && setSelectedTab(item.id);
    })
  },[routePathname])

  const handleTabChange = (tabId:string) => {
    setSelectedTab(tabId);
  }

  return (
    <>
        <div className={`${styles.scrollbar} hidden w-1/6  md:flex items-center border-r-4 border-blue-800`} >
          <ul className='h-full w-full flex flex-col justify-evenly my-auto'>
            {
              courseLeftList.map( item => (
                <li key={item.id} className='text-start font-bold h-14 w-full flex items-center px-2 '>
                  <Link 
                    href={item.href}
                    className={`flex gap-2 w-full rounded-lg shadow-lg shadow-blue-800/50 border border-blue-800  ${selectedTab==item.id ? 'bg-blue-800 text-white ' : 'bg-white hover:bg-blue-800/20'} `}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <Image src={item.icon} alt="icon" height={5} width={5} className='h-8 w-8 my-1 ml-1'/>
                    <p className='text-xs my-auto '>{item.name}</p>
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