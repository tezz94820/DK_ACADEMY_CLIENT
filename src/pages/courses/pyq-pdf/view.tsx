import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const View = () => {

  const totalPages = 5;
  const router = useRouter();
  const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const closeHandler = () => {
    router.back();
  }

  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={` print-hidden scrollbar w-max h-full overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll md:w-5/6 p-2  relative`} onContextMenu={disableRightClick}>
          
          {/* back button */}
          <div className='fixed right-2 z-10'>
            <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-blue-600 hover:border-red-700 ' onClick={closeHandler}>Close</button>
          </div>
          
          {/* pdf page */}
          {
            [1,2,3,4,5].map( item => (
              <div key={item} className=' bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-2 md:p-4 h-full md:h-max flex flex-col mb-2 relative box-border'>
                <div className='flex flex-col items-center absolute justify-center w-full'>
                    <p className='text-white text-xs font-semibold md:text-base px-2 pb-2 bg-purple-500 rounded-b-xl'>Page {item} of {totalPages}</p>
                </div>
                <Image
                  src={`https://s3.ap-south-1.amazonaws.com/dkacademy.store/pyq-pdf/655847d0a79f3fc5d391b02b/images/quad-01.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiAnX3ZIBn6Rp8h%2FWkIlGGNjc669Niui5YyzNV1N1qSQKAIhANOi6e0QWSJDnrQBgTns8pn4%2BuuDiZ2L330kmk%2FSWLiLKu0CCN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNDkwMjQ5OTczOTM5IgyQIlPJHUdTswN%2F0wMqwQJ18Ddc2xw9ZCr7AACYk83ONMhu7mKRrn0MiKnuHaReHyUAQc9UDsAh%2FQ6xITWPRxq9gt5KqAvZbp8QLtd7KXArhvhktTmuXzIMQnqVV4iXUuouqSa3LRlClA1XCEKt%2FlgdfBk7T1OUsS9xR8IBDQSTo7TVkPr1lzUlAImlPKxzXj3lknpwrErTsB1PZ3WZV8ZVyvKEOdBPTuIwpbFhHVnihVkl%2B5BX5S4XxKS7DJzY2sBobJAsgSigKDopLeK2Fj398YctwkQp1goREkMn16FmA6J8iuQFULG6J1amFKZAUNuG7Wj2an71yvwYpjLQ3zpBLsaGMcddaPyH6cWVnFVQ08v8q2ftTGeBCitqZNhF0eC%2FbfhxYCCyssq3l9tUNG4miSOo5xlSlFSA%2FKPOTDjKwqyDC115XZzxS4xUDuksBPgw4O3pqgY6swIT2EAAzAymQfMrvCWCKTb3wI9Wf%2BX47JK%2FWdh%2FLs%2FKsjqY5fX%2BbP1srOL943ZQjqdDSnQQeqXSjXnwu79kqaHbIiWVRMRmWZDnfPBlRhijwybuelN5WcSoXLhdlBMaphUhZukTrDU%2B0VdOGZzXE0yuavRt8qhf1l1hbQgdDk1GY3gBm2gIqZKJ7u8q1Bk0FbyYymqE6xb%2FcD%2Br4msvclzQj62GbHSfW3%2FYR4yyQV4%2FEiYTIIXoKr%2BjQEfjgZjVjogUzKCei54kRZctX%2BKlvi2UHI7SVmHUOZpGmISDcADIoGot2C2BUHnj0Wjoyw4g9j3YoH%2BehzKlST8V1gEsMU3zfW81rJX4n1WlbV9TDnk596DFsgEnrjtTZhgCR%2Bw6wlDf0KDLH39KlB9%2F%2FpXMXqCKtYN1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231119T213805Z&X-Amz-SignedHeaders=host&X-Amz-Expires=60&X-Amz-Credential=ASIAXEJJM6CZTBDJVH7H%2F20231119%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=5b8a923b7fa1b23f9c937a550f33927d826e46017e84c870f84cf58352fb0232`}
                  alt='circle question image'
                  height={1000}
                  width={1000}
                  className='print-hidden h-full w-full rounded-3xl'
                  onContextMenu={disableRightClick} // Attach the event handler
                />
              </div>
            ))
          }
        </div>
      </CourseLayout>
    </HeaderLayout>
  );
}

export default View;
