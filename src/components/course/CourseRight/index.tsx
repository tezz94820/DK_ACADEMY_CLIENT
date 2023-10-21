import React from 'react'
import styles from '../courseStyles.module.css'
import Image from 'next/image'


function CourseRight() {
  return (
    <>
        <div className={`${styles.scrollbar} bg-red-400 w-full h-full md:overflow-y-scroll md:w-4/5 p-4`}>
            {/* search bar */}
            <div className=" flex items-center justify-center h-8 relative my-2 " >
                <div className='w-3/4 h-full'>
                    <Image src='/search.svg' alt="search Icon" width={22} height={22} className='absolute mt-1.5 ml-1.5' />
                    <input
                        type="text"
                        className="w-full h-full focus:outline-teal-400 pl-8 rounded-lg bg-violet-300 font-light text-sm"
                        placeholder="Search to start learning..."
                    />
                </div>
                <button type='submit' className='text-white bg-violet-500 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center ml-5 h-full w-4.6'>Search</button>
            </div>
            <h1>corousal</h1>
            <h1>filtering</h1>
            <h1>courses with scroll to load more</h1>
            <h1> Right part-1</h1>
            <h1> Right part</h1>
            <h1 className='text-sm'> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part</h1>
            <h1> Right part-100</h1>


        </div>
    </>
  )
}

export default CourseRight