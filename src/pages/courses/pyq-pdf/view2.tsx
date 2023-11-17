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


  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`scrollbar w-max h-full overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll md:w-5/6 p-2 `} onContextMenu={disableRightClick}>
          <div className=' bg-sky-700 rounded-3xl p-4'>
            <Image
              src={`/cq-${currentPage}.png`}
              alt='circle question image'
              height={1000}
              width={1000}
              className='print-hidden w-full rounded-3xl'
              onContextMenu={disableRightClick} // Attach the event handler
            />
            <div className='mt-2 flex flex-col items-center '>
              <p className='text-white'>Page {currentPage} of {totalPages}</p>
              <div className='flex justify-center gap-4 mt-2'>
                <button className='px-2 py-1 bg-white rounded w-20 hover:border-2 hover:border-red-700' onClick={handlePrev}>Prev</button>
                <button className='px-2 py-1 bg-white rounded w-20 hover:border-2 hover:border-red-700' onClick={handleNext}>Next</button>
              </div>
            </div>
            <button className='px-2 py-1 bg-white rounded w-20 hover:border-2 hover:border-red-700' onClick={() => router.back()}>Back</button>
        </div>
          </div>
      </CourseLayout>
    </HeaderLayout>
  );
}

export default View;
