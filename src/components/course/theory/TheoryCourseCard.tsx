import axiosClient from '@/axios/axiosClient';
import { showAuthorizationErrorElseDefaultError } from '@/utils/authorizationError';
import { handleBuyProduct } from '@/utils/razorpay';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react';

type TheoryCourseCardPropsType = {
    theoryCourse: {
        _id: string,
        title: string,
        new_launch: boolean,
        thumbnail: string,
        class_name: string,
        is_purchased: boolean,
        old_price: string,
        price: string,
        discount: string;
    }
    showFreeContent?: boolean
}

const TheoryCourseCard = ({ theoryCourse, showFreeContent = true }: TheoryCourseCardPropsType) => {

  const router = useRouter();

  const redirectWatsapp = (id:string, title: string): void => {
    const message = `Hey there! I just discovered an amazing educational video course on www.dkacademy.com . It's title is ${title}. I've been finding it super insightful, and I thought you might be interested too! Check it out here: https://www.dkacademy.co.in/courses/theory/explore?pdf_id=${id} #LearningTogether`;
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const handleNavigateToDescription = () => {
    router.push(`/courses/theory/explore?course_id=${theoryCourse._id}`);
  }

  const handleFreeContent = async (id:string) => {
    try {
      await axiosClient.get(`theory/free-lectures/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });      
      router.push(`theory/explore/view-free-course?course_id=${id}`)
    } catch (error:any) {
      showAuthorizationErrorElseDefaultError(error);
    }
  }

  return (
    <>
      <div className='border-gray-200 border-2 rounded shadow-lg shadow-blue-800/50 p-2 hover:scale-105 hover:cursor-pointer'>
        {/* top */}
        <div className='flex h-12 w-full pt-1' onClick={handleNavigateToDescription}>
          <h3 className='text-sm w-3/4 font-bold'>{theoryCourse.title}</h3>
          {
            theoryCourse.new_launch && <p className='bg-yellow-300 w-8 text-center h-5 rounded-md p-0.5 text-xs ml-4 '>New</p>
          }
          <Image src='/watsapp.svg' height={10} width={10} alt="watsapp logo"
            className='h-4 w-4 ml-2 mt-0.5 cursor-pointer animate-pulse active:animate-ping'
            onClick={() => redirectWatsapp(theoryCourse._id, theoryCourse.title)}
          />
        </div>
        {/* thumbnail */}
        <div className='w-full h-44' onClick={handleNavigateToDescription}>
          <img src={theoryCourse.thumbnail} height={300} width={300} alt="thumbnail"
            className='rounded-lg w-full h-full'
          />
        </div>
        {/* Description */}
        <div className='flex flex-col' onClick={handleNavigateToDescription}>
          <div className='flex h-6 w-full'>
            <Image src='/student.svg' width={3} height={3} alt='Student icon'
              className='w-4 h-4 mt-2.5'
            />
            <p className='mt-2 ml-2 text-sm'>For {theoryCourse.class_name}</p>
          </div>
          <div className='flex h-auto w-full'>
            <Image src='/clock.svg' width={3} height={3} alt='Student icon'
              className='w-4 h-4 mt-2.5'
            />
            <p className='mt-2 ml-2 text-sm'> <span className='text-blue-500 font-semibold'>Mains + Advance</span></p>
          </div>
        </div>
        {/* separator */}
        <hr className='border border-purple-700 my-1' />
        {
          theoryCourse.is_purchased ?
            <div className='flex flex-col'>
              <div className='flex justify-between' onClick={handleNavigateToDescription}>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <p className='text-base font-bold text-violet-900'>Purchased</p>
                  </div>
                  <p className='text-xs'> &#40;For full Course&#41; </p>
                </div>
              </div>
              {/* buttons */}
              <div className='mt-3 font-semibold '>
                <button
                  className='bg-green-500 text-white w-full hover:bg-green-600 rounded-lg py-1.5 text-base font-bold text-center align-middle tracking-widest'
                  onClick={ () => router.push(`theory/view/${theoryCourse._id}`)}
                >
                  Watch Lectures
                </button>
              </div>
            </div>
            :
            <div className='flex flex-col'>
              <div className='flex justify-between' onClick={handleNavigateToDescription}>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <p className='text-base font-bold text-violet-900'>&#x20B9;{theoryCourse.price}</p>
                    <p className='text-sm line-through text-gray-600 ml-1 mt-0.5'>{theoryCourse.old_price}</p>
                  </div>
                  <p className='text-xs'> &#40;For full Course&#41; </p>
                </div>
                <div className='h-fit p-1 my-auto rounded-lg bg-green-300 flex items-center '>
                  <Image src='/discount.svg' width={10} height={10} alt='Discount Icon'
                    className='w-4 h-4 mr-1 align-middle'
                  />
                  <p className='text-xs align-middle'> Discount of {theoryCourse.discount}% applied</p>
                </div>
              </div>
              {/* buttons */}
              {
                showFreeContent ?
                  <div className='grid grid-cols-2 gap-5 justify-between mt-3 font-semibold'>
                    <button className='bg-blue-200 text-blue-800 hover:bg-blue-300 rounded-lg  py-1.5 text-base font-bold text-center align-middle tracking-widest' onClick={() => handleFreeContent(theoryCourse._id)}>Free Content</button>
                    <button className='bg-blue-800 text-white hover:bg-blue-600 rounded-lg py-1.5 text-base font-bold text-center align-middle tracking-widest' onClick={() => handleBuyProduct('theory', theoryCourse._id)}>Buy Now</button>
                  </div>
                  :
                  <div className='mt-3 font-semibold'>
                    <button className='w-full bg-blue-800 text-white hover:bg-blue-600 rounded-lg py-1.5 text-base font-bold text-center align-middle tracking-widest' onClick={() => handleBuyProduct('theory', theoryCourse._id)}>Buy Now</button>
                  </div>
              }
            </div>
        }
      </div>
    </>
  )
}

export default TheoryCourseCard