import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

const RequireAuth = () => {
    const router = useRouter();
    const handleClick = (operation:string):void => {
        if(operation === 'register'){
            router.push('/auth/register')
        }
        else if( operation === 'login'){
            router.push('/auth/login')
        }
    }

  return (
    <HeaderLayout>
        <CourseLayout>
            <div className='scrollbar w-full h-full md:overflow-y-scroll md:w-5/6 p-2 md:p-4  flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                <div className='h-max w-full flex flex-col md:flex-row justify-center items-center'>
                    <div className=''>
                        <Image 
                            className=''
                            src="/requireAuth3.svg" alt="requireAuth" height={400} width={400}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-5 w-full md:w-1/2 p-5 rounded-3xl bg-gradient-to-br from-blue-900  to-blue-600 text-white'>
                        <p className=' text-center align-middle text-xl'>You Need to Register/Login to Continue</p>
                        <div className='rounded-2xl py-2 text-center align-middle bg-blue-500 text-2xl w-full hover:border-2 hover:border-white cursor-pointer active:bg-green-500' onClick={() => handleClick('register')}>Register</div>
                        <div className='rounded-2xl py-2 text-center align-middle bg-blue-500 text-2xl w-full hover:border-2 hover:border-white cursor-pointer active:bg-green-500' onClick={() => handleClick('login')}>Login</div>
                    </div>
                </div>
            </div>
        </CourseLayout>
    </HeaderLayout>
  )
}

export default RequireAuth