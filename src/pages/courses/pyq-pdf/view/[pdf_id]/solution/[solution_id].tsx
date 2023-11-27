import React from 'react'
import HeaderLayout from '@/components/Header/HeaderLayout'
import CourseLayout from '@/components/course/CourseLayout'
import dynamic from 'next/dynamic';
import { pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DynamicPDF = dynamic(() => import('../../../../../../components/Solution'), {
    ssr: false,
})


const Solution = () => {
    return (
        <HeaderLayout>
            <CourseLayout>
                <div className={`print-hidden scrollbar w-max h-full overflow-x-scroll md:overflow-y-scroll md:w-5/6 `}>
                    <DynamicPDF />
                </div>
            </CourseLayout>
        </HeaderLayout>
      )
}

export default Solution