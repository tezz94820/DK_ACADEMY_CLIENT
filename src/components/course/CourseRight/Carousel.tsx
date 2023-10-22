import React, { useState } from 'react'
import { courseCarouselImages } from '../../../../data/courseCarouselImages'
import Image from 'next/image';
import { motion } from 'framer-motion'

const totalSlides = 4;

function Carousel() {
  
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((slide + 1)%totalSlides);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? totalSlides - 1 : slide - 1);
  };

  return (
    <div className=' h-24 w-full flex relative'>
      {/* left arrow */}
      <Image src='/arrow_left.svg' alt='left arrow' width={50} height={50} 
        className='absolute left-0 top-1/4' 
        onClick={prevSlide}
      />
      {/* images */}
      {
        courseCarouselImages.map( (item,idx) => (
          <div key={item.id} className={`h-24 w-full ${ slide==idx ? 'block' : 'hidden'}`} >
            <Image className='h-full w-full rounded-lg' src={item.href} alt={item.alt} width={500} height={96} />
          </div>
        )) 
      }
      {/* right arrow */}
      <Image src='/arrow_right.svg' alt='right arrow' width={50} height={50} 
        className='absolute right-0 top-1/4'
        onClick={nextSlide}
      />
      
      {/* Indicators */}
      <span className="h-5 w-20 flex justify-evenly items-center absolute bottom-0 left-[46%]">
        {courseCarouselImages.map((_, idx) => (
          <button
            key={idx}
            className={`rounded-full h-2 w-2 ${slide == idx ? 'bg-black' : 'bg-white'}`}
            onClick={() => setSlide(idx)}
        ></button>
        ))}
      </span>
    </div>
  )
}

export default Carousel