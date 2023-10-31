import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Register() {

    const router = useRouter();


  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-14 '>
        <div className='md:grid md:grid-cols-2  w-full h-max'>
            {/* left part of form */}
            <div className='flex justify-center items-center'>
                <div className='rounded-lg h-max w-5/6 ml-5 flex flex-col p-8  bg-gradient-to-br from-gray-500 to-black'>
                    <div className='flex h-max items-center'>
                        <Image src="/logo.png" width={200} height={200} alt='logo' className='h-10 w-12'/>
                        <h2 className='font-bold text-lg ml-2 text-white'>DK Academy</h2>
                    </div>
                    <div className='flex flex-col h-max mt-3'>
                        <h2 className='text-white text-xl font-bold'>Create Your Account</h2>
                        <p className='text-slate-300 text-sm'>
                            Start your Learning Journey. Already have an account? 
                            <span className='text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-4' onClick={() => router.push('/login')}>&nbsp;Login here</span>
                            .
                        </p>
                    </div>
                    <div className='mt-3'>
                        <form action="#">
                            {/* handwritten form */}
                            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor='fname' className='text-white'>First Name</label>
                                    <input type='text' id='fname' name='fname' placeholder='e.g. Rahul' required className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='lname' className='text-white'>Last Name</label>
                                    <input type='text' id='lname' name='lname' placeholder='e.g. Kumar' required className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='email' className='text-white'>Email</label>
                                    <input type='text' id='email' name='email' placeholder='name@company.com' required className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='phone' className='text-white'>Phone Number</label>
                                    <input type='text' id='phone' name='phone' placeholder='e.g. 0123456789' required className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='password' className='text-white'>Password</label>
                                    <input type='text' id='password' name='password' placeholder='••••••••' required className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='confirmpassword' className='text-white'>Confirm Password</label>
                                    <input type='text' id='confirmpassword' name='confirmpassword' placeholder='••••••••' required className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'/>
                                </div>
                            </div>
                            
                            {/* terms and conditions */}
                            <div className='flex-col mt-6'>
                                <div className='flex'>
                                    <input id="terms" type="checkbox" className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 mr-3" required />
                                    <label htmlFor="terms" className="text-slate-300 text-sm">By signing up, you are creating a DK Academy&apos;s account, and you agree to DK Academy <span className="text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-4">Terms and Conditions</span></label>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-blue-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">Create an account</button>
                            
                        </form>


                    </div>
                </div>
            </div>

            {/* right image  */}
            <div className='hidden md:flex md:justify-center md:items-center' >
                <Image src='/register1.svg' alt='register' height={500} width={500} />
            </div>
        </div>

    </div>
  )
}

export default Register