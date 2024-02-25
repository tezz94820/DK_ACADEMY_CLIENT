import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { login } from '@/app/features/authSlice';


const initialFormData = {
    user_contact: '',
    password: '',
}

function Login() {

    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch() 

    const formSubmitHandler = async (evt : FormEvent<HTMLFormElement>) : Promise<void> => {
        evt.preventDefault();
        try {
            const res = await axiosClient.post('/auth/login', formData)
            const { token, user_id, name, phone} = res.data.data;
            dispatch(login({token, user_id, name, phone}));
            toast.success("Login successful");
            router.replace('/courses/pyq');
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
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
                        <h2 className='text-white text-xl font-bold'>LogIn Your Account</h2>
                        <p className='text-slate-300 text-sm'>
                            Start your Learning Journey. Don&apos;t have an account? 
                            <span className='text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-4' onClick={() => router.push('/auth/register')}>&nbsp;Register here</span>
                            .
                        </p>
                    </div>
                    {/* oauth of google */}
                    <div className='flex justify-center items-center w-3/4 mx-auto mt-5'>
                        <button className='border flex justify-center items-center gap-2 w-full p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200'>
                            <Image src="/google.svg" height={100} width={100} alt="google logo" className='h-6 w-6'/>
                            <p className='text-sm md:text-base '>Sign In with Google</p>
                        </button>
                    </div>

                    {/* horizontal rule bar */}
                    <div className='flex items-center gap-4 mt-4 '>
                        <hr className='w-1/2'/>
                        <p className='font-bold text-white'>OR</p>
                        <hr className='w-1/2'/>
                    </div>


                    <div className='mt-3'>
                        <form action="POST" onSubmit={formSubmitHandler}>
                            {/* handwritten form */}
                            <div className='grid grid-cols-1 w-full gap-2 md:gap-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor='user_contact' className='text-white'>Email / Phone Number</label>
                                    <input type='text' id='user_contact' name='user_contact' placeholder='e.g. 0123456789 or name@company.com' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.user_contact} 
                                        onChange={evt => setFormData({ ...formData , user_contact: evt.target.value})}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='password' className='text-white'>Password</label>
                                    <input type='password' id='password' name='password' placeholder='e.g. ••••••••' required 
                                        className='mt-0.5 md:mt-2 text-sm focus:outline-0 focus:ring-4 focus:ring-lime-400 rounded-md px-2 py-1'
                                        value={formData.password} 
                                        onChange={evt => setFormData({ ...formData , password: evt.target.value})}
                                    />
                                </div>
                            </div>
                            
                            {/* terms and conditions */}
                            <div className='flex-col mt-6'>
                                <div className='flex items-center'>
                                    <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 mr-3" required />
                                    <label htmlFor="terms" className="text-slate-300 text-sm">By signing In, you agree to DK Academy <span className="text-blue-500 hover:cursor-pointer hover:underline hover:underline-offset-4">Terms and Conditions</span></label>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-blue-700 text-white focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center mt-4">Login</button>
                            
                        </form>


                    </div>
                </div>
            </div>

            {/* right image  */}
            <div className='hidden md:flex md:justify-center md:items-center' >
                <Image src='/login1.svg' alt='Login SVG' height={500} width={500} />
            </div>
        </div>

    </div>
  )
}

export default Login