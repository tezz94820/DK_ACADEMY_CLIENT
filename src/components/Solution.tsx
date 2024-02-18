import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React,{ useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf';
import { toast } from 'react-toastify';
import Loader from './Loading/Loader';


type SolutionProps = {
  pdfLink: string;
}
const Solution = ({pdfLink}:SolutionProps) => {

  console.log(pdfLink);

    //states
    const [numPages, setNumPages] = useState<number>(1);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
    };


  return (
    <div className='flex flex-col w-full rounded mt-4' onContextMenu={disableRightClick}>
      <Document
        file={pdfLink}
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
    </div>
  )
}

export default Solution