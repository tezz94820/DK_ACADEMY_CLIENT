import React, { useEffect, useRef } from 'react'

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
                console.error('Error accessing camera and microphone:', error);
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
            <video ref={videoRef} autoPlay playsInline height={100} width={100} className='rounded border border-black shadow shadow-black h-[95%] w-auto my-auto' muted={true} />
        </>
    )
}

export default Video