import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf';
import dynamic from 'next/dynamic';
import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DynamicPDF = dynamic(() => import('../../../../components/Pdf'), {
  ssr: false,
})


const View = () => {

  const [pyqFreeCourseLink, setPyqFreeCourseLink] = useState('');
  const router = useRouter();
  const pdfId = router.query.pdf_id;


  useEffect(() => {
    const getPyqFreeCourseLink = async () => {
      if(!pdfId) return;
      try {
        const res = await axiosClient.get(`pyq-pdf/access-free-pdf/${pdfId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        setPyqFreeCourseLink(res.data.data.presignedUrl.free_pdf);
      } catch (error: any) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    getPyqFreeCourseLink();
  }, [router]);


  



  return (
    <HeaderLayout>
      <CourseLayout>
        <div className={`print-hidden scrollbar w-max h-full overflow-x-scroll md:overflow-y-scroll md:w-5/6 `}>
          <DynamicPDF courseFileLink={pyqFreeCourseLink} isFree={true}/>
        </div>
      </CourseLayout>
    </HeaderLayout>
  )
}

export default View