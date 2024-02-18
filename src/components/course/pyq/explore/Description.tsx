import Image from 'next/image'
import React from 'react'

type DescriptionPropsType = {
    description: string[]
}
const Description = ({description}:DescriptionPropsType) => {
    return (
        <>
            <div className='h-max shadow-lg shadow-blue-800/50 p-1 md:p-5 border-gray-200 border-2 rounded-2xl'>
                <h2 className='text-2xl text-blue-800 font-bold mb-3 ml-3 tracking-widest'>Description</h2>
                <ul>
                    {
                        description?.map((item) => (
                            <li key={item} className='flex p-2' >
                                <Image src='/star.svg' alt="star" width={20} height={20}
                                    className='h-5 w-5 md:h-6 md:w-6 md:my-auto mr-2 '
                                />
                                <div className='flex '>
                                    <p className='md:text-base lg:text-lg align-middle'>{item}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Description