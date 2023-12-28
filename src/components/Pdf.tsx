import { useState,useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';
import Image from 'next/image';

type solutionType = {
  question: string,
  answer: string,
  visibility: boolean
}


function Pdf() {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [fileLink, setFileLink] = useState('');
  const [solutions, setSolutions] = useState([]);
  const [solutionsClicked, setSolutionsClicked] = useState(false);
  const [allSolutionsClicked, setAllSolutionsClicked ] = useState(false);
  const router = useRouter();
  const pdfId = router.query.pdf_id;
  const exam_type = router.query.exam_type;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const getFileLink = async () => {
      try {
        if(!localStorage.getItem('token')){
          router.push('/courses/require-auth');
          return;
        }
        const res = await axiosClient.get(`/pyq-pdf/pdf?pdf_id=${pdfId}&exam_type=${exam_type}`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
        setFileLink(res.data.data.presignedUrl);
      } catch (error:any) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
      }
    }
    
    if(pdfId) 
      getFileLink();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router,exam_type,pdfId]);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const closeHandler = () => {
    router.back();
  }

  const disableRightClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const solutionsHandler = async () : Promise<void> => {
    try {
      if(solutions.length === 0){
        //get the solutions only once 
        const res = await axiosClient.get(`pyq-pdf/solution?pdf_id=${pdfId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
        let sols = res.data.data.solutions;
        sols = sols.map( (item:{question: string , answer: string}) => ({...item, visibility:false}) );
        setSolutions(sols);
      }
      //display the solutions
      setSolutionsClicked(true);
    } catch (error:any) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(errorMessage);
    }
  }

  const showAnswerPdf = (question:string) => {
    const newTabUrl = `/courses/pyq-pdf/view/${pdfId}/solution/${question}`;
    window.open(newTabUrl, '_blank');
  }

  const showAnswer = (question:string) => {
    setSolutions( (prevState:any) => {
      const newState = prevState.map( (item:any) => {
        if(item.question === question) return {...item, visibility: true}
        return item
      });
      return newState;
    });
  }

  useEffect(() => {
    const toggleShowAllSolutions = () => {
      setSolutions( (prevState:any) => {
        const newState = prevState.map( (item:any) => {
          return {...item, visibility: allSolutionsClicked}
        });
        return newState;
      });
    }

    toggleShowAllSolutions();
  },[allSolutionsClicked]);

  console.log(exam_type)

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
      <div className='fixed left-1/6 ml-2 z-10'>
        <button className='px-2 py-1 flex bg-white rounded w-20 hover:border-2 border-2 border-red-700 hover:bg-red-300' onClick={closeHandler}>Close</button>
      </div>

      {/* solution button */}
      <div className='fixed right-2 z-10 '>
          <button className='px-2 py-1 flex bg-white rounded w-20 border-2 border-green-600 hover:bg-green-600 hover:text-white hover:border-red-600' onClick={solutionsHandler} >Solutions</button>
      </div>

      {/* solution box */}
      <div className={`h-[calc(100vh-4.8rem)] fixed top-4.6 w-56 right-1 z-20  flex rounded-l-lg ${!solutionsClicked && 'hidden' }`} >
        
        {/* closing */}
        <div className='w-12 h-full rounded-l-lg p-0.5'>
          <Image src={"/arrow_right.svg"} alt="cross" height={30} width={30} className=' h-10 w-12 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg cursor-pointer p-0.5 hover:bg-gradient-to-r hover:from-red-300 hover:to-red-500' onClick={() => setSolutionsClicked(false)}/>
        </div>
        
        {/* main box */}
        <div className={`w-48  bg-white  overflow-y-scroll scrollbar border-2 border-l-4 text-lg font-bold rounded-l-lg border-blue-700 `}>
          
          {/* heading */}
          <div className='flex justify-evenly p-1 border-b-2 border-black'>
            <h3 className='text-center text-xl'>Solutions</h3>
              <div className='tooltip  h-9 w-10 p-0.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500'>
                <Image src="/eye.svg" height={20} width={20} alt="eye" className='h-full w-full cursor-pointer'  onClick={() => setAllSolutionsClicked(prev => !prev)}/>
              </div>
          </div>

          {/* content */}
          <ul className='p-2 flex flex-col gap-2'> 
            {
              solutions.map( (item: { question: string , answer: string, visibility: boolean}) => (
                <li key={item.question} className='grid grid-cols-3 h-12  rounded shadow-lg shadow-indigo-500/20 p-1 gap-x-1 border-2 border-gray-200'>
                  <div className='border-2 border-gray-300 flex justify-center items-center h-full rounded-lg '><p>{item.question}&#41;</p></div>
                  <div className='flex justify-center items-center h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg cursor-pointer hover:border-2 hover:border-red-500'>
                    {
                      item.visibility ?
                      item.answer
                      :
                        <Image src="/eye.svg" height={20} width={20} alt="eye" className='h-8 w-8' onClick={() => showAnswer(item.question)}/>
                    }
                  </div>
                  <div className='flex justify-center items-center h-full w-full  rounded-lg cursor-pointer border-2 border-gray-300 hover:border-2 hover:border-red-500' onClick={() => showAnswerPdf(item.question)}>
                    <Image src="/arrow_right_long.svg" alt="right arrow " height={20} width={20} className="slide-right-arrow" />
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

    </div>
  );
}


export default Pdf