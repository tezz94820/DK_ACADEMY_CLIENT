import React from 'react'
import Image from 'next/image'

function  SearchBar() {
  return (
    <div className=" flex items-center justify-center h-8 relative " >
      <div className='w-3/4 h-full'>
        <Image src='/search.svg' alt="search Icon" width={22} height={22} className='absolute mt-1.5 ml-1.5' />
        <input
          type="text"
          className="w-full h-full focus:outline-teal-400 pl-8 rounded-lg bg-violet-300 font-light text-sm"
          placeholder="Search to start learning..."
        />
      </div>
      <button type='submit' className='text-white bg-violet-500 hover:bg-violet-800 focus:outline-none  font-medium rounded-lg text-center ml-5 h-full w-4.6'>Search</button>
    </div>
  )
}

export default SearchBar