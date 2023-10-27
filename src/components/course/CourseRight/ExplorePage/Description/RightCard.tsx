import React from 'react'
import { IndividualCourseType } from '../../../../../../data/IndividualCourseDetails'
import Image from 'next/image'
function RightCard({item}: {item:IndividualCourseType}) {
  return (
    <div className=' sticky top-0 h-80 w-full flex justify-center items-center mt-1'>
        <div className='h-76 w-80 rounded-lg  flex flex-col p-2 shadow-lg shadow-indigo-500/50 border-gray-200 border-2'>
        {/* top */}
          <div className='flex flex-col'>
            <Image src={item.thumbnail} alt="thumbnail" height={500} width={500} 
              className='rounded-lg h-full w-full'
            />
            <div className='grid grid-cols-4 mt-2'>
              <div className='col-span-3 flex my-auto'>
                <Image src='/student.svg' alt="student icon" height={20} width={20} 
                  className='w-4 h-4 mr-1 '
                />
                <p className='text-xs'>For {item.class} </p>
              </div>
              <div className='col-span-1 my-auto rounded-lg text-blue-900 bg-yellow-500/70 text-center p-1'>
                <p className='text-sm'>{item.language}</p>
              </div>
            </div>
          </div>
          
          {/* separator */}
          <hr className='border border-purple-700 my-2'/>

          {/* bottom */}
          <div className='grid grid-cols-3'>
            <div className='flex flex-col col-span-2'>
              <div className='flex'> 
                <p className='text-base font-bold text-violet-900'>&#x20B9;{item.price}</p>
                <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{item.old_price}</p>
              </div>
              <div className='h-fit w-max p-1 my-auto rounded-lg bg-green-300 flex items-center mt-2'>
                <Image src='/discount.svg' width={10} height={10} alt='Discount Icon' 
                  className='w-4 h-4 mr-1 align-middle' 
                />
                <p className='text-xs align-middle'> Discount of {item.discount}% applied</p>
              </div>
            </div>

            <div className='h-full w-full flex justify-center items-center'>
              <button className='bg-violet-700 text-white hover:bg-violet-400 hover:text-violet-800 rounded-lg w-4/5 h-8 '>
                Buy Now
              </button>
            </div>

          </div>
        </div>
    </div>
  )
}

export default RightCard