import axiosClient from '@/axios/axiosClient';
import HeaderLayout from '@/components/Header/HeaderLayout'
import React, { FormEvent, useRef, useState } from 'react'
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

type ModalProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function Modal({ setIsModalOpen }: ModalProps) {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        class: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const messageRef = useRef();

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.class) {
            setResponseMessage('Please fill all the required fields.');
            setFormSuccess(false);
            setLoading(false);
            return;
        }


        try {
            const response = await axiosClient.post(`contact-form/create-contact-form`, formData);
            const data = await response.data;
            if (response.status === 200) {
                setResponseMessage('Form submitted successfully!');
                setFormSuccess(true);
                setFormData({ first_name: '', last_name: '', email: '', phone: '', class: '', message: '' });
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 2000);
            } else {
                setResponseMessage(data.message || 'Something went wrong!');
                setFormSuccess(false);
            }
        } catch (error) {
            setResponseMessage('Failed to submit form.');
            setFormSuccess(false);
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex md:flex-row flex-col justify-evenly items-center z-50 px-6 gap-2">
            <div className='absolute h-full w-full -z-10' onClick={() => setIsModalOpen(false)} />

            <Image src='/homepage/social_media/call.png' onClick={() => window.open(`tel:+919325987875`)} className=" hidden md:block h-10 w-10 md:h-12 md:w-12 rounded-lg p-1 cursor-pointer hover:border-2 border-blue-800 shadow-md shadow-white" alt="Social Media" width={75} height={100} />
            
            <div className='relative flex flex-row w-full h-fit lg:w-[33%]'>
                <div className="bg-white p-3 w-full overflow-y-scroll relative h-[calc(100vh-4.6rem)] border-4 border-blue-800 rounded-3xl shadow-md md:shadow-xl shadow-white">

                    <div className='flex flex-col '>
                        <div className="flex items-center mx-auto">
                            <Image src="/logo.png" className="h-10 w-auto md:h-14 mr-3" alt="DK Academy Logo" width={75} height={100} />
                            <span className="self-center text-black text-xl lg:text-2xl font-semibold whitespace-nowrap" >DK Academy</span>
                        </div>
                        <h2 className='font-bold text-2xl mt-4 text-blue-800 px-2 '>Enquire Form</h2>
                    </div>

                    <form className="md:col-span-8 mt-4 px-2" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="grid-first-name">
                                First Name *
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-first-name" type="text" placeholder="Abhay" required={true} name="first_name" value={formData.first_name} onChange={handleChange} />

                        </div>

                        <div className="w-full mt-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="grid-last-name">
                                Last Name *
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" type="text" placeholder="Kumar" required={true} name="last_name" value={formData.last_name} onChange={handleChange} />
                        </div>

                        <div className="w-full mt-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="grid-email">
                                Email Address *
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-email" type="email" placeholder="********@*****.**" required name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="w-full mt-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="grid-phone">
                                Phone Number *
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                id="grid-phone"
                                type="tel"
                                pattern='[0-9]{10}'
                                placeholder="797 *** **21"
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="w-full mt-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="grid-class">
                                Class *
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-class" type="text" placeholder="11th" required name="class" value={formData.class} onChange={handleChange} />
                        </div>

                        <div className="w-full mt-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="grid-message">
                                Your Message
                            </label>
                            <textarea rows={10} id="grid-message"
                                placeholder='Your Message'
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name='message'
                                value={formData.message} onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="w-full flex items-center justify-center my-4">
                            {responseMessage && (
                                <motion.div
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-md border ${formSuccess
                                        ? "text-green-700 bg-green-100 border-green-300"
                                        : "text-red-700 bg-red-100 border-red-300"
                                        }`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    {formSuccess ? (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 150 }}
                                        >
                                            <CheckCircle className="text-green-500 w-5 h-5" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 150 }}
                                        >
                                            <XCircle className="text-red-500 w-5 h-5" />
                                        </motion.span>
                                    )}
                                    <motion.p
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        {responseMessage}
                                    </motion.p>
                                </motion.div>
                            )}
                        </div>

                        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-center w-full px-3">
                            <button
                                className={`shadow  ${loading ? "cursor-not-allowed bg-indigo-400" : "bg-indigo-600"} hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Sending Message ... ' : 'Send Message'}
                            </button>
                        </div>


                    </form>
                </div>

                <Image src="/cancel.svg" onClick={() => setIsModalOpen(false)} className='absolute top-2 left-2 cursor-pointer z-50 bg-white rounded-full' alt='close modal' height={30} width={30} />
            
            </div>


            <div className='flex flex-row gap-4'>
                <Image src='/homepage/social_media/call.png' onClick={() => window.open(`tel:+919325987875`)} className="md:hidden h-10 w-10 md:h-12 md:w-12 mr-3 rounded-lg p-1 cursor-pointer hover:border-2 border-blue-800 shadow-md shadow-white" alt="Social Media" width={75} height={100} />
                <Image src='/homepage/social_media/whatsapp.png' onClick={() => window.open('https://wa.me/+919325987875?text=Hello%20DK%20Academy%20,%20I%20want%20to%20join%20the%20Academy.', '_blank')} className="h-10 w-10 md:h-12 md:w-12 mr-3 rounded-lg p-1 cursor-pointer hover:border-2 border-blue-800 shadow-md shadow-white" alt="Social Media" width={75} height={100} />
            </div>

        </div >

    )
}

export default Modal