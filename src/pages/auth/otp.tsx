import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function OtpPage() {

  const phone = "7972142271";
  const router = useRouter();

  return (
      <div className='min-h-screen w-screen flex flex-row  justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
        <div className='h-max w-5/6 md:w-2/5 bg-red-300 flex flex-col bg-gradient-to-br from-gray-500 to-black text-white my-3'>
          
          <div className='flex h-max justify-center items-center cursor-pointer mt-3' onClick={() => router.push('/')}>
            <Image src="/logo.png" width={200} height={200} alt='logo' className='h-12 w-16'/>
            <h2 className='font-bold text-xl md:text-2xl ml-2 text-white align-middle'>DK Academy</h2>
          </div>
          
          <div className='w-full h-80'>
            <Image src="/otp.svg" alt="OTP Image SVG" height={100} width={100}
              className='h-full w-full '  
            />
          </div>

          <div className='w-full h-max flex flex-col justify-center items-center'>
            <h3 className='font-bold mb-1'>Verify Your Phone Number</h3>
            <p className='px-3 md:px-0'>Click on Send OTP to send the OTP to <span className='text-blue-500 font-bold hidden md:inline'>+91-{phone}</span></p>
            <p className='text-blue-500 font-bold md:hidden'>+91-{phone}</p>
            <button className='h-max w-max py-1 px-2 bg-red-500 hover:bg-red-700 rounded-lg mt-3 focus:ring-4 focus:outline-none text-sm' onClick={() => router.push('/auth/register')}>Change Number</button>
          </div>
          
          <div className='h-max w-full flex justify-center items-center mb-5 mt-3'>
            <button className='h-10 w-32 bg-blue-500 hover:bg-blue-700 rounded-lg mt-3 focus:ring-4 focus:outline-none'>Send OTP</button>
          </div>
        
        </div>
      </div>
  )
}

export default OtpPage