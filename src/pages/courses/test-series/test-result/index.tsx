import axiosClient from '@/axios/axiosClient';
import HeaderLayout from '@/components/Header/HeaderLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useInsertionEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link';
import Navbar from '@/components/Header/Navbar';
import Image from 'next/image';

type TestDetailsType = {
    title:string;
    type:string;
    duration:string;
    total_marks:string;
}

const initialTestDetails = {
    title:'',
    type:'',
    duration:'',
    total_marks:'',
}

type SpecificSubjectType = {
    correct_questions: number;
    incorrect_questions: number;
    left_questions: number;
    total_questions: number;
    score_total: number;
    score_acheived: number;
}
type ResultDataType = {
    [key:string]: number | SpecificSubjectType;
    total:SpecificSubjectType;
    physics:SpecificSubjectType;
    physics_numerical:SpecificSubjectType;
    chemistry:SpecificSubjectType;
    chemistry_numerical:SpecificSubjectType;
    mathematics:SpecificSubjectType;
    mathematics_numerical:SpecificSubjectType;
}

const initialResultData:ResultDataType = {
    total:{
        correct_questions: 45,
        incorrect_questions: 45,
        left_questions: 70,
        total_questions: 90,
        score_total: 100,
        score_acheived: 0
    },
    physics:{
        correct_questions: 10,
        incorrect_questions: 10,
        left_questions: 3,
        total_questions: 20,
        score_total: 80,
        score_acheived: 43
    },
    physics_numerical:{
        correct_questions: 5,
        incorrect_questions: 5,
        left_questions: 3,
        total_questions: 10,
        score_total: 40,
        score_acheived: 18
    },
    chemistry:{
        correct_questions: 10,
        incorrect_questions: 10,
        left_questions: 8,
        total_questions: 20,
        score_total: 80,
        score_acheived: 38
    },
    chemistry_numerical:{
        correct_questions: 5,
        incorrect_questions: 5,
        left_questions: 3,
        total_questions: 10,
        score_total: 40,
        score_acheived: 18
    },
    mathematics:{
        correct_questions: 10,
        incorrect_questions: 10,
        left_questions: 8,
        total_questions: 20,
        score_total: 80,
        score_acheived: 38
    },
    mathematics_numerical:{
        correct_questions: 5,
        incorrect_questions: 5,
        left_questions: 3,
        total_questions: 10,
        score_total: 40,
        score_acheived: 18
    }
}

type IndividualSubjectType  = {
    _id: string;
    question_type: string;
    question: string;
    question_pattern: string;
    question_number: string;
    question_subject: string;
    correct_option: string;
    user_interaction: string;
    user_selected_option: string;
    user_answer_is_correct: boolean;
    options: {
        option_name: string;
        option_type: string;
        option: string;
        _id: string;
    }[]
} 

type SubjectQuestionsType  = {
    [key:string] :IndividualSubjectType[];
    physics:IndividualSubjectType[];
    physics_numerical:IndividualSubjectType[];
    chemistry:IndividualSubjectType[];
    chemistry_numerical:IndividualSubjectType[];
    mathematics:IndividualSubjectType[];
    mathematics_numerical:IndividualSubjectType[];
}

// const individualSubject:IndividualSubjectType = {
//     _id: "1",
//     question_type: "text",
//     question: "lorem",
//     question_pattern: "mcq",
//     question_number: "1",
//     question_subject: "physics",
//     correct_option: "A",
//     user_interaction: "answered",
//     user_selected_option: "A",
//     user_answer_is_correct: true,
//     options: [
//         {
//             option_name: "A",
//             option_type: "text",
//             option: "Lorem",
//             _id: "1"
//         }
//     ]
// }

const initialSubjectQuestions:SubjectQuestionsType = {
    physics:[],
    physics_numerical:[],
    chemistry:[],
    chemistry_numerical:[],
    mathematics:[],
    mathematics_numerical:[]
}


const subjects = ['Physics', 'Physics Numerical', 'Chemistry', 'Chemistry Numerical', 'Mathematics', 'Mathematics Numerical']

const TestResult = () => {
    
    const router = useRouter();
    const testId = router.query.test_id;
    const testAttemptId = router.query.test_attempt_id;

    const [testDetails, setTestDetails] = useState<TestDetailsType>(initialTestDetails);
    const [currentTab, setCurrentTab] = useState<string>('performance');
    const [resultData, setResultData] = useState<ResultDataType>(initialResultData);
    const [subjectTab, setSubjectTab] = useState<string>('All Subjects');
    const [subjectQuestions, setSubjectQuestions] = useState<SubjectQuestionsType>(initialSubjectQuestions);
    
    useEffect( () => {
        const fetchTestStartDetails = async () => {
          if(!testId) return;
          try {
            const response = await axiosClient.get(`tests/test-details/${testId}`);
            const data = response.data.data;
            setTestDetails(data);
            
          } catch (error:any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
          }
        }
        fetchTestStartDetails();
    },[router,testId])


    const handleChangeTab = (newTab:string) => {
        setCurrentTab(newTab);
    }

    useEffect( () => {
        const fetchResultData = async () => {
            if(!testAttemptId) return;
            try {
                const response = await axiosClient.get(`tests/test/test-result/${testAttemptId}`,{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setResultData(response.data.data.test_result);
            }
            catch(error:any){
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        
        }
        fetchResultData();
    },[testAttemptId])

    
    useEffect( () => {
        const fetchQuestionsData = async () => {
            if(!testAttemptId) return;
            try {
                const response = await axiosClient.get(`tests/test/test-result/answers/${testAttemptId}`,{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSubjectQuestions(response.data.data.test_questions);
            }
            catch(error:any){
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        
        }
        fetchQuestionsData();
    },[testAttemptId])


    const handleViewSolution = (questionNumber:string) => {
        const newTabUrl = `/courses/test-series/test-solution?test_id=${testId}&question_number=${questionNumber}`;
        window.open(newTabUrl, '_blank');
    }



    console.log('subjectQuestions',subjectQuestions);

  return (
    <div className='pb-10 bg-gray-100'>
        <Navbar/>
        <div className='mt-4.6 py-4 mx-auto w-[75%]'>
            {/* header title and test duration*/}
            <div className='w-full flex justify-between'>
                {/* title */}
                <div className='flex flex-col gap-2 '>
                    <h1 className='text-2xl font-bold'>{testDetails.title}</h1>
                    <Link href={`courses/test-series/instructions/${testId}`} className='font-semibold text-lg text-blue-500 underline underline-offset-4 hover:text-blue-900 w-max'>Re-Attempt Test</Link>
                </div>
                <div className='flex gap-3'>
                    <h1 className='text-xl'>Total Time: <span className='font-bold text-blue-500'>{testDetails.duration}min</span></h1>
                    <span className='text-xl'>|</span>
                    <h1 className='text-xl'>Total Marks: <span className='font-bold text-blue-500'>{testDetails.total_marks}</span></h1>
                    
                </div>
            </div>
        </div>

        {/* performance and answers tab toggle */}
        <div className='w-[30%] mx-auto mt-5  bg-white flex border-2 border-gray-500/50 divide-x-4 rounded-lg overflow-hidden'>
            <button className={`px-5 py-2 w-full text-lg font-bold ${currentTab === 'performance' ? 'bg-blue-500 text-white' : ''} `} onClick={() => handleChangeTab('performance')}>Your Performance</button>
            <button className={`px-5 py-2 w-full text-lg font-bold ${currentTab === 'answers' ? 'bg-blue-500 text-white' : ''} `} onClick={() => handleChangeTab('answers')}>Your Answers</button>
        </div>

        {/* As Per subject filter */}
         
        { 
        currentTab === 'answers' &&
        <div className='mx-auto w-[75%] my-10'>
            <select className='py-1 px-4 text-xl font-bold border-2 border-gray-500/50 rounded-lg cursor-pointer' 
                onChange={(e) => setSubjectTab(e.target.value)}
            >
                {
                    ['All Subjects',...subjects].map( subject => (
                        <option key={subject} value={subject}> {subject} </option>
                    ))
                }
            </select>
        </div>
        }

        {/* tab content  */}
        <div className='mt-10 mx-auto w-[75%] bg-white pt-10'>
            {
                currentTab === 'performance' ?
                <div>
                    {/* score and bar component */}
                    <div className='mx-40 flex flex-col gap-5 '>
                        {/* score */}
                        <div className='flex justify-center items-center'>
                            <div className='flex flex-col '>
                                <span className='text-lg font-semibold'>Score</span>
                                <span className='text-5xl font-bold'>{resultData.total.score_acheived} <sup className='text-sm font-normal'>{(resultData.total.score_acheived/resultData.total.score_total*100).toFixed(1)}%</sup></span>
                                <span className='text-lg font-semibold'>out of {resultData.total.score_total}</span>
                            </div>
                        </div>
                        {/* hr */}
                        <div className='w-full h-0.5 bg-gray-500'/>
                        {/* bar component */}
                        <div className='mt-2'>
                            <div className='w-[80%] mx-auto '>
                                {/* upper list */}
                                <ul className='w-[80%] flex justify-between'>
                                    <li>Questions</li>
                                    <li className='flex items-center gap-1 '>
                                        <div className='h-[60%] aspect-square bg-sky-400'/>
                                        <span className='align-middle'>%</span>
                                        <span className='align-middle'>Correct</span>
                                    </li>
                                    <li className='flex items-center gap-1 '>
                                        <div className='h-[60%] aspect-square bg-rose-700'/>
                                        <span className='align-middle'>%</span>
                                        <span className='align-middle'>Incorrect</span>
                                    </li>
                                </ul>
                                {/* middle main bar */}
                                <div className='flex w-full h-8 bg-gray-300 my-2'>
                                    <div className="bg-sky-400 " style={{width:`${Math.round(resultData.total.correct_questions/resultData.total.total_questions*100)}%`, transition: "width 1.5s ease"}} />
                                    <div className="bg-rose-700 " style={{width:`${Math.round(resultData.total.incorrect_questions/resultData.total.total_questions*100)}%`, transition: "width 1.5s ease"}} />
                                </div>
                                {/* lower list */}
                                <ul className='w-[80%] flex justify-between'>
                                    <li>Correct <span className='font-bold'>{resultData.total.correct_questions}</span></li>
                                    <li>Incorrect <span className='font-bold'>{resultData.total.incorrect_questions}</span></li>
                                    <li>Left <span className='font-bold'>{resultData.total.left_questions}</span></li>
                                    <li>Total Questions <span className='font-bold'>{resultData.total.total_questions}</span></li>
                                </ul>
                            </div>                    
                        </div>
                    </div>

                    {/* score snd questions detailed analysis */}
                    <div className='mx-20  mt-10'>
                        <div className='w-full flex'>
                            <p className='w-[30%] text-center align-middle'>Score</p>
                            <p className='w-[70%] text-center align-middle'>Questions</p>
                        </div>
                        {/* hr */}
                        <div className='w-full mt-2 h-0.5 bg-gray-500'/>
                        <div className='flex '>
                            {/* score */}
                            <div className='w-[30%] flex flex-col gap-0.5'>
                                {
                                    subjects.map( subject => (
                                        <div key={subject} className='flex flex-col h-20'>
                                            <p className='font-semibold'>{subject}</p>
                                            <p className=''>
                                                <span className='font-semibold text-xl text-blue-500 '>{(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).score_acheived}</span>
                                                /
                                                <span className='font-semibold'>{(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).score_total}</span>
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                            {/* questions */}
                            <div className='w-[70%] flex flex-col gap-0.5'>
                            {
                                subjects.map( subject => (
                                    <div key={subject} className=' h-20 bg-green border border-gray-400 flex flex-col items-center justify-center'>
                                        <div className='w-[80%] h-8 bg-gray-300 flex'>
                                            <div className="bg-sky-400" style={{width:`${Math.round((resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).correct_questions/(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).total_questions*100)}%`, transition: "width 1.5s ease"}} />
                                            <div className="bg-rose-700" style={{width:`${Math.round((resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).incorrect_questions/(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).total_questions*100)}%`, transition: "width 1.5s ease"}} />
                                        </div>
                                        <ul className='w-[80%] flex justify-between'>
                                            <li>Correct <span className='font-bold'>{(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).correct_questions}</span></li>
                                            <li>Incorrect <span className='font-bold'>{(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).incorrect_questions}</span></li>
                                            <li>Left <span className='font-bold'>{(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).left_questions}</span></li>
                                            <li>Total Questions <span className='font-bold'>{(resultData[subject.replace(' ','_').toLowerCase()] as SpecificSubjectType).total_questions}</span></li>
                                        </ul>
                                    </div>
                                ))
                            }
                            </div>
                        </div>

                    </div>
                </div>
                
                :

                <div className='mx-5 flex flex-col gap-5'>
                    {/* subject name */}
                    {/* if all subjects then show all the questions and any particular subject is chosen then show only that subject. */}
                    {
                        (subjectTab === 'All Subjects' ? subjects : [subjectTab]).map( subjectName => (
                            <div key={subjectName}>
                                {/* subjectname */}
                                <h1 className='text-2xl font-bold text-blue-600 mb-5'>{subjectName}</h1>
                                {
                                    subjectQuestions[subjectName.replace(' ','_').toLowerCase()].map( (question) => (
                                        <div key={question._id} className=''>
                                            {/* question number, correct answer,user interaction for a particular question  */}
                                            <div className='flex justify-between mb-3'>
                                                <div  className='flex gap-4'>
                                                    <p className='text-lg font-bold'>Q{question.question_number}</p>
                                                    {   ['answered','marked-answered'].includes(question.user_interaction) &&
                                                        <p>
                                                            {
                                                                question.user_answer_is_correct ? 
                                                                <span className='text-green-500 text-lg font-bold'>Correct Answer</span>
                                                                :
                                                                <span className='text-red-500 text-lg font-bold'>Wrong Answer</span>
                                                            }
                                                        </p>

                                                    }
                                                </div>
                                                <p className='text-lg font-bold'>
                                                    {question.user_interaction === 'not-visited' && <span>Not Visited</span>}
                                                    {question.user_interaction === 'answered' && <span>Answered</span>}
                                                    {question.user_interaction === 'not-answered' && <span>Not Answered</span>}
                                                    {question.user_interaction === 'marked' && <span className='bg-marked'>Marked For review</span>}
                                                    {question.user_interaction === 'marked-answered' && <span className='bg-marked'>Marked for Review and submitted for evaluation</span>}
                                                </p>
                                            </div>

                                            {/* question content and its options  */}
                                            <div className='border-2 border-black rounded-lg p-2 w-full'>
                                                {/* question */}
                                                {
                                                    question.question_type === 'text' ?
                                                        <p className='text-lg'>{question.question}</p>
                                                    :
                                                        <Image src={question.question} height={500} width={500} alt="question" className="w-[95%] h-auto" />
                                                }
                                                {/* options */}
                                                {
                                                    question.question_pattern === 'mcq' && question.options.map( option => (
                                                        <div key={option.option_name} className='text-lg flex gap-4 items-center'>
                                                            <p className='text-lg font-bold'>{option.option_name}</p>
                                                            {
                                                                option.option_type === 'text' ?
                                                                    <p className='text-lg'>{option.option}</p>
                                                                :
                                                                    <Image src={option.option} height={500} width={500} alt="option" className="w-auto h-auto" />
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            {/* correact option, user selected option and view solution  */}
                                            <div className='flex justify-between mt-2 '>
                                                <div className='flex items-center gap-16'>
                                                    <p className='text-lg'>Your Answer: (<span className='font-bold'>{question.user_selected_option === '' ? 'NA' : question.user_selected_option}</span>)</p>
                                                    <hr className='h-6 w-1 bg-black/70'/>
                                                    <p className='text-lg'>Correct Option: (<span className='font-bold'>{question.correct_option === '' ? 'NA' : question.correct_option}</span>)</p>
                                                </div>
                                                <button className='text-lg font-semibold text-blue-500 underline underline-offset-4'
                                                    onClick={ () => handleViewSolution(question.question_number) }
                                                >View Solution</button>
                                            </div>
                                            
                                            <hr className='w-full h-1 bg-black/50 rounded-full my-5 '/>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            }


        </div>

    </div>
  )
}

export default TestResult