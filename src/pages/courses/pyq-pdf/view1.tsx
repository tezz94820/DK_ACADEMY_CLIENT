import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import React from 'react'
import { pdfjs } from 'react-pdf';
import dynamic from 'next/dynamic'


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

 
const DynamicPDF = dynamic(() => import('../../../components/Pdf'), {
  ssr: false,
})

const view = () => {
  return (
    <HeaderLayout>
        <CourseLayout>
            <div className={`scrollbar w-max h-full overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll md:w-5/6 `}>
                <DynamicPDF />
            </div>
        </CourseLayout>
    </HeaderLayout>
  )
}

export default view