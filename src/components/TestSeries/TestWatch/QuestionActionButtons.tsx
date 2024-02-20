import { decrementQuestionNumber, incrementQuestionNumber, setSelectedOption } from '@/app/features/testWatchSlice';
import { ReduxRootState } from '@/app/store';
import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const QuestionActionButtons = () => {


    const router = useRouter();
    const dispatch = useDispatch();
    const { test_attempt_id: testAttemptId } = router?.query;
    
    //states
    const selectedOption = useSelector((state: ReduxRootState) => state.testWatch.selectedOption);
    const questionNumber = useSelector((state: ReduxRootState) => state.testWatch.questionNumber);
    const questionsWithUserInteraction = useSelector((state: ReduxRootState) => state.testWatch.questionsWithUserInteraction);



    const handleReviewLater = async () => {
        const userInteraction = selectedOption === "" ? "marked" : "marked-answered";
        // saving the user selected option with appropriate marked user_interaction
        try {
            const response = await axiosClient.post(
                'tests/test/option-user-interaction',
                { test_attempt_id: testAttemptId, question_number: questionNumber, option: selectedOption, user_interaction: userInteraction },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
        // increment question number
        dispatch(incrementQuestionNumber());
    }


    const handleBackQuestionButton = async () => {
        // if no answer is selected and the question is not review later then  clikced on another question then make it not-answered in db
        const isReviewLater = questionsWithUserInteraction.find(q => q.question_number === questionNumber && q.user_interaction === 'marked');
        if (selectedOption === '' && !isReviewLater) {
            try {
                const response = await axiosClient.post(
                    'tests/test/option-user-interaction',
                    { test_attempt_id: testAttemptId, question_number: questionNumber, option: "", user_interaction: "not-answered" },
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        }

        dispatch(decrementQuestionNumber());
    }

    const handleSaveAndNext = async () => {
        try {
            // saving the user selected option with answered user_interaction
            const response = await axiosClient.post(
                'tests/test/option-user-interaction',
                { test_attempt_id: testAttemptId, question_number: questionNumber, option: selectedOption, user_interaction: "answered" },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
        // increment question number
        dispatch(incrementQuestionNumber());
    }

    //back and next
    const handleNextQuestionButton = async () => {
        // if no answer is selected and the question is not review later then  clikced on another question then make it not-answered in db
        const isReviewLater = questionsWithUserInteraction.find(q => q.question_number === questionNumber && q.user_interaction === 'marked');
        if (selectedOption === '' && !isReviewLater) {
            try {
                const response = await axiosClient.post(
                    'tests/test/option-user-interaction',
                    { test_attempt_id: testAttemptId, question_number: questionNumber, option: "", user_interaction: "not-answered" },
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        }

        dispatch(incrementQuestionNumber());
    }

    const handleClearSelection = async () => {
        dispatch(setSelectedOption(''));
        // saving the user selected option as empty with  user_interaction as not-answered
        try {
            const response = await axiosClient.post(
                'tests/test/option-user-interaction',
                { test_attempt_id: testAttemptId, question_number: questionNumber, option: "", user_interaction: "not-answered" },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }



    return (
        <>
            <div className='w-full h-[15%] flex flex-col sm:flex-row justify-evenly sm:justify-between items-center px-1 sm:px-5'>
                <div className='flex gap-3'>
                    <button className={`px-5 py-1 text-xs sm:text-base font-bold border-2 border-red-500 text-red-500 rounded-lg h-max ${selectedOption === '' ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:bg-red-500 hover:text-white'}`} disabled={selectedOption === ''} onClick={handleSaveAndNext}>Save & Next</button>
                    <button className='px-5 py-1 text-xs sm:text-base font-bold border-2 border-purple-500 text-purple-500 rounded-lg h-max hover:bg-purple-500 hover:text-white' onClick={handleReviewLater}>Review Later</button>
                    <button className={`px-5 py-1 text-xs sm:text-base font-bold border-2 border-blue-800 text-blue-800 rounded-lg h-max ${selectedOption === '' ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:bg-blue-800 hover:text-white'}`} disabled={selectedOption === ''} onClick={handleClearSelection}>Clear Selection</button>
                </div>
                <div className='flex gap-3'>
                    <button className='px-5 py-1 text-xs sm:text-base font-bold border-2 border-blue-500 text-blue-500 rounded-lg h-max hover:bg-blue-500 hover:text-white' onClick={handleBackQuestionButton}>&larr; Back</button>
                    <button className='px-5 py-1 text-xs sm:text-base font-bold border-2 border-blue-500 text-blue-500 rounded-lg h-max hover:bg-blue-500 hover:text-white' onClick={handleNextQuestionButton}>Next &rarr;</button>
                </div>
            </div>
        </>
    )
}

export default QuestionActionButtons