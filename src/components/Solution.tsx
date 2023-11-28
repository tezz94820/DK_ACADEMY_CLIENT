import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React,{ useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf';
import { toast } from 'react-toastify';
import Loader from './Loading/Loader';



const Solution = () => {

    const router = useRouter();
    const pdfId = router.query.pdf_id;
    const question = router.query.solution_id
    console.log(pdfId,question);
    
    //states
    const [fileLink, setFileLink] = useState('');
    const [numPages, setNumPages] = useState<number>(1);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect( () => {
        const getFileLink = async () => {
            try {
                if(!localStorage.getItem('token')){
                    router.push('/courses/require-auth');
                    return;
                }
                const res = await axiosClient.get(`/pyq-pdf/individual-solution?pdf_id=${pdfId}&question=${question}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                setFileLink(res.data.data.presignedUrl);
            } catch (error:any) {
                const errorMessage = error.response.data.message || "An error occurred";
                toast.error(errorMessage);
            }
        }
        if(pdfId && question){
            getFileLink();
        }
    },[router])

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
    };

    const closeHandler = () => {
      window.close();
    }


  return (
    <div className='flex flex-col w-full rounded bg-gradient-to-r mt-2' onContextMenu={disableRightClick}>
      <Document
        file={fileLink}
        onLoadSuccess={onDocumentLoadSuccess}
        error='NO PDF FOUND'
        loading={<div className=' '><Loader /></div>}
        // options={{password: 'Tt@123999'}}
      >
        {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              // canvasBackground='#f68fff'
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={520}
              scale={windowWidth >= 768 ? 2 : 1}

            />
        ))}
      </Document>

      {/* back button */}
      <div className='fixed right-2 z-10'>
        <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-red-700 hover:bg-red-300' onClick={closeHandler}>Close</button>
      </div>

    </div>
  )
}

export default Solution