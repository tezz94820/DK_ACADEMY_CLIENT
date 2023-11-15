import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Pdf() { 
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className='bg-blue-300 min-w-screen'>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document 
        file={'/Circle_question2.pdf'}
        onLoadSuccess={onDocumentLoadSuccess} 
        error='NO PDF FOUND'
      >

        <Page
          pageNumber={1} 
          canvasBackground='#f68fff' 
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={500}
          scale={2}
        />
        <Page
          pageNumber={2} 
          canvasBackground='#f68fff' 
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={500}
          scale={2}
        />
      </Document>
    </div>
  );
}


export default Pdf