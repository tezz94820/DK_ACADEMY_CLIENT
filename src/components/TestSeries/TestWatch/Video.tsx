import React, { useEffect, useRef } from 'react'
import { toast } from 'react-toastify';

const Video = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    // start camera and audio
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error: any) {
                const errorMessage = error.message || "An error occurred while accessing the camera and microphone.";
                toast.error(errorMessage);
            }
        }
        startCamera();

        // Cleanup function to close camera and audio settings on component unmount
        return () => {
            const stopCamera = () => {
                const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
                if (tracks) {
                    tracks.forEach((track) => track.stop());
                }
            };

            stopCamera();
        };

    }, [])

    return (
        <>
            <video ref={videoRef} autoPlay playsInline height={100} width={100} className='h-full w-auto rounded border border-black shadow shadow-black' muted={true} />
        </>
    )
}

export default Video