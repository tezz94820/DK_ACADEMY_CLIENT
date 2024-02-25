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
    toast.error("No Video Found");

  }

  return (
    <div onContextMenu={disableRightClick} className='flex justify-center items-center my-2 mx-2'>
      <div className='rounded-2xl p-2  bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600'>
        {
          error 
          ? 
          <div className='text-white font-bold'>No Video Found</div> 
          :
          <div >
            <ReactPlayer 
            width={"100%"}
            height={"100%"}
            url={videoLink} 
            controls
            config={playerConfig}
            onError={errorHandler}
            
            />
          </div>
        }
      </div>
    </div>
  )
}

export default VideoPlayer