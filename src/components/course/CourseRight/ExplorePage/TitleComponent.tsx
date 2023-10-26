import React from 'react'
import { explorePageNavLinks } from '../../../../../data/explorePageNavLinks'

type TitleComponentType = {
    title:string;
    pageNavLink: string;
    changePageNavLink: (id:string) => void;
}

function TitleComponent({title,pageNavLink,changePageNavLink} : TitleComponentType) {
  return (
    <div className='h-28 shadow-lg shadow-indigo-500/50'>
        <div className='h-20 w-full bg-indigo-500 rounded-t-3xl flex items-center'>
            <p className='text-xl md:text-2xl font-bold text-white ml-5'>{title}</p>
        </div>
        <div className=' h-8 px-4'>
            <ul className='flex h-full text-xs md:text-sm items-center gap-3'>
                {   explorePageNavLinks.map( item =>  (
                        <li 
                            key={item.id} 
                            className={`${pageNavLink===item.id ? 'border-b-2 border-violet-700 text-violet-700 font-bolder' : ''} cursor-pointer  font-normal`}
                            onClick={() => changePageNavLink(item.id)}
                        >
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default TitleComponent