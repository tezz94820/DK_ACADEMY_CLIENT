import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const Admin = () => {
    const router = useRouter();

  return (
    <div className='p-5'>
      {/* tests */}
      <div className='flex flex-col'>
        <h1 className='mx-auto text-2xl text-red-500 mb-4 font-bold'>Tests</h1>
        <div className='flex gap-4'>
          <Link href="/admin/test-series/create-test" className='px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Create Test</Link>
          <Link href="/admin/test-series/all-test" className='px-4 py-2 w-max text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-600'>Get All Tests</Link>
        </div>
      </div>
      <hr className='border border-purple-700 my-5'/>
    </div>
  )
}

export default Admin