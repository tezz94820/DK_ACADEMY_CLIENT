import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const Admin = () => {
    const router = useRouter();

  return (
    <div className='p-5'>

      {/* pyq courses */}
      <div className='flex flex-col'>
        <h1 className='mx-auto text-2xl text-red-500 mb-4 font-bold'>PYQ Courses</h1>
        <div className='flex gap-4'>
          <Link href="/admin/pyq-pdf/create-pyq" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Create New PYQ Course</Link>
          <Link href="/admin/pyq-pdf/all-pyq" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Get ALL PYQ Course</Link>
        </div>
      </div>

      <hr className='border border-purple-700 my-5'/>

      {/* theory courses */}
      <div className='flex flex-col'>
        <h1 className='mx-auto text-2xl text-red-500 mb-4 font-bold'>Theory Courses</h1>
        <div className='flex gap-4'>
          <Link href="/admin/theory-courses/create-theory" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Create New Theory Course</Link>
          <Link href="/admin/theory-courses/all-theory" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Get ALL Theory Course</Link>
        </div>
      </div>

      <hr className='border border-purple-700 my-5'/>
      
      {/* tests */}
      <div className='flex flex-col'>
        <h1 className='mx-auto text-2xl text-red-500 mb-4 font-bold'>Tests</h1>
        <div className='flex gap-4'>
          <Link href="/admin/test-series/create-test" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Create Test</Link>
          <Link href="/admin/test-series/all-test" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Get All Tests</Link>
        </div>
      </div>

      <hr className='border border-purple-700 my-5'/>

      {/* contact-form */}
      <div className='flex flex-col'>
        <h1 className='mx-auto text-2xl text-red-500 mb-4 font-bold'>Contact Form</h1>
        <div className='flex gap-4'>
          <Link href="/admin/contact-form" className='font-bold px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Students List</Link>
        </div>
      </div>

    </div>
  )
}

export default Admin