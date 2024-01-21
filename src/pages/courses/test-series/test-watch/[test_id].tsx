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
}
const initialTestDetails: testDetailsType = {
  _id: '',
  title: '',
  duration: '',
  type: '',
  total_questions: '',
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
let tabs:string[] = [ 'PHYSICS', 'PHYSICS NUMERICAL','CHEMISTRY', 'CHEMISTRY NUMERICAL', 'MATHEMATICS', 'MATHEMATICS NUMERICAL'];
let tabDetails:{[key:string]:string} = { 'PHYSICS':'1', 'PHYSICS NUMERICAL':'21','CHEMISTRY':'31', 'CHEMISTRY NUMERICAL':'51', 'MATHEMATICS':'61', 'MATHEMATICS NUMERICAL':'81'};
let summaryTabs = [ 'TOTAL', 'PHYSICS', 'PHYSICS NUMERICAL','CHEMISTRY', 'CHEMISTRY NUMERICAL', 'MATHEMATICS', 'MATHEMATICS NUMERICAL'];

type TestSummaryDetailsType = {
  total:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  }
  physics:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  },
  physics_numerical:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  },
  chemistry:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  },
  chemistry_numerical:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  },
  mathematics:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  },
  mathematics_numerical:{
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  }
  [key: string]: {
    total_questions: number;
    answered: number;
    not_answered: number;
    marked_review: number;
    not_visited: number;
  };
}

const initialTestsummaryDetails:TestSummaryDetailsType = {
  total:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  },
  physics:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  },
  physics_numerical:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  },
  chemistry:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  },
  chemistry_numerical:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  },
  mathematics:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  },
  mathematics_numerical:{
    total_questions: 0,
    answered: 0,
    not_answered: 0,
    marked_review: 0,
    not_visited: 0
  }
}

const TestWatch = () => {

  const router = useRouter();
  const {test_id:testId, test_attempt_id:testAttemptId, test_type:testType} = router?.query;
  const videoRef = useRef<HTMLVideoElement>(null);
  // let duration = 180*60; //in seconds



  //states
  const [testDetails, setTestDetails] = useState<testDetailsType>(initialTestDetails);
  const [tabSelected, setTabSelected] = useState<string>(tabs[0]);
  const [currentQuestion, setCurrentQuestion] = useState<currentQuestionType>(initialCurrentQuestion);
  const [questionNumber, setQuestionNumber] = useState('1');
  const [duration, setDuration] = useState<number>(180*60);
  const [timer, setTimer] = useState<number>(duration);
  const [selectedOption, setSelectedOption] = useState('');
  const [questionsWithUserInteraction, setQuestionsWithUserInteraction] = useState<questionsWithUserInteractionType[]>([]);
  const [questionInteractionAnalysis, setQuestionInteractionAnalysis] = useState<questionInteractionAnalysisType>(initialQuestionInteractionAnalysis);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [fullScreenEnabled, setFullScreenEnabled] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [summaryTabSelected, setSummaryTabSelected] = useState<string>(summaryTabs[0]);
  const [testSummaryDetails, setTestSummaryDetails] = useState<TestSummaryDetailsType>(initialTestsummaryDetails);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  //setting the structure pecific to testType as flt,ma,ch,ph
  useEffect( () => {
    if(!testType) return;
    if(testType !== 'flt'){
      // filtering the tabs according to testType and initially setting the tabs[0] as the selected tab
      tabs = tabs.filter( item => item.split(' ')[0].toLowerCase() === (testType as string).toLowerCase());
      setTabSelected(tabs[0]);
      //setting the tabDetails selected testType as 1 and its numerical as 21 and deleting all other
      for(const tab in tabDetails){
        if(tab.split(' ')[0].toLowerCase() !== (testType as string).toLowerCase()){
          delete tabDetails[tab];
        }
      }
      tabDetails[(testType as string).toUpperCase()] = '1';
      tabDetails[(testType as string).toUpperCase() + ' NUMERICAL'] = '21';
      //setting summary tabs :- delete all the other than total,flt,flt_numerical
      summaryTabs = summaryTabs.filter( item => (item === 'TOTAL') || (item.split(' ')[0].toLowerCase() === (testType as string).toLowerCase()) );
    }
  },[testType])


  // console.log(tabDetails);
  //get test start details
  useEffect( () => {
    const fetchTestStartDetails = async () => {
      if(!testId) return;
      try {
        const response = await axiosClient.get(`tests/test-start/${testId}`);
        const data = response.data.data;
        setTestDetails({_id:data._id,title:data.title,duration:data.duration,type:data.type,total_questions:data.total_questions });
        setDuration(Number(data.duration)*60);
        setTimer(Number(data.duration)*60);
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

    // Cleanup function to close camera and audio settings on component unmount
    return () => {
      const stopCamera = () => {
        const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
        if (tracks) {
          tracks.forEach((track) => track.stop());
        }
      };
  
      stopCamera();
    };

  },[])
  
  
  // console.log(videoRef.current?.srcObject as MediaStream);

  const handleTabClicked = (newTab:string) => {
    // set the new tab selected
    setTabSelected(newTab);
    // set the queestion number according to tab
    setQuestionNumber(tabDetails[newTab]);
  }

  //timer
  useEffect( () => {
    if(timer === 0) handleEntireTestSubmit();
    const interval = setInterval(() => {
      setTimer((prev)  => prev === 0 ? 0 : prev-1);
    }, 1000);
    if(timer === 0) clearInterval(interval);
    return () => {
      clearInterval(interval);
    }
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
  console.log('duration=',duration,"timer=",timer,"current_degree=",current_degree);

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
    for(const [key,value] of Object.entries(tabDetails)){
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
      // console.log(scrollContainer?.scrollTop);
      if(scrollContainer){
        scrollContainer.scrollTop = Number(questionNumber)/4*65;
      }

    },[tabSelected]);

    //handle user refresh and tab switch
    useEffect( () => {
      const handleRefreshPage = (event: BeforeUnloadEvent) => {
        const message = 'Are you sure you want to leave? Your changes may not be saved.';
        return message;
      };
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Page is not visible (user switched tabs)
          alert('Switching tabs may result in closing of the Test.');
        } else {
          // Page is visible, You can handle any logic when the user returns to the tab
        }
      };

      window.addEventListener('beforeunload',handleRefreshPage);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        window.removeEventListener('beforeunload',handleRefreshPage);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    },[])

    useEffect( () => {
      let interval:(NodeJS.Timeout|null) = null;
      // if the screen is not fullscreen then display an alert
      if(typeof document !== 'undefined' && !document.fullscreenElement){
        alert('please Enter FullScreen Mode by clicking FullScreen Mode.');
        interval = setInterval( () => {
          alert('please Enter FullScreen Mode by clicking FullScreen Mode.');
        },10000)
        setFullScreenEnabled(false);
      }
      else{
        if(interval) clearInterval(interval);
      }

      return () => {
        if(interval) clearInterval(interval);
      }
    },[typeof document !== 'undefined' && document.fullscreenElement])


    const handleFullScreenEnabled = () => {
      const element = document.documentElement;
        if(element.requestFullscreen){
            element.requestFullscreen();
        }
        setFullScreenEnabled(true);
    }

    const handleTestSubmitToSummary = async () => {
      setShowSummary(true);
      try {
        const res = await axiosClient.get(`tests/test/test-summary/${testAttemptId}`,{ headers:{'Authorization':"Bearer "+localStorage.getItem("token")} });
        // console.log(res);
        setTestSummaryDetails(res.data.data.test_summary);
      } catch (error:any) {
        const message = error?.response?.data?.message || "An error occurred";
        toast.error(message);
      }
    }

    const handleSummaryTabClicked = (newTab:string) => {
      setSummaryTabSelected(newTab);
    }

    useEffect( () => {
      const handleBeforePopState = () => {
        const answer = window.confirm('Are you sure you want to leave? Your test will be automatically Sumbmitted.');
  
        if (!answer) {
          // If the user clicks Cancel, prevent the navigation
          return false;
        }
  
        // Allow the navigation to proceed
        return true;
      };

      router.beforePopState(handleBeforePopState);
    },[router])


    const handleEntireTestSubmit = () => {
      router.replace(`/courses/test-series/test-result?test_id=${testId}&test_attempt_id=${testAttemptId}`);
    }

    // console.log(summaryTabSelected);

  return (
    <>
    {
      showSummary ?
        <div className="w-screen h-screen overflow-hidden select-none relative ">
          {/* top heading */}
          <div className={`flex flex-col gap-4  items-center justify-center bg-blue-600 ${fullScreenEnabled ? 'py-10' : 'py-5'}`}>
            <button className={`border border-green-800 bg-green-700 px-4 py-2 text-white font-bold text-xl rounded-lg animate-pulse ${fullScreenEnabled ? 'hidden' : 'block'} hover:text-green-700 hover:bg-white hover:animate-none`} onClick={handleFullScreenEnabled}>Enable FullScreen Mode</button>
            <h1 className='text-3xl font-bold text-white'>Exam Summary</h1>
          </div>
          {/* subject tabs */}
          <div className='w-full flex gap-10 px-10 bg-gray-200'>
            {
              summaryTabs.map( tab => (
                <button key={tab} className={` py-2 font-semibold ${summaryTabSelected === tab ? ' text-blue-600 underline underline-offset-8 decoration-4' : 'text-gray-600'} rounded-lg`} onClick={() => handleSummaryTabClicked(tab)}>{tab}</button>
              ))
            }
          </div>
          {/* tab content */}
          <div className='px-10 mt-10 w-[30%]'>
            <div className='flex justify-between font-bold text-blue-500 text-lg'>
              <p>Number of Questions</p>
              <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].total_questions}</p>
            </div>
            <div className='flex justify-between text-green-500 font-bold mt-2 text-lg'>
              <p>Answered</p>
              <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].answered}</p>
            </div>
            <div className='flex justify-between text-red-500 font-bold mt-2 text-lg'>
              <p>Not Answered</p>
              <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].not_answered}</p>
            </div>
            <div className='flex justify-between text-marked font-bold mt-2 text-lg'>
              <p>Marked For Review</p>
              <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].marked_review}</p>
            </div>
            <div className='flex justify-between font-bold mt-2 text-lg'>
              <p>Not Visited</p>
              <p>{testSummaryDetails[summaryTabSelected.split(' ').join('_').toLowerCase()].not_visited}</p>
            </div>
          </div>

          <div className='w-full flex items-center justify-center gap-10 absolute bottom-5'>
            <button className='px-6 py-1 border-2 border-blue-500 text-blue-500 rounded-full font-bold text-lg w-36 ' onClick={() => setShowSummary(false)}>Back</button>
            <button className='px-6 py-1 border-2 border-blue-500 rounded-full font-bold text-lg bg-blue-500 text-white w-36 ' onClick={() => setShowSubmitModal(true)}>Submit</button>
          </div>
          
            {/* modal */}
          <div className={`absolute top-0 left-0 w-full h-full flex items-center z-10 justify-center  ${showSubmitModal ? 'block' : 'hidden'}`}>
            <div className='absolute h-full z-10 w-full bg-gray-800 opacity-80'></div>
            <div className='w-[28%] h-[30%] z-20 bg-white rounded-lg flex flex-col items-center justify-center gap-5 relative'>
              <h3 className='text-xl font-semibold'>Are you sure you want to end the Test ?</h3>
              <div className='flex gap-5'>
                <button className='px-6  border-2 border-blue-500 rounded-full bg-blue-500 text-white text-xl font-semibold ' onClick={handleEntireTestSubmit}>OK</button>
                <button className='px-6  border-2 border-blue-500 rounded-full  text-xl font-semibold' onClick={() => setShowSubmitModal(false)}>Cancel</button>
              </div>
              <button className='absolute top-2 right-2 h-8 w-8' onClick={() => setShowSubmitModal(false)}>
                <Image src="/cancel.svg" height={100} width={100} alt="Close" className="w-full h-full  text-blue-500"/>
              </button>
            </div>
          </div>
        
        </div>
      :
        <div className='w-screen h-screen overflow-hidden select-none'>
          {/* test header 13*/}
          <div className='flex justify-between items-center px-6  h-[13%]'>
            <h2 className='text-2xl font-bold  '>{testDetails.title}</h2>
            <button className={`border border-green-800 bg-green-700 px-4 py-2 text-white font-bold text-xl rounded-lg animate-pulse ${fullScreenEnabled ? 'hidden' : 'block'} hover:text-green-700 hover:bg-white hover:animate-none`} onClick={handleFullScreenEnabled}>Enable FullScreen Mode</button>
            <div className='flex items-center gap-2 h-full'>
              <div style={timer_styles} className='timer-clock'></div>
              <div className='flex text-xl font-bold'>
                <div>{hour}</div>:
                <div>{minute}</div>:
                <div className=''>{second}</div>
              </div>
              <video ref={videoRef} autoPlay playsInline height={100} width={100} className='rounded border border-black shadow shadow-black h-[95%] w-auto my-auto' muted={true}/>
              {/* submit test button */}
              <div className='flex justify-center items-center'>
                <button className='border-2 border-red-500 px-5 py-1  rounded-lg h-max text-red-500 hover:bg-red-500 hover:text-white font-bold' onClick={handleTestSubmitToSummary}>Submit Test</button>
              </div>
            </div>
          </div>

          {/* tabs 8*/}
          <div className='w-100 bg-blue-800 h-[8%] flex items-center' >
            <div className={`flex gap-8  w-[75%] px-6 `}>
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
                  <p className='text-lg font-bold'>{currentQuestion.question}</p>
                  :
                  <img src={currentQuestion.question} height={400} width={800} alt="question" className='w-[90%] h-auto'/>
                }
                {/* options */}
                {
                  currentQuestion.question_pattern === 'mcq' ?

                  <div className='flex flex-col mt-5 gap-4'>
                  {
                    ['A','B','C','D'].map( item => {
                      const option = currentQuestion.options.filter( opt => opt.option_name === item)[0];
                      return (
                        <label key={item} className={`flex cursor-pointer w-full p-2 ${selectedOption === item ? 'bg-green-100' : ''} `}>
                          <input type="radio" name="selectedOption" value={item} className='mr-2 h-5 w-5 my-auto'
                            onChange={() => handleOptionChange(item)}
                            checked={selectedOption === item}
                          />
                          {
                            option.option_type === 'text'
                            ?
                              <span className='text-lg font-bold'> {item}&#41; {option.option} </span>
                            :
                            <span className='flex gap-2 text-lg font-bold '>
                              {item}&#41;
                              <img src={option.option} height={400} width={800} alt={`option${item}`} className='w-auto h-auto'/>
                            </span>
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


    }
    </>
  )
}

export default TestWatch