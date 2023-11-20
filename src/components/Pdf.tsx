import { useState,useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useRouter } from 'next/router'

function Pdf() { 
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

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
        file={'https://s3.ap-south-1.amazonaws.com/dkacademy.store/pyq-pdf/655847d0a79f3fc5d391b02b/pdf.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiAnX3ZIBn6Rp8h%2FWkIlGGNjc669Niui5YyzNV1N1qSQKAIhANOi6e0QWSJDnrQBgTns8pn4%2BuuDiZ2L330kmk%2FSWLiLKu0CCN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNDkwMjQ5OTczOTM5IgyQIlPJHUdTswN%2F0wMqwQJ18Ddc2xw9ZCr7AACYk83ONMhu7mKRrn0MiKnuHaReHyUAQc9UDsAh%2FQ6xITWPRxq9gt5KqAvZbp8QLtd7KXArhvhktTmuXzIMQnqVV4iXUuouqSa3LRlClA1XCEKt%2FlgdfBk7T1OUsS9xR8IBDQSTo7TVkPr1lzUlAImlPKxzXj3lknpwrErTsB1PZ3WZV8ZVyvKEOdBPTuIwpbFhHVnihVkl%2B5BX5S4XxKS7DJzY2sBobJAsgSigKDopLeK2Fj398YctwkQp1goREkMn16FmA6J8iuQFULG6J1amFKZAUNuG7Wj2an71yvwYpjLQ3zpBLsaGMcddaPyH6cWVnFVQ08v8q2ftTGeBCitqZNhF0eC%2FbfhxYCCyssq3l9tUNG4miSOo5xlSlFSA%2FKPOTDjKwqyDC115XZzxS4xUDuksBPgw4O3pqgY6swIT2EAAzAymQfMrvCWCKTb3wI9Wf%2BX47JK%2FWdh%2FLs%2FKsjqY5fX%2BbP1srOL943ZQjqdDSnQQeqXSjXnwu79kqaHbIiWVRMRmWZDnfPBlRhijwybuelN5WcSoXLhdlBMaphUhZukTrDU%2B0VdOGZzXE0yuavRt8qhf1l1hbQgdDk1GY3gBm2gIqZKJ7u8q1Bk0FbyYymqE6xb%2FcD%2Br4msvclzQj62GbHSfW3%2FYR4yyQV4%2FEiYTIIXoKr%2BjQEfjgZjVjogUzKCei54kRZctX%2BKlvi2UHI7SVmHUOZpGmISDcADIoGot2C2BUHnj0Wjoyw4g9j3YoH%2BehzKlST8V1gEsMU3zfW81rJX4n1WlbV9TDnk596DFsgEnrjtTZhgCR%2Bw6wlDf0KDLH39KlB9%2F%2FpXMXqCKtYN1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231119T232446Z&X-Amz-SignedHeaders=host&X-Amz-Expires=10800&X-Amz-Credential=ASIAXEJJM6CZTBDJVH7H%2F20231119%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=3c2f071a96e36b2096df47e1274b88d69f3804d2f24e430e74525828b87dd099'}
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