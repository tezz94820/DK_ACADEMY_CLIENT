import React, { useRef, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function VerifyOtp() {

  const phone = "7972142271";
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index:number, value: string, nextInputIndex:string) => {
    if(value.length===1 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Ensure refs are updated when components mount
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4); // Ensure the array length is 4
    inputRefs.current[0]?.focus();
  }, []);
  

  return (
      <div className='min-h-screen w-screen flex flex-row  justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
        <div className='h-max w-5/6 md:w-2/5 bg-red-300 flex flex-col bg-gradient-to-br from-gray-500 to-black text-white my-3 py-5 rounded-lg '>

          <div className='flex h-max justify-center items-center cursor-pointer' onClick={() => router.push('/')}>
            <Image src="/logo.png" width={200} height={200} alt='logo' className='h-12 w-16'/>
            <h2 className='font-bold text-xl md:text-2xl ml-2 text-white align-middle'>DK Academy</h2>
          </div>

          <div className='w-full h-80'>
            <Image src="/otp.svg" alt="OTP Image SVG" height={100} width={100}
              className='h-full w-full '
            />
          </div>

          <div className='w-full h-max flex flex-col justify-center items-center'>
            <h3 className='font-bold mb-1 text-base md:text-lg'>Verification Code</h3>
            <p className='px-3 md:px-0 text-sm md:text-base'>Please Enter Verification Code sent to your mobile</p>
            {/* <button className='h-max w-max py-1 px-2 bg-red-500 hover:bg-red-700 rounded-lg mt-3 focus:ring-4 focus:outline-none text-sm' onClick={() => router.push('/auth/register')}>Change Number</button> */}
          </div>

          <div className='w-full h-max mt-5'>
            <form action="" method="post">
              <div className="flex flex-col">
                <div className='flex align-center justify-center gap-4'>
                  {
                    [0,1,2,3].map( (index) => (
                      <input 
                        key={index}
                        ref = { (ref) => (inputRefs.current[index]=ref)}
                        className="h-12 w-12 rounded-lg outline-none ring-4 focus:ring-blue-600 text-blue-600 text-center align-middle font-bold remove-numberInput-default" 
                        type="number" 
                        maxLength={1}
                        min={0}
                        max={9}
                        name={`otp_${index}`}
                        onInput={ (evt:ChangeEvent<HTMLInputElement>) => handleInputChange(index, evt.target.value, `otp_${index + 1}`)}
                        autoFocus={index === 0}
                      />
                    ))
                  }
                </div>
                <button className="w-4/5 bg-blue-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6 mx-auto">
                  Verify Account
                </button>
                <p className='mx-auto mt-3'>Didn&apos;t recieve code? <span className='text-blue-700 font-bold'>Resend</span></p>
              </div>
            </form>
          </div>

        </div>
      </div>
  )
}

export default VerifyOtp