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

  const [error, setError] = useState<boolean>(false);

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

  const errorHandler = () => {
    setError(true);
    toast.error("Video Cannot be Fetched");

  }

  return (
    <div onContextMenu={disableRightClick} className='flex justify-center items-center h-fit'>
      <div className='rounded-3xl p-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500'>
        {
          error 
          ? 
          <div className='text-white font-bold'>No Video Found</div> 
          :
          <div>
            <ReactPlayer 
            url={videoLink} 
            controls
            config={playerConfig}
            onError={errorHandler} 
            className="mt-0"
            />
          </div>
        }
      </div>
      
    </div>
  )
}

export default VideoPlayer