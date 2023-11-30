import axiosClient from '@/axios/axiosClient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';

type VideoPlayerProps = {
  videoLink:string;
}

const VideoPlayer = ({videoLink}:VideoPlayerProps) => {
  console.log(videoLink);

  const playerConfig = {
    file: {
      attributes: {
        controlsList: 'nodownload', // Disable download button
      },
    },
  };

  const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
};

  return (
    <div onContextMenu={disableRightClick} className='flex justify-center items-center h-fit'>
      <div className='rounded-3xl p-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500'>
        {/* <Image src="/logo.png" alt="logo" height={100} width={100} className='w-10 h-10 bg-red-600'/> */}
        {/* <div className='bg-red-400'>Hello</div> */}
        <ReactPlayer 
          url={videoLink} 
          controls
          config={playerConfig} 
          classname="mt-0"
        />
      </div>
      
    </div>
  )
}

export default VideoPlayer