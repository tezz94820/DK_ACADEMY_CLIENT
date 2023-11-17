import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const View = () => {

  const [ currentPage, setCurrentPage ] = useState(1);
  const totalPages = 5;
  const router = useRouter();
  
  const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const backHandler = () => {
    router.back();
  }


  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={` print-hidden scrollbar w-max h-full overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll md:w-5/6 p-2  relative`} onContextMenu={disableRightClick}>
          {/* back button */}
          <div className='absolute right-2 z-10'>
            <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-blue-600 hover:border-red-700 ' onClick={backHandler}>Back</button>
          </div>
          {/* page navigator */}
          <div className='flex flex-col items-center absolute justify-center  w-full '>
            <div className='rounded bg-sky-700 p-1 text-center'>
              <p className='text-white'>Page {currentPage} of {totalPages}</p>
              <div className='flex justify-center gap-4 mt-1'>
                <button className=' bg-white rounded w-16 hover:border-2 hover:border-red-700' onClick={handlePrev}>Prev</button>
                <button className=' bg-white rounded w-16 hover:border-2 hover:border-red-700' onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
          {/* pdf page */}
          <div className=' bg-sky-700 rounded-3xl p-2 md:p-4 h-full md:h-max flex flex-col '>
            <div className='bg-white w-full h-10 rounded-t-3xl '></div>
            <Image
              src={`/cq-${currentPage}.png`}
              alt='circle question image'
              height={1000}
              width={1000}
              className='print-hidden h-full w-full rounded-b-3xl'
              onContextMenu={disableRightClick} // Attach the event handler
            />
          </div>
        </div>
      </CourseLayout>
    </HeaderLayout>
  );
}

export default View;
