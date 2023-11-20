import { useState,useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';



function Pdf() { 
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [fileLink, setFileLink] = useState('');
  let router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const getFileLink = async () => {
      try {
        const res = await axiosClient.get(`/pyq-pdf/pdf?pdf_id=${router.query.pdf_id}`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
        setFileLink(res.data.data.presignedUrl);
      } catch (error:any) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
      }
    }
    getFileLink();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const closeHandler = () => {
    router.back();
  }

  const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col w-full rounded bg-gradient-to-r mt-2' onContextMenu={disableRightClick}>
      <Document 
        file={fileLink}
        onLoadSuccess={onDocumentLoadSuccess}
        error='NO PDF FOUND'
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
        <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-blue-600 hover:border-red-700 ' onClick={closeHandler}>Close</button>
      </div>

    </div>
  );
}


export default Pdf