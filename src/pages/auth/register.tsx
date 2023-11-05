"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';

const initialFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
}

function Register() {

  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);

  const formSubmitHandler = async (evt : FormEvent<HTMLFormElement>) : Promise<void> => {
    evt.preventDefault();
    console.log(formData);
    try {
        //registration api
        const regRes = await axiosClient.post('/auth/register', formData)
        console.log(regRes.data); 
        const { phone } = regRes.data.data;
        sessionStorage.setItem('phone', phone);

        //if registration is successful the allot an otp
        const otpRes = await toast.promise( axiosClient.post('/auth/otp/phone', {phone}) , {
            pending: 'Sending OTP ... Please wait',
            success: 'OTP Sent Successfully',
            error: 'Error Sending OTP'
        });
        console.log(otpRes.data);
        const { verification_code } = otpRes.data.data;
        sessionStorage.setItem('verification_code', verification_code);
        
        // if res is received then navigate to verify OTP Page
        otpRes && router.push('/auth/verifyotp');
    } catch (error:any) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(error.message);
    }
  }

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-14 scrollbar'>
        <div className='md:grid md:grid-cols-2  w-full h-max'>
            {/* left part of form */}
            <div className='flex justify-center items-center'>
                <div className='rounded-lg h-max w-5/6 ml-5 flex flex-col p-8  bg-gradient-to-br from-gray-500 to-black'>
                    <div className='flex h-max items-center cursor-pointer' onClick={() => router.push('/')}>
                        <Image src="/logo.png" width={200} height={200} alt='logo' className='h-10 w-12'/>
                        <h2 className='font-bold text-lg ml-2 text-white'>DK Academy</h2>
                    </div>
                    <div className='flex flex-col h-max mt-3'>
                        <h2 className='text-white text-xl font-bold'>Create Your Account</h2>
                        <p className='text-slate-300 text-sm'>
                            Start your Learning Journey. Already have an account? 
                            <span className='text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-4' onClick={() => router.push('/auth/login')}>&nbsp;Login here</span>
                            .
                        </p>
                    </div>
                    {/* oauth of google */}
                    <div className='flex justify-center items-center w-3/4 mx-auto mt-5'>
                        <button className='border flex justify-center items-center gap-2 w-full p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200'>
                            <Image src="/google.svg" height={100} width={100} alt="google logo" className='h-6 w-6'/>
                            <p className='text-sm md:text-base '>Sign up with Google</p>
                        </button>
                    </div>

                    {/* horizontal rule bar */}
                    <div className='flex items-center gap-4 mt-4 '>
                        <hr className='w-1/2'/>
                        <p className='font-bold text-white'>OR</p>
                        <hr className='w-1/2'/>
                    </div>
                    <div className='mt-3'>
                        <form action="#" onSubmit={formSubmitHandler}>
                            {/* handwritten form */}
                            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor='first_name' className='text-white'>First Name</label>
                                    <input type='text' id='first_name' name='first_name' placeholder='e.g. Rahul' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1' 
                                        value={formData.first_name} 
                                        onChange={evt => setFormData({ ...formData , first_name: evt.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='last_name' className='text-white'>Last Name</label>
                                    <input type='text' id='last_name' name='last_name' placeholder='e.g. Kumar' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.last_name} 
                                        onChange={evt => setFormData({ ...formData , last_name: evt.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='email' className='text-white'>Email</label>
                                    <input type='text' id='email' name='email' placeholder='name@company.com' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.email} 
                                        onChange={evt => setFormData({ ...formData , email: evt.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='phone' className='text-white'>Phone Number</label>
                                    <input type='number' id='phone' name='phone' placeholder='e.g. 0123456789' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.phone} 
                                        onChange={evt => setFormData({ ...formData , phone: evt.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='password' className='text-white'>Password</label>
                                    <input type='text' id='password' name='password' placeholder='••••••••' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.password} 
                                        onChange={evt => setFormData({ ...formData , password: evt.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='confirmpassword' className='text-white'>Confirm Password</label>
                                    <input type='password' id='confirmPassword' name='confirmpassword' placeholder='••••••••' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.confirmPassword} 
                                        onChange={evt => setFormData({ ...formData , confirmPassword: evt.target.value})}
                                    />
                                </div>
                            </div>
                            
                            {/* terms and conditions */}
                            <div className='flex-col mt-6'>
                                <div className='flex'>
                                    <input id="terms" type="checkbox" className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 mr-3" required />
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