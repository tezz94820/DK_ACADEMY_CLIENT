import axiosClient from '@/axios/axiosClient';
import HeaderLayout from '@/components/Header/HeaderLayout'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";


function ContactUs() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
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
        setFormData({ first_name: '', last_name: '', email: '', phone: '', message: '' });
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
    <HeaderLayout>
      <div className=" mx-auto p-2 md:p-5 scrollbar w-full overflow-y-scroll relative h-[calc(100vh-4.6rem)] mt-4.6">
        <div className="grid grid-cols-1 md:grid-cols-12 border">
          <div className="bg-gray-900 md:col-span-4 p-10 text-white">
            <p className="mt-4 text-sm leading-7 font-regular uppercase">
              Contact
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
              Get In <span className="text-indigo-600">Touch</span>
            </h3>
            <p className="mt-4 leading-7 text-gray-200">
              &quot;Success in JEE is not just about hard work, but about the right guidance and perseverance. The path to IIT begins with a single step—reach out today and let&apos;s shape your future together!&quot;
            </p>
            <p className='text-right mt-2 font-semibold'> --- Dharmendra Kumar</p>

            <div className="flex items-center mt-5">
              <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" version="1.1" id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 60.002 60.002" >
                <g>
                  <path d="M59.002,37.992c-3.69,0-6.693-3.003-6.693-6.693c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,4.794,3.899,8.693,8.693,8.693
		c0.553,0,1-0.447,1-1S59.554,37.992,59.002,37.992z">
                  </path>
                  <path d="M58.256,35.65c0.553,0,1-0.447,1-1s-0.447-1-1-1c-0.886,0-1.605-0.72-1.605-1.605c0-0.553-0.447-1-1-1s-1,0.447-1,1
		C54.65,34.033,56.267,35.65,58.256,35.65z">
                  </path>
                  <path d="M20.002,2.992c3.691,0,6.693,3.003,6.693,6.693c0,0.553,0.448,1,1,1s1-0.447,1-1c0-4.794-3.9-8.693-8.693-8.693
		c-0.552,0-1,0.447-1,1S19.449,2.992,20.002,2.992z">
                  </path>
                  <path d="M19.748,6.334c0,0.553,0.448,1,1,1c0.885,0,1.604,0.72,1.604,1.605c0,0.553,0.448,1,1,1s1-0.447,1-1
		c0-1.988-1.617-3.605-3.604-3.605C20.196,5.334,19.748,5.781,19.748,6.334z">
                  </path>
                  <path d="M44.076,37.889c-1.276-0.728-2.597-0.958-3.721-0.646c-0.844,0.234-1.532,0.768-1.996,1.546
		c-1.02,1.22-2.286,2.646-2.592,2.867c-2.367,1.604-4.25,1.415-6.294-0.629L17.987,29.542c-2.045-2.045-2.233-3.928-0.631-6.291
		c0.224-0.31,1.65-1.575,2.87-2.596c0.778-0.464,1.312-1.152,1.546-1.996c0.311-1.123,0.082-2.444-0.652-3.731
		c-0.173-0.296-4.291-7.27-8.085-9.277c-1.926-1.019-4.255-0.669-5.796,0.872L4.7,9.059c-4.014,4.014-5.467,8.563-4.321,13.52
		c0.956,4.132,3.742,8.529,8.282,13.068l14.705,14.706c5.762,5.762,11.258,8.656,16.298,8.656c3.701,0,7.157-1.562,10.291-4.695
		l2.537-2.537c1.541-1.541,1.892-3.87,0.872-5.796C51.356,42.186,44.383,38.069,44.076,37.889z M51.078,50.363L48.541,52.9
		c-6.569,6.567-14.563,5.235-23.76-3.961L10.075,34.233c-4.271-4.271-6.877-8.344-7.747-12.104
		c-0.995-4.301,0.244-8.112,3.786-11.655l2.537-2.537c0.567-0.566,1.313-0.862,2.07-0.862c0.467,0,0.939,0.112,1.376,0.344
		c3.293,1.743,7.256,8.454,7.29,8.511c0.449,0.787,0.62,1.608,0.457,2.196c-0.1,0.36-0.324,0.634-0.684,0.836l-0.15,0.104
		c-0.853,0.712-2.883,2.434-3.308,3.061c-0.612,0.904-1.018,1.792-1.231,2.665c-0.711-1.418-1.286-3.06-1.475-4.881
		c-0.057-0.548-0.549-0.935-1.098-0.892c-0.549,0.058-0.949,0.549-0.892,1.099c0.722,6.953,6.129,11.479,6.359,11.668
		c0.025,0.02,0.054,0.028,0.08,0.045l10.613,10.613c0.045,0.045,0.092,0.085,0.137,0.129c0.035,0.051,0.058,0.108,0.104,0.154
		c0.189,0.187,4.704,4.567,11.599,5.283c0.035,0.003,0.07,0.005,0.104,0.005c0.506,0,0.94-0.383,0.994-0.896
		c0.057-0.55-0.342-1.041-0.892-1.099c-2.114-0.219-3.987-0.839-5.548-1.558c0.765-0.23,1.543-0.612,2.332-1.146
		c0.628-0.426,2.35-2.455,3.061-3.308l0.104-0.151c0.202-0.359,0.476-0.583,0.836-0.684c0.588-0.159,1.409,0.008,2.186,0.45
		c0.067,0.04,6.778,4.003,8.521,7.296C52.202,48.062,51.994,49.447,51.078,50.363z">
                  </path>
                </g>
              </svg>
              <span className="text-sm">+91 - 932 598 7875</span>
            </div>

            <div className="flex items-center mt-5">
              <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" version="1.1" id="Capa_1"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 300.988 300.988"
              >
                <g>
                  <g>
                    <path d="M150.494,0.001C67.511,0.001,0,67.512,0,150.495s67.511,150.493,150.494,150.493s150.494-67.511,150.494-150.493
                S233.476,0.001,150.494,0.001z M150.494,285.987C75.782,285.987,15,225.206,15,150.495S75.782,15.001,150.494,15.001
                s135.494,60.782,135.494,135.493S225.205,285.987,150.494,285.987z">
                    </path>
                    <polygon
                      points="142.994,142.995 83.148,142.995 83.148,157.995 157.994,157.995 157.994,43.883 142.994,43.883 		">
                    </polygon>
                  </g>
                </g>
              </svg>
              <span className="text-sm">24/7</span>
            </div>

          </div>
          <form className="md:col-span-8 p-10">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name">
                  First Name *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-first-name" type="text" placeholder="Abhay" required name="first_name" value={formData.first_name} onChange={handleChange} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name">
                  Last Name *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name" type="text" placeholder="Kumar" required name="last_name" value={formData.last_name} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email">
                  Email Address *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email" type="email" placeholder="********@*****.**" required name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-phone">
                  Phone Number *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  id="grid-phone"
                  type="number"
                  placeholder="797 *** **21"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
              <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full px-3">
                <div className="md:flex md:items-center">
                  <label className="block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox" />
                    <span className="text-sm">
                      Send me your newsletter!
                    </span>
                  </label>
                </div>
                <button
                  className={`shadow  ${loading ? "cursor-not-allowed bg-indigo-400" : "bg-indigo-600"} hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded`}
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'Sending Message ... ' : 'Send Message'}
                </button>
              </div>

              <div className="w-full flex items-center justify-center mt-4">
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
              </div>;

            </div>

          </form>

        </div>
      </div>
    </HeaderLayout>
  )
}

export default ContactUs