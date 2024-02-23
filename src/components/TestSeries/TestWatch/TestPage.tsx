import { ReduxRootState } from '@/app/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Timer from './Timer';
import Video from './Video';
import { setCurrentQuestion, setDuration, setMobileToggle, setQuestionNumber, setSelectedOption, setShowSummary, setTabSelected, setTestDetails, setTestSummaryDetails, setTimer } from '@/app/features/testWatchSlice';
import axiosClient from '@/axios/axiosClient';
import { toast } from 'react-toastify';
import SolutionsCountWithColor from './SolutionsCountWithColor';
import NavigationByQuestionSection from './NavigationByQuestionSection';
import QuestionActionButtons from './QuestionActionButtons';
import Image from 'next/image';
import VideoPlayer from '@/components/VideoPlayer';
import MobileToggle from './MobileToggle';

let tabs: string[] = ['PHYSICS', 'PHYSICS NUMERICAL', 'CHEMISTRY', 'CHEMISTRY NUMERICAL', 'MATHEMATICS', 'MATHEMATICS NUMERICAL'];
let tabDetails: { [key: string]: string } = { 'PHYSICS': '1', 'PHYSICS NUMERICAL': '21', 'CHEMISTRY': '31', 'CHEMISTRY NUMERICAL': '51', 'MATHEMATICS': '61', 'MATHEMATICS NUMERICAL': '81' };

interface TestPagePropsType {
    handleEntireTestSubmit: () => void,
    handleFullScreenEnabled: () => void
}
const TestPage = ({ handleEntireTestSubmit, handleFullScreenEnabled }: TestPagePropsType) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { test_id: testId, test_attempt_id: testAttemptId, test_type: testType } = router?.query;

    //states
    const testDetails = useSelector((state: ReduxRootState) => state.testWatch.testDetails);
    const tabSelected = useSelector((state: ReduxRootState) => state.testWatch.tabSelected);
    const currentQuestion = useSelector((state: ReduxRootState) => state.testWatch.currentQuestion);
    const questionNumber = useSelector((state: ReduxRootState) => state.testWatch.questionNumber);
    const selectedOption = useSelector((state: ReduxRootState) => state.testWatch.selectedOption);
    const fullScreenEnabled = useSelector((state: ReduxRootState) => state.testWatch.fullScreenEnabled);
    const mobileToggle = useSelector((state: ReduxRootState) => state.testWatch.mobileToggle);


    //get test start details
    useEffect(() => {
        const fetchTestStartDetails = async () => {
            if (!testId) return;
            try {
                const response = await axiosClient.get(`tests/test-start/${testId}`);
                const data = response.data.data;
                dispatch(setTestDetails({ _id: data._id, title: data.title, duration: data.duration, type: data.type, total_questions: data.total_questions }));
                dispatch(setDuration(Number(data.duration) * 60));
                dispatch(setTimer(Number(data.duration) * 60));
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        }
        fetchTestStartDetails();
    }, [router, testId]);

    //setting the structure specific to testType as flt,ma,ch,ph
    useEffect(() => {
        if (!testType) return;
        if (testType !== 'flt') {
            // filtering the tabs according to testType and initially setting the tabs[0] as the selected tab
            tabs = tabs.filter(item => item.split(' ')[0].toLowerCase() === (testType as string).toLowerCase());
            dispatch(setTabSelected(tabs[0]));
            //setting the tabDetails selected testType as 1 and its numerical as 21 and deleting all other
            for (const tab in tabDetails) {
                if (tab.split(' ')[0].toLowerCase() !== (testType as string).toLowerCase()) {
                    delete tabDetails[tab];
                }
            }
            tabDetails[(testType as string).toUpperCase()] = '1';
            tabDetails[(testType as string).toUpperCase() + ' NUMERICAL'] = '21';
        }
    }, [testType])


    // fetch individual question by question number
    useEffect(() => {
        const fetchQuestionByQuestionNumber = async () => {
            if (!testId) return;
            if (!questionNumber) return;
            try {
                // get the question content by questionNumber
                const response = await axiosClient.get(`tests/test/question/${testId}/${questionNumber}`);
                dispatch(setCurrentQuestion(response.data.data));
                // get the selected option from backend
                const res = await axiosClient.get(`tests/test/selected-option-by-question/${testAttemptId}/${questionNumber}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                dispatch(setSelectedOption(res.data.data.selected_option));
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        }

        fetchQuestionByQuestionNumber();
    }, [testId, questionNumber, testAttemptId])


    const handleTabClicked = (newTab: string) => {
        // set the new tab selected
        dispatch(setTabSelected(newTab));
        // set the queestion number according to tab
        dispatch(setQuestionNumber(tabDetails[newTab]));
    }

    //option
    const handleOptionChange = (optionName: string) => {
        dispatch(setSelectedOption(optionName));
    }


    const handleTestSubmitToSummary = async () => {
        dispatch(setShowSummary(true));
        try {
            const res = await axiosClient.get(`tests/test/test-summary/${testAttemptId}`, { headers: { 'Authorization': "Bearer " + localStorage.getItem("token") } });
            dispatch(setTestSummaryDetails(res.data.data.test_summary));
        } catch (error: any) {
            const message = error?.response?.data?.message || "An error occurred";
            toast.error(message);
        }
    }

    const handleMobileToggle = () => {
        dispatch(setMobileToggle(!mobileToggle));
    }

    return (
        <>
            <div className='w-screen h-screen overflow-hidden select-none relative'>
                {
                    mobileToggle && <MobileToggle tabDetails={tabDetails} handleTestSubmitToSummary={handleTestSubmitToSummary}/>
                }
                <div className='h-[13%] relative w-full'>
                    {
                        !fullScreenEnabled && 
                            <div className='flex justify-center items-center px-6 h-full w-full z-20 absolute bg-red-500 '>
                                <button className={`border border-green-800 bg-green-700 px-4 py-2 text-white font-bold text-xl rounded-lg animate-pulse hover:text-green-700 hover:bg-white hover:animate-none`} onClick={handleFullScreenEnabled}>Enable FullScreen Mode</button>
                            </div>
                    }
                    {/* test header 13*/}
                    <div className='flex justify-between items-center px-2 sm:px-4 lg:px-6 h-full w-full '>
                        <h2 className='text-base sm:text-lg lg:text-2xl font-bold pr-0.5'>{testDetails.title}</h2>
                        <div className='flex items-center gap-2 h-full'>
                            <Timer handleEntireTestSubmit={handleEntireTestSubmit} />
                            <div className='hidden sm:block h-[95%] w-auto my-auto'>
                                <Video />
                            </div>
                            {/* submit test button */}
                            <div className='hidden sm:flex justify-center items-center'>
                                <button className='border-2 border-red-500 px-5 py-1  rounded-lg h-max text-red-500 hover:bg-red-500 hover:text-white font-bold' onClick={handleTestSubmitToSummary}>Submit Test</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* tabs 8*/}
                <div className='w-full bg-blue-800 h-[8%] flex items-center scrollbar-white overflow-x-scroll' >
                    <div className={` flex gap-6 w-full sm:w-[75%] px-2 sm:px-6 `}>
                        {
                            tabs.map(tab => (
                                <div key={tab}>
                                    <h3 className={`text-base text-white cursor-pointer font-semibold whitespace-nowrap ${tabSelected === tab ? 'underline underline-offset-8' : ''}`} onClick={() => handleTabClicked(tab)}>{tab}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* test content 79 */}
                <div className='w-full flex h-[79%]'>

                    {/* test section */}
                    <div className='w-full sm:w-[75%]'>
                        {/* test questions and answers */}
                        <div className='w-full h-[85%] border-2 border-y-blue-600 p-2 overflow-auto relative '>
                            {/* question number */}
                            <p className='text-blue-800 font-bold tracking-widest'>Q{currentQuestion.question_number}</p>
                            {/* question */}
                            {
                                currentQuestion.question_type === 'text'
                                    ?
                                    <p className='text-xl'>{currentQuestion.question}</p>
                                    :
                                    <img src={currentQuestion.question} height={400} width={800} alt="question" className='w-full h-auto' />
                            }
                            {/* options */}
                            {
                                currentQuestion.question_pattern === 'mcq' ?

                                    <div className='flex flex-col mt-5 gap-4'>
                                        {
                                            ['A', 'B', 'C', 'D'].map(item => {
                                                const option = currentQuestion.options.filter(opt => opt.option_name === item)[0];
                                                return (
                                                    <label key={item} className={`flex items-center cursor-pointer w-full p-2 ${selectedOption === item ? 'bg-green-100' : ''} `}>
                                                        <input type="radio" name="selectedOption" value={item} className='mr-2 h-5 w-5 my-auto'
                                                            onChange={() => handleOptionChange(item)}
                                                            checked={selectedOption === item}
                                                        />
                                                        <span className='font-bold mr-3'>{item}&#41;</span>
                                                        {
                                                            option.option_type === 'text'
                                                                ?
                                                                <span className='text-xl flex items-center justify-center '>{option.option}</span>
                                                                :
                                                                <div className='flex items-center justify-center'>
                                                                    <img src={option.option} height={400} width={800} alt={`option${item}`} className='w-auto h-auto' />
                                                                </div>
                                                        }
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>

                                    :
                                    //for numerical value
                                    <div className='mt-5  '>
                                        <form onSubmit={e => e.preventDefault()}>
                                            <input type="text" pattern="-?\d+(\.\d+)?" title="Enter a numerical value"
                                                className='rounded w-1/2 h-12 text-xl pl-3 border border-black'
                                                onChange={e => handleOptionChange(e.target.value)}
                                                value={selectedOption}
                                            />
                                            <div className={`${(/-?\d+(\.\d+)?/.test(selectedOption) || selectedOption === '') ? 'hidden' : 'block'}  w-max py-2 px-4 mt-2 flex bg-yellow-400 rounded-full`} >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                <span className=''>Warning: Enter Numerical value!</span>
                                            </div>
                                        </form>

                                    </div>

                            }
                            {/* mobile toggle button */}
                            <div className={`flex sm:hidden h-10 items-center justify-center aspect-square absolute bottom-2 right-1 rounded-full bg-blue-800 p-0.5 ${mobileToggle ? 'translate-x-[-60vw]' : ''}`} onClick={handleMobileToggle}>
                                {
                                    mobileToggle ? 
                                        <Image height={30} width={30} alt="toggle" src="/arrow_right.svg" className='h-full w-full' />
                                    :
                                        <Image height={30} width={30} alt="toggle" src="/arrow_left.svg" className='h-full w-full' />
                                }
                            </div>
                        </div>
                        {/* test question selection buttons  */}
                        <QuestionActionButtons />
                    </div>

                    {/* right question button section */}
                    <div className='hidden sm:block w-[25%]'>
                        {/* question information section */}
                        <div className='h-[45%] px-3 border-2 border-l-blue-600'>
                            <SolutionsCountWithColor />
                        </div>
                        {/* Question buttons */}
                        <div className='h-[54%] overflow-y-scroll border-2 border-blue-600'>
                            <NavigationByQuestionSection tabDetails={tabDetails} />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default TestPage