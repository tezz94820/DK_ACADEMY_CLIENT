import React from 'react'
import { DescriptionType } from '../../../../../../data/IndividualCourseDetails'
import Image from 'next/image'

type DescriptionProps = {
    description: DescriptionType
}

function LeftDescription( {description} : DescriptionProps) {
  return (
    <div className='h-max shadow-lg shadow-indigo-500/50 p-1 md:p-5 rounded-3xl mt-5'>
        <h2 className='text-xl font-bold mb-3 ml-3 '>Description</h2>
        <ul>
        {
            description.map( (item) => (
                <li key={item.id} className='flex p-2' >
                    <Image src='/star.svg' alt="star" width={20} height={20} 
                        className='h-5 w-5 md:h-6 md:w-6 md:my-auto mr-2 '    
                    />
                    <div className='flex '>
                        { item.title && <p className='text-xs font-bold align-middle'>{item.title} :- &nbsp;  </p>}
                        <p className='text-xs align-middle'>{item.content}</p>
                    </div>
                </li>
            ))
        }
        </ul>
    </div>
  )
}

export default LeftDescription