import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface CoursalProps {
    images: string[];
}

const Coursal = ({images}: CoursalProps) => {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect( () => {
        const interval = setInterval( () => {
          handleNextImage();
        },5000);
    
        return () => clearInterval(interval);
      },[])

    const handleNextImage = () => {
        setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1);
    }

    return (
        <div className='w-full h-full'>
            <div className='h-[94%] w-full mx-auto rounded-xl overflow-hidden relative'>
                {/* wallpaper image */}
                <div className='h-full w-full'>
                    <Image src={images[currentImage]} className='h-full w-full' height="800" width="1200" alt="DkAcademy excellent results acheivements 2024,2023" />
                </div>
            </div>
            <div className='h-[6%] w-full flex justify-center items-center '>
                <div className='flex mx-auto px-2 py-1 rounded-lg '>
                    {
                        images.map((image, index) => (
                            <div key={index} className={`w-16 h-2.5 mx-1 rounded-lg cursor-pointer ${currentImage === index ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-blue-200'}`} 
                                onClick={() => setCurrentImage(index)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Coursal