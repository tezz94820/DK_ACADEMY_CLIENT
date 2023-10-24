import React, { useEffect, useState } from 'react'
import { courseCarouselImages } from '../../../../../data/courseCarouselImages'
import Image from 'next/image';
import { motion } from 'framer-motion'

const totalSlides = 4;

function Carousel() {
  
  const [slide, setSlide] = useState(0);

  useEffect( () => {
    const interval = setInterval( () => {
      setSlide(prevSlide => (prevSlide+1)%totalSlides);
    },8000);
    return () => clearInterval(interval);
  }, [])

  const nextSlide = () => {
    setSlide((slide + 1)%totalSlides);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? totalSlides - 1 : slide - 1);
  };

  return (
    <div className='hover:animate-pulse h-32 w-full flex relative shadow-lg shadow-indigo-500/50 mt-3 md:mt-5 '>
      {/* left arrow */}
      <Image src='/arrow_left.svg' alt='left arrow' width={50} height={50} 
        className='absolute left-0 top-1/3 cursor-pointer rounded-lg' 
        onClick={prevSlide}
      />
      {/* images */}
      {
        courseCarouselImages.map( (item,idx) => (
          <div key={item.id} className={`h-full w-full ${ slide===idx ? '' : 'hidden'}`} >
            <Image className='h-full w-full rounded-lg' src={item.href} alt={item.alt} width={500} height={96} />
          </div>
        )) 
      }
      {/* right arrow */}
      <Image src='/arrow_right.svg' alt='right arrow' width={50} height={50} 
        className='absolute right-0 top-1/3 cursor-pointer'
        onClick={nextSlide}
      />
      
      {/* Indicators */}
      <div className="h-5 w-full  flex justify-center items-center absolute bottom-0">
        <div className='flex w-20 justify-evenly items-center '>
          {courseCarouselImages.map((_, idx) => (
            <button
              key={idx}
              className={`rounded-full h-2 w-2 ${slide == idx ? 'bg-black' : 'bg-white'}`}
              onClick={() => setSlide(idx)}
          ></button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel