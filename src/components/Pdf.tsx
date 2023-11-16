import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Pdf() { 
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className='flex flex-col bg-blue-300 w-full rounded'>
      <div className='fixed bg-blue-300 z-10'>
        Page {pageNumber} of {numPages}
      <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>&nbsp;
      <button onClick={() => setPageNumber((pageNumber + 1))}>Next</button>
      </div>
      <Document 
        file={'/Circle_question2_protected.pdf'}
        onLoadSuccess={onDocumentLoadSuccess} 
        error='NO PDF FOUND'
        options={{password: 'Tt@123999'}}
      >
        <Page
          pageNumber={pageNumber} 
          canvasBackground='#f68fff' 
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={520}
          scale={2}
        />
      </Document>
    </div>
  );
}


export default Pdf