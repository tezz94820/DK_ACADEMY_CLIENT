import axiosClient from '@/axios/axiosClient';
import { current } from '@reduxjs/toolkit';
import { ifError } from 'assert';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

type testDetailsType = {
  _id: string;
  title: string;
  duration: string;
  type: string;
  total_questions: string;
  tabDetails:{
    ['PHYSICS']: string;
    ['PHYSICS NUMERIC']: string;
    ['CHEMISTRY']: string;
    ['CHEMISTRY NUMERIC']: string;
    ['MATHEMATICS']: string;
    ['MATHEMATICS NUMERIC']: string;
    [key: string]: string;
  }
}
const initialTestDetails: testDetailsType = {
  _id: '',
  title: '',
  duration: '',
  type: '',
  total_questions: '',
  tabDetails:{
    ['PHYSICS']: "",
    ['PHYSICS NUMERIC']: "",
    ['CHEMISTRY']: "",
    ['CHEMISTRY NUMERIC']: "",
    ['MATHEMATICS']: "",
    ['MATHEMATICS NUMERIC']: ""
  }
}

type currentQuestionType = {
  _id: string;
  question_type: string;
  question: string;
  question_pattern: string;
  question_number: string;
  question_subject: string;
  options: {
    _id: string;
    option_name: string;
    option_type: string;
    option: string;
  }[];
}

const initialCurrentQuestion = {
  _id: "1",
  question_type: "text",
  question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  question_pattern: "mcq",
  question_number: "2",
  question_subject: "physics",
  options: [
    {
      _id: "1",
      option_name: "A",
      option_type: 'img',
      option: "/trial/question.png",
    },
    {
      _id: "2",
      option_name: "B",
      option_type: 'text',
      option: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      _id: "3",
      option_name: "C",
      option_type: 'img',
      option: "/trial/question.png",
    },
    {
      _id: "4",
      option_name: "D",
      option_type: 'text',
      option: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    }
  ],
}

type questionsWithUserInteractionType = {
  question_number:string;
  user_interaction:string;
}

type questionInteractionAnalysisType = {
  "not-visited": string;
  "answered": string;
  "not-answered":string;
  "marked": string;
  "marked-answered": string;
}

const initialQuestionInteractionAnalysis = {
  "not-visited": "0",
  "answered": "0",
  "not-answered": "0",
  "marked": "0",
  "marked-answered": "0",
}
const tabs = [ 'PHYSICS', 'PHYSICS NUMERIC','CHEMISTRY', 'CHEMISTRY NUMERIC', 'MATHEMATICS', 'MATHEMATICS NUMERIC'];

const TestWatch = () => {

  const router = useRouter();
  let testId = router.query.test_id;
  const testAttemptId = router.query.test_attempt_id;
  const videoRef = useRef<HTMLVideoElement>(null);
  let duration = 180*60; //in seconds



  //states
  const [testDetails, setTestDetails] = useState<testDetailsType>(initialTestDetails);
  const [tabSelected, setTabSelected] = useState<string>(tabs[0]);
  const [currentQuestion, setCurrentQuestion] = useState<currentQuestionType>(initialCurrentQuestion);
  const [questionNumber, setQuestionNumber] = useState('1');
  const [timer, setTimer] = useState<number>(duration);
  const [selectedOption, setSelectedOption] = useState('');
  const [questionsWithUserInteraction, setQuestionsWithUserInteraction] = useState<questionsWithUserInteractionType[]>([]);
  const [questionInteractionAnalysis, setQuestionInteractionAnalysis] = useState<questionInteractionAnalysisType>(initialQuestionInteractionAnalysis);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  
  //get test start details
  useEffect( () => {
    const fetchTestStartDetails = async () => {
      if(!testId) return;
      try {
        const response = await axiosClient.get(`tests/test-start/${testId}`);
        const data = response.data.data;
        setTestDetails({_id:data._id,title:data.title,duration:data.duration,type:data.type,total_questions:data.total_questions,tabDetails:data.tabDetails });
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }
    fetchTestStartDetails();
  },[router,testId]);

  // start camera and audio
  useEffect( () => {
    const startCamera = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
          if(videoRef.current){
              videoRef.current.srcObject = stream;
          }
      } catch (error:any) {
          console.error('Error accessing camera and microphone:', error);
      }
  }

    startCamera();
  },[])

  const handleTabClicked = (newTab:string) => {
    // set the new tab selected
    setTabSelected(newTab);
    // set the queestion number according to tab
    setQuestionNumber(testDetails.tabDetails[newTab]);
  }

  //timer
  useEffect( () => {
    if(timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev)  => prev === 0 ? 0 : prev-1);
    }, 1000);
    if(timer === 0) clearInterval(interval);
    return () => clearInterval(interval);
  },[timer]);


  const formatTime = (time:number) => time < 10 ? `0${time}` : time;
  const second = formatTime(timer%60);
  const minute = formatTime(Math.floor(timer/60)%60);
  const hour = formatTime(Math.floor(timer/3600));
  const current_degree = (duration - timer) * 360 / duration;
  const timer_styles = {
    height: "60%",
    width: "auto",
    aspectRatio: "1/1",
    border: "3px solid #0b68a3",
    borderRadius: "50%",
    backgroundImage: `conic-gradient(#0b68a3 0deg,#0b68a3 ${current_degree}deg, white ${current_degree}deg,white 360deg)`
  }

  //option
  const handleOptionChange = (optionName:string) => {
    setSelectedOption(optionName);
  }

  const handleClearSelection = async () => {
    setSelectedOption('');
    // saving the user selected option as empty with  user_interaction as not-answered
    try {
      const response = await axiosClient.post(
        'tests/test/option-user-interaction',
        { test_attempt_id:testAttemptId,question_number:questionNumber,option:"",user_interaction:"not-answered"},
        {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}}
      );
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  }


  // fetch individual question by question number
  useEffect( () => {
    const fetchQuestionByQuestionNumber = async () => {
      if(!testId) return;
      if(!questionNumber) return;
      try {
        // get the question content by questionNumber
        const response = await axiosClient.get(`tests/test/question/${testId}/${questionNumber}`);
        setCurrentQuestion(response.data.data);
        // get the selected option from backend 
        const res = await axiosClient.get(`tests/test/selected-option-by-question/${testAttemptId}/${questionNumber}`, {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}});
        setSelectedOption(res.data.data.selected_option);
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    fetchQuestionByQuestionNumber();
  },[testId,questionNumber,testAttemptId]) 

  // questionbox
  const handleQuestionBoxClicked = async (newQuestionNumber:string) => {
    // if no answer is selected and clikced on another question then make it not-answered in db also make sure the question is not review-later
    const isReviewLater = questionsWithUserInteraction.find( q => q.question_number === questionNumber && q.user_interaction === 'marked' );
    if(selectedOption === '' && !isReviewLater){
      try {
        const response = await axiosClient.post(
          'tests/test/option-user-interaction',
          { test_attempt_id:testAttemptId,question_number:questionNumber,option:"",user_interaction:"not-answered"},
          {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }
    setQuestionNumber(newQuestionNumber);
    //handle tab switch if necessary
    let tabToSwitchTo:{tab:string,diff:number} = { tab:'', diff:0};
    for(const [key,value] of Object.entries(testDetails.tabDetails)){
      const currentDiff = Number(newQuestionNumber) - Number(value);
      if(currentDiff < 0) continue;
      if(tabToSwitchTo.tab === '') {
        tabToSwitchTo.tab = key;
        tabToSwitchTo.diff = currentDiff;
      }
      else if(currentDiff < tabToSwitchTo.diff){
          tabToSwitchTo.tab = key;
          tabToSwitchTo.diff = currentDiff;
      }
    }
    setTabSelected(tabToSwitchTo.tab);
  }

  //back and next
  const handleNextQuestionButton = async () => {
    // if no answer is selected and the question is not review later then  clikced on another question then make it not-answered in db
    const isReviewLater = questionsWithUserInteraction.find( q => q.question_number === questionNumber && q.user_interaction === 'marked' );
    if(selectedOption === '' && !isReviewLater){
      try {
        const response = await axiosClient.post(
          'tests/test/option-user-interaction',
          { test_attempt_id:testAttemptId,question_number:questionNumber,option:"",user_interaction:"not-answered"},
          {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    setQuestionNumber((prev) => {
      if(prev === testDetails.total_questions) return prev;
      return (Number(prev) + 1).toString();
    })
  }

  const handleBackQuestionButton = async () => {
    // if no answer is selected and the question is not review later then  clikced on another question then make it not-answered in db
    const isReviewLater = questionsWithUserInteraction.find( q => q.question_number === questionNumber && q.user_interaction === 'marked' );
    if(selectedOption === '' && !isReviewLater){
      try {
        const response = await axiosClient.post(
          'tests/test/option-user-interaction',
          { test_attempt_id:testAttemptId,question_number:questionNumber,option:"",user_interaction:"not-answered"},
          {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
      } catch (error:any) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      }
    }

    setQuestionNumber((prev) => {
      if(prev === '1') return prev;
      return (Number(prev) - 1).toString();
    })
  }

  const handleSaveAndNext = async () => {
    try {
      // saving the user selected option with answered user_interaction
      const response = await axiosClient.post(
        'tests/test/option-user-interaction',
        { test_attempt_id:testAttemptId,question_number:questionNumber,option:selectedOption,user_interaction:"answered"},
        {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}}
      );
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
    // increment question number
    setQuestionNumber((prev) => {
      if(prev === testDetails.total_questions) return prev;
      return (Number(prev) + 1).toString();
    })
  }

  const handleReviewLater = async () => {
    const userInteraction = selectedOption === "" ? "marked" : "marked-answered";
    // saving the user selected option with appropriate marked user_interaction 
    try {
      const response = await axiosClient.post(
        'tests/test/option-user-interaction',
        { test_attempt_id:testAttemptId,question_number:questionNumber,option:selectedOption,user_interaction:userInteraction},
        {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}}
      );
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
    // increment question number
    setQuestionNumber((prev) => {
      if(prev === testDetails.total_questions) return prev;
      return (Number(prev) + 1).toString();
    })  }

    //question box states
    useEffect( () => {
      const fetchQuestionUserInteraction = async () => {
        if(!testAttemptId) return;
        try {
          const response = await axiosClient.get(`tests/test/question-states/${testAttemptId}`, {headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`}});
          setQuestionsWithUserInteraction(response.data.data.question_states);
          setQuestionInteractionAnalysis(response.data.data.question_interaction_analysis);
        } catch (error:any) {
          const errorMessage = error?.response?.data?.message || "An error occurred";
          toast.error(errorMessage);
        }
      }
      fetchQuestionUserInteraction();
    },[testAttemptId,questionNumber]);


    //auto scrolling to question button
    useEffect ( () => {
      const scrollContainer : HTMLDivElement|null = scrollContainerRef.current;
      console.log(scrollContainer?.scrollTop);
      if(scrollContainer){
        scrollContainer.scrollTop = Number(questionNumber)/4*65;
      }
      
    },[tabSelected]);


  return (
    <div className='w-screen h-screen overflow-hidden select-none'>
      {/* test header 13*/}
      <div className='flex justify-between items-center px-6  h-[13%]'>
        <h2 className='text-2xl font-bold '>{testDetails.title}</h2>
        <div className='flex items-center gap-2 h-full'>
          <div style={timer_styles} className='timer-clock'></div>
          <div className='flex text-xl font-bold'>
            <div>{hour}</div>:
            <div>{minute}</div>:
            <div className='animate-bounce'>{second}</div>
          </div>
          <video ref={videoRef} autoPlay playsInline height={100} width={100} className='rounded border border-black shadow shadow-black h-[95%] w-auto my-auto' muted={true}/>
          {/* submit test button */}
          <div className='flex justify-center items-center'>
            <button className='border-2 border-red-500 px-5 py-1  rounded-lg h-max text-red-500 hover:bg-red-500 hover:text-white font-bold' >Submit Test</button>
          </div>
        </div>
      </div>

      {/* tabs 8*/}
      <div className='w-100 bg-blue-800 h-[8%] flex items-center' >
        <div className='flex justify-between  w-[75%] px-6 '>
          {
            tabs.map( tab => (
              <div key={tab}>
                <h3 className={`text-base text-white cursor-pointer ${tabSelected === tab ? 'underline underline-offset-8' : ''}`} onClick={() => handleTabClicked(tab)}>{tab}</h3>
              </div>
            ))
          }
        </div>
      </div>

      {/* test content 79 */}
      <div className='w-full flex h-[79%]'>
        
        {/* test section */}
        <div className='w-[75%]'>
          {/* test questions and answers */}
          <div className='w-full h-[85%] border-2 border-y-blue-600 p-2 overflow-auto'>
            {/* question number */}
            <p className='text-blue-600 font-bold tracking-widest'>Q{currentQuestion.question_number}</p>
            {/* question */}
            {
              currentQuestion.question_type === 'text' 
              ?
              <p>{currentQuestion.question}</p>
              :
              <Image src="/trial/question.png" height={400} width={800} alt="question" />
            }
            {/* options */}
            {
              currentQuestion.question_pattern === 'mcq' ?

              <div className='flex flex-col mt-5 gap-4'>
              {
                ['A','B','C','D'].map( item => {
                  const option = currentQuestion.options.filter( opt => opt.option_name === item)[0];
                  return (
                    <label key={item} className='flex cursor-pointer w-max'>
                      <input type="radio" name="selectedOption" value={item} className='mr-2 h-5 w-5 my-auto'
                        onChange={() => handleOptionChange(item)}
                        checked={selectedOption === item}
                      />
                      {
                        option.option_type === 'text' 
                        ? 
                          <span> {item}&#41; {option.option} </span>
                        : 
                          <Image src={"/trial/question.png"} height={400} width={800} alt={`option${item}`} />
                      }
                    </label>
                  )
                })
              }
            </div>

            : 
            //for numerical value
            <div className='mt-5  '>
              <form onSubmit={ e => e.preventDefault()}>
                <input type="text" pattern="-?\d+(\.\d+)?" title="Enter a numerical value" 
                  className='rounded w-1/2 h-12 text-xl pl-3 border border-black'
                  onChange={e => handleOptionChange(e.target.value)}
                  value={selectedOption}
                />
                <div className={`${(/-?\d+(\.\d+)?/.test(selectedOption) || selectedOption === '') ? 'hidden' : 'block' }  w-max py-2 px-4 mt-2 flex bg-yellow-400 rounded-full`} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span className=''>Warning: Enter Numerical value!</span>
                </div>
              </form>

            </div>
              
            }
          </div>
          {/* test question selection buttons  */}
          <div className='w-full h-[15%]  flex justify-between items-center px-5'>
            <div className='flex gap-3'>
              <button className={`px-5 py-1 font-bold border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg h-max ${selectedOption === '' ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`} disabled={selectedOption === ''} onClick={handleSaveAndNext}>Save & Next</button>
              <button className='px-5 py-1 font-bold border-2 border-purple-500 text-purple-500 rounded-lg h-max hover:bg-purple-500 hover:text-white' onClick={handleReviewLater}>Review Later</button>
              <button className={`px-5 py-1 font-bold border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white rounded-lg h-max ${selectedOption === '' ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`} disabled={selectedOption === ''} onClick={handleClearSelection}>Clear Selection</button>
            </div>
            <div className=' flex gap-3'>
              <button className='px-5 py-1 font-bold border-2 border-blue-500 text-blue-500 rounded-lg h-max hover:bg-blue-500 hover:text-white' onClick={handleBackQuestionButton}>&larr; Back</button>
              <button className='px-5 py-1 font-bold border-2 border-blue-500 text-blue-500 rounded-lg h-max hover:bg-blue-500 hover:text-white' onClick={handleNextQuestionButton}>Next &rarr;</button>
            </div>
          </div>
        </div>

          {/* right question button section */}
        <div className='w-[25%]'>
          {/* question information section */}
          <div className='h-[45%] flex flex-col justify-evenly px-3 border-2 border-l-blue-600'>
              <div className='flex items-center justify-start gap-2'>
                <p className='bg-[url("/trial/answered.svg")] h-8 w-8 bg-no-repeat flex items-center justify-center text-base text-white'>{questionInteractionAnalysis['answered']}</p>
                <p>Answered</p>
              </div>
              <div className='flex items-center justify-start gap-2'>
                <p className='bg-[url("/trial/not-answered.svg")] h-8 w-8 bg-no-repeat text-center align-middle text-base text-white'>{questionInteractionAnalysis['not-answered']}</p>
                <p>Not Answered</p>
              </div>
              <div className='flex items-center justify-start gap-2'>
                <p className=' border border-gray-800 bg-gray-200 rounded h-8 w-8 bg-no-repeat flex items-center justify-center text-base text-black'>{questionInteractionAnalysis['not-visited']}</p>
                <p>Not Visited</p>
              </div>
              <div className='flex items-center justify-start gap-2'>
                <p className='bg-marked rounded-full h-9 w-9 bg-no-repeat flex items-center justify-center text-base text-white'>{questionInteractionAnalysis['marked']}</p>
                <p>To Be Reviewed</p>
              </div>
              <div className='flex items-center justify-start gap-2'>
                <p className='bg-[url("/trial/marked-answered.svg")] h-9 w-10 bg-no-repeat flex items-center justify-center text-base text-white'>{questionInteractionAnalysis['marked-answered']}</p>
                <p>Answered & marked for <br/>review &#40;will be evaluated&#41;</p>
              </div>
          </div>
          {/* Question buttons */}
          <div className='h-[52%] overflow-y-auto border-2 border-blue-600' ref={scrollContainerRef}>
            <div className=' grid grid-cols-4 p-4 gap-4' >
              {
                questionsWithUserInteraction.map( item => (
                  <button key={item.question_number} className={item.question_number === questionNumber ? 'focus-question' : item.user_interaction } onClick={() => handleQuestionBoxClicked(item.question_number)}>Q{item.question_number}</button>
                ))
              }
            </div>
          </div>
        </div>
      
      </div>

    </div>
  )
}

export default TestWatch