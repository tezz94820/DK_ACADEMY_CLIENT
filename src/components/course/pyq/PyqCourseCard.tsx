import axiosClient from '@/axios/axiosClient';
import { loadRazorpayScript } from '@/utils/razorpay';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

type PyqCourseCardPropsType = {
  pyqCourse: {
    _id: string,
    title: string,
    new_launch: boolean,
    thumbnail: string,
    class_name: string,
    is_purchased: boolean,
    old_price: string,
    price: string,
    exam_type: string,
    discount: string;
  }
  showExplore?: boolean
}

const PyqCourseCard = ({ pyqCourse, showExplore = true }: PyqCourseCardPropsType) => {

  const router = useRouter();

  const redirectWatsapp = (id:string, title: string): void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: https://www.dkacademy.co.in/courses/pyq/explore?pdf_id=${id} #LearningTogether`;
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }


  const handleBuyNow = async () => {

    const payload = {
      type: 'pyq',
      product_id: pyqCourse._id
    }

    try {
      //send the course details to backend
      const response = await axiosClient.post('payment/create-order', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      })

      const options = response.data.data.options;
      //load the razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error("Error in Loding Payment Section.");
        return;
      }

      // done to avoid typescript error
      const _window = window as any;
      const paymentObject = new _window.Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "An error occurred. Please try again later.";
      toast.error(errorMessage);
    }

  }


  return (
    <>
      <div className='border-gray-200 border-2 rounded shadow-lg shadow-blue-800/50 p-2'>
        {/* top */}
        <div className='flex h-12 w-full pt-1'>
          <h3 className='text-sm w-3/4 font-bold'>{pyqCourse.title}</h3>
          {
            pyqCourse.new_launch && <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
          }
          <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo"
            className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping'
            onClick={() => redirectWatsapp(pyqCourse._id, pyqCourse.title)}
          />
        </div>
        {/* thumbnail */}
        <div className='w-full h-44'>
          <img src={pyqCourse.thumbnail} height={300} width={300} alt="thumbnail"
            className='rounded-lg w-full h-full'
          />
        </div>
        {/* Description */}
        <div className='flex flex-col'>
          <div className='flex h-6 w-full'>
            <Image src='/student.svg' width={3} height={3} alt='Student icon'
              className='w-4 h-4 mt-2.5'
            />
            <p className='mt-2 ml-2 text-sm'>For {pyqCourse.class_name}</p>
          </div>
          <div className='flex h-auto w-full'>
            <Image src='/clock.svg' width={3} height={3} alt='Student icon'
              className='w-4 h-4 mt-2.5'
            />
            <p className='mt-2 ml-2 text-sm'>Questions from <span className='text-blue-500 font-semibold'>2000-2023</span></p>
          </div>
        </div>
        {/* separator */}
        <hr className='border border-purple-700 my-1' />
        {
          pyqCourse.is_purchased ?
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <p className='text-base font-bold text-violet-900'>Free</p>
                    <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{pyqCourse.old_price}</p>
                  </div>
                  <p className='text-xs'> &#40;For full Course&#41; </p>
                </div>
                <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                  <Image src='/discount.svg' width={10} height={10} alt='Discount Icon'
                    className='w-4 h-4 mr-1 align-middle'
                  />
                  <p className='text-xs align-middle'> Discount of 100% applied</p>
                </div>
              </div>
              {/* buttons */}
              <div className='mt-3 font-semibold '>
                <button
                  className='bg-green-500 text-white w-full hover:bg-blue-600 rounded-lg py-1.5 text-base font-bold text-center align-middle tracking-widest'
                  onClick={() => router.push(`pyq/view/${pyqCourse._id}?exam_type=${pyqCourse.exam_type}`)}
                >
                  Solve Questions
                </button>
              </div>
            </div>
            :
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <p className='text-base font-bold text-violet-900'>&#x20B9;{pyqCourse.price}</p>
                    <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{pyqCourse.old_price}</p>
                  </div>
                  <p className='text-xs'> &#40;For full Course&#41; </p>
                </div>
                <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                  <Image src='/discount.svg' width={10} height={10} alt='Discount Icon'
                    className='w-4 h-4 mr-1 align-middle'
                  />
                  <p className='text-xs align-middle'> Discount of {pyqCourse.discount}% applied</p>
                </div>
              </div>
              {/* buttons */}
              {
                showExplore ?
                  <div className='grid grid-cols-2 gap-5 justify-between mt-3 font-semibold'>
                    <button className='bg-blue-200 text-blue-800 hover:bg-blue-300 rounded-lg  py-1.5 text-base font-bold text-center align-middle tracking-widest' onClick={() => router.push(`pyq/explore?pdf_id=${pyqCourse._id}`)}>Free Content</button>
                    <button className='bg-blue-800 text-white hover:bg-blue-600 rounded-lg py-1.5 text-base font-bold text-center align-middle tracking-widest' onClick={handleBuyNow}>Buy Now</button>
                  </div>
                  :
                  <div className='mt-3 font-semibold'>
                    <button className='w-full bg-blue-800 text-white hover:bg-blue-600 rounded-lg py-1.5 text-base font-bold text-center align-middle tracking-widest' onClick={handleBuyNow}>Buy Now</button>
                  </div>
              }
            </div>
        }
      </div>
    </>
  )
}

export default PyqCourseCard