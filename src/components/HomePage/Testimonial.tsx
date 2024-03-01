import Image from 'next/image'
import React from 'react'

type TestimonialProps = {
    profilePhoto:string,
    parent?:boolean,
    name: string,
    videoPoster?:string,
    video:string,
    textContent:string
}
const Testimonial = ({profilePhoto,parent,name,video,videoPoster,textContent}:TestimonialProps) => {
  return (
    <div className='h-max w-full md:w-[30%] p-4 border-2 border-blue-800 rounded-2xl '>
        <div className='flex flex-row items-center gap-4'>
            <Image className="h-16 w-16 rounded-full border-2 border-orange-400" src={profilePhoto} alt="student testimonial profile photo" height="300" width="300" />
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold'>{name}</h3>
                <h3 className='text-base font-semibold'>{parent? 'Parent' : 'Student'}</h3>
            </div>
        </div>
        <video controls className='h-36 aspect-auto rounded-xl mt-4 mx-auto' poster={videoPoster} >
          <source src={video} type="video/mp4" />
        </video>
        <p className='mt-4 text-justify text-base font-serif'>{textContent}</p>

    </div>
  )
}

export default Testimonial