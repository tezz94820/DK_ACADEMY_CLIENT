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
        file="https://s3.ap-south-1.amazonaws.com/dkacademy.store/pyq-pdf/65540b2ba79f3fc5d391b01b/Circle_question.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCmFwLXNvdXRoLTEiSDBGAiEAwyKVPZIGzNLOzQFQ88bJ9fNubwNYimGpl2Ibr8jRpzACIQDtlYD2355uGvSRTucQZwvKMtkdtZqwXTLEwnqbR76oqyrkAgh9EAIaDDQ5MDI0OTk3MzkzOSIMjUoqokX8XEvAE3rMKsECczOyE%2BKoAHJeHpyl6Ze%2BhMRHJ%2BqaEPPiy7T14apnzPczmpFXkurvNwlVthfe2RS8gynPJiDP0kj%2Fw8xTFL4Lj1J4MDcL%2FgsfkLNE6tM5m5qh01d8HS1Xa4RN87%2BuHeKoAOY6BZQ3J5GCCwGxpzME7Vfoif9AnFqC4vrBiE3sf3%2BWiHYNknxCRPd9Jp3C01SsNb66PVJq%2BTF5LbSITfxMLptBXacz%2FAK4Jakg9Lc337XQ0TvVBaoPNv0YiPcmy%2BWhgEWcufdpgOhDfMeEyU5Gyv9DzakRCWXIj5SWDexOZ21waEaQ6EoStcayOQGhJyT2w9I0O1GHjIU3i27EMljkYP6cL13oj89yObu2WUqJdBZ%2FuQzxzfmM1AOQG9qT11VCo579uxffzUYPJ2v76pVIChhS30O8svESXfFvsGF7Cv%2B7MO231KoGOrICfjwyNh7P6WxqRAc%2FW9A6UZXzzrMpBO5NvYU6spKA5gP1cBqAcVUuqFyfRse7b15O1cujT46uswobjBGUWzC%2FFf73ayOP7F9yDufwl1tzg7WLo3%2BThF1NMBlzjDAxPZq2FVofJCQdyB9%2Fq6h%2BKZS2qS5RmaMwVk1L3mQKReSgnyBzwZYr1dWG%2BDN24o%2BviBsy8%2F8LUuw%2Fsd%2BlkMEvwpomJ2ygZKvqZNDEheHuXk3Gi7uMzPIQlOJJmyhgfK%2FIRY%2FYxIjOzyaK0%2BK64u100QJ00baKhdMmA6gkfPweD6uUqu%2B5lAx78Rav9dkx8bmpEkd1rH%2FX386ccscdGsXuwHRYo4uRC%2FLupPYkRg%2BoRVldm4wxzTNjxcNCLwNr50e6BvMINsKpHF7aPFGsI8jgrhdWP2%2F9&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231115T192921Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXEJJM6CZ7OXR4LQ3%2F20231115%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=4f455ad871d6b2847d6d5433831447ea9897d0391c499edf2cbb4622279548fe" 
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