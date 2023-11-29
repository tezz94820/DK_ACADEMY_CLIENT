import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import CourseRightLayout from '@/components/course/CourseRight/CourseRightLayout'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PdfCourses = () => {

  const subjects = [
    {
      id: "1",
      name: "Mathematics",
      image: "/mathematics.gif",
      href: "/courses/pyq-pdf/mathematics",
      placeholder: "/mathematics.png",
    },
    {
      id: "2",
      name: "Physics",
      image: "/physics.gif",
      href: "/courses/pyq-pdf/physics",
      placeholder: "/physics.png",
    },
    {
      id: "3",
      name: "Chemistry",
      image: "/chemistry.gif",
      href: "/courses/pyq-pdf/chemistry",
      placeholder: "/chemistry.png",
    }
  ]

  return (
    <>
      <HeaderLayout>
        <CourseLayout>
          {/* right part */}
          <CourseRightLayout>
            <div>
              <p className='mt-3'>3 Subjects Available</p>
              <hr className='border border-purple-700'/>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
              {
                subjects.map( item => (
                  <Link key={item.id} href={item.href} className=' border-gray-200 border-2 rounded shadow-lg shadow-indigo-500/50 p-2 flex flex-col'>
                    <div className='h-44 w-full'>
                      <Image src={item.image} height="200" width="200" alt={item.name} className='w-full h-full' placeholder="blur" blurDataURL={item.placeholder} />
                    </div> 
                    <hr className='border border-purple-700 mt-2' />
                    <div className='mt-2 text-xl font-semibold'>{item.name}</div>
                  </Link>
                ))
              }
              </div>
            </div>
          </CourseRightLayout>
        </CourseLayout>
      </HeaderLayout>
    </>
  )
}

export default PdfCourses