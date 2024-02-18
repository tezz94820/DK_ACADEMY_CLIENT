import { useState,useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useRouter } from 'next/router'
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';
import Image from 'next/image';
import PyqCourseCard from './course/pyq/PyqCourseCard';
import { handleBuyProduct } from '@/utils/razorpay';



type individualPyqCourseType = {
  _id:string,
  title:string,
  new_launch:boolean,
  thumbnail:string,
  class_name:string,
  is_purchased:boolean,
  old_price:string,
  price:string,
  exam_type:string,
  discount:string,
}

const IndividualCourseDetails:individualPyqCourseType = {
  _id: "",
  title: "",
  new_launch: true,
  thumbnail: '',
  class_name: "",
  is_purchased:false,
  old_price: "",
  price: "",
  exam_type:"",
  discount:"",
}

type solutionType = {
  question: string,
  answer: string,
  visibility: boolean
}

type ShowPdfProps = {
  courseFileLink: string,
  isFree?: boolean
}

function Pdf( { courseFileLink, isFree=true } : ShowPdfProps) {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [fileLink, setFileLink] = useState('');
  const [solutions, setSolutions] = useState([]);
  const [solutionsClicked, setSolutionsClicked] = useState(false);
  const [allSolutionsClicked, setAllSolutionsClicked ] = useState(false);
  const [pyqCourseDetails, setPyqCourseDetails] = useState<individualPyqCourseType>(IndividualCourseDetails);

  const router = useRouter();
  const pdfId = router.query.pdf_id;

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

  const solutionsHandler = async () : Promise<void> => {
    try {
      if(solutions.length === 0){
        //get the solutions only once 
        const fetchUrl = isFree ? `pyq-pdf/free-solution?pdf_id=${pdfId}` : `pyq-pdf/solution?pdf_id=${pdfId}`;
        const res = await axiosClient.get(fetchUrl, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
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
    const newTabUrl = `/courses/pyq/view/${pdfId}/solution/${question}`;
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


  // fetch the course details to show the buy card below pdf 
  useEffect( () => {
    const fetchCourseDetails = async () => {
      if(!isFree) return; // want it to run only for free content
      if(!pdfId) return;
      try {
        const response = await axiosClient(`pyq-pdf/course-details?pdf_id=${pdfId}`);
        const data = response?.data?.data.pyq_course_details;
        setPyqCourseDetails(data);
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    fetchCourseDetails();
  }, [router] );




  return (
    <div className='flex flex-col w-full rounded bg-gradient-to-r mt-2' onContextMenu={disableRightClick}>
      <Document
        file={courseFileLink}
        onLoadSuccess={onDocumentLoadSuccess}
        error='NO PDF FOUND'
      >
        {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={520}
              scale={windowWidth >= 768 ? 2 : 1}

            />
        ))}
      </Document>
      
      {
        isFree && 
        <div className='w-full flex items-center justify-center my-5'>
          <div className='w-full sm:w-2/3 lg:w-1/3 m-3 sm:m-0 sm:animate-pulse hover:animate-none '>
            <PyqCourseCard pyqCourse={pyqCourseDetails} showFreeContent={false}/>
          </div>
        </div>
      }

      {/* close button */}
      <div className='fixed left-1/6 ml-2 z-10'>
        <button className='px-3 py-1 flex bg-white rounded-lg w-max hover:border-2 border-2 border-blue-800  hover:text-blue-800 hover:bg-blue-100 text-xl font-semibold tracking-wider' onClick={closeHandler}>Close</button>
      </div>

      {/* solution button */}
      <div className='fixed right-5 z-10 '>
          <button className='px-3 py-1 flex  rounded-lg w-max border-2 border-blue-800 bg-blue-800 text-white hover:bg-blue-600 hover:text-white hover:border-red-600 text-xl font-semibold tracking-wider' onClick={solutionsHandler} >Solutions</button>
      </div>

      {/* solution box */}
      <div className={`h-[calc(100vh-4.8rem)] fixed top-4.6 w-56 right-1 z-20  flex rounded-l-lg ${!solutionsClicked && 'hidden' }`} >
        
        {/* closing */}
        <div className='w-12 h-full rounded-l-lg p-0.5'>
          <Image src={"/arrow_right.svg"} alt="cross" height={30} width={30} className=' h-10 w-12 bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg cursor-pointer p-0.5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-500' onClick={() => setSolutionsClicked(false)}/>
        </div>
        
        {/* main box */}
        <div className={`w-48  bg-white  overflow-y-scroll scrollbar border-2 border-l-4 text-lg font-bold rounded-l-lg border-blue-800 `}>
          
          {/* heading */}
          <div className='flex justify-evenly p-1 border-b-2 border-black'>
            <h3 className='text-center text-xl'>Solutions</h3>
              <div className='tooltip  h-9 w-10 p-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800'>
                <Image src="/eye.svg" height={20} width={20} alt="eye" className='h-full w-full cursor-pointer'  onClick={() => setAllSolutionsClicked(prev => !prev)}/>
              </div>
          </div>

          {/* content */}
          <ul className='p-2 flex flex-col gap-2'> 
            {
              solutions.map( (item: { question: string , answer: string, visibility: boolean}) => (
                <li key={item.question} className='grid grid-cols-3 h-15  rounded shadow-lg shadow-indigo-500/20 p-1 gap-x-1 border-2 border-gray-200'>
                  <div className='border-2 border-gray-300 flex justify-center items-center h-full rounded-lg text-blue-800'><p>{item.question}&#41;</p></div>
                  <div className='flex justify-center items-center h-full w-full bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg cursor-pointer text-white'>
                    {
                      item.visibility ?
                      item.answer
                      :
                        <Image src="/eye.svg" height={20} width={20} alt="eye" className='h-8 w-8' onClick={() => showAnswer(item.question)}/>
                    }
                  </div>
                  <div className='flex justify-center items-center h-full w-full  rounded-lg cursor-pointer border-2 border-gray-300 hover:border-2 hover:border-blue-800' onClick={() => showAnswerPdf(item.question)}>
                    <Image src="/video.svg" alt="video image" height={100} width={100} className="" />
                  </div>
                </li>
              ))
            }
            {
              isFree && <button className='bg-blue-800 text-white rounded-lg w-full mt-10 animate-bounce hover:bg-blue-700 hover:animate-none' onClick={() => handleBuyProduct('pyq', pyqCourseDetails._id)}>Buy Now</button>
            }
          </ul>
        </div>
      </div>

    </div>
  );
}


export default Pdf