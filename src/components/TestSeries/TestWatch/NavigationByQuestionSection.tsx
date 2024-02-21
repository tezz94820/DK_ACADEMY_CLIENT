import { setQuestionInteractionAnalysis, setQuestionNumber, setQuestionsWithUserInteraction, setTabSelected } from '@/app/features/testWatchSlice';
import { ReduxRootState } from '@/app/store';
import axiosClient from '@/axios/axiosClient';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface NavigationByQuestionSectionPropsType {
    tabDetails: { [key: string]: string }
}

const NavigationByQuestionSection = ({ tabDetails }: NavigationByQuestionSectionPropsType) => {

    const router = useRouter();
    const { test_id: testId, test_attempt_id: testAttemptId, test_type: testType } = router?.query;

    //refs
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    //states
    const dispatch = useDispatch();
    const questionsWithUserInteraction = useSelector((state: ReduxRootState) => state.testWatch.questionsWithUserInteraction);
    const selectedOption = useSelector((state: ReduxRootState) => state.testWatch.selectedOption);
    const questionNumber = useSelector((state: ReduxRootState) => state.testWatch.questionNumber);
    const tabSelected = useSelector((state: ReduxRootState) => state.testWatch.tabSelected);


    // questionbox
    const handleQuestionBoxClicked = async (newQuestionNumber: string) => {
        // if no answer is selected and clikced on another question then make it not-answered in db also make sure the question is not review-later
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
        dispatch(setQuestionNumber(newQuestionNumber));
        //handle tab switch if necessary
        let tabToSwitchTo: { tab: string, diff: number } = { tab: '', diff: 0 };
        for (const [key, value] of Object.entries(tabDetails)) {
            const currentDiff = Number(newQuestionNumber) - Number(value);
            if (currentDiff < 0) continue;
            if (tabToSwitchTo.tab === '') {
                tabToSwitchTo.tab = key;
                tabToSwitchTo.diff = currentDiff;
            }
            else if (currentDiff < tabToSwitchTo.diff) {
                tabToSwitchTo.tab = key;
                tabToSwitchTo.diff = currentDiff;
            }
        }
        dispatch(setTabSelected(tabToSwitchTo.tab));
    }

    //auto scrolling to question button
    useEffect(() => {
        const scrollContainer: HTMLDivElement | null = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTop = Number(questionNumber) / 4 * 65;
        }

    }, [tabSelected]);


    //question box states
    useEffect(() => {
        const fetchQuestionUserInteraction = async () => {
            if (!testAttemptId) return;
            try {
                const response = await axiosClient.get(`tests/test/question-states/${testAttemptId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
                dispatch(setQuestionsWithUserInteraction(response.data.data.question_states));
                dispatch(setQuestionInteractionAnalysis(response.data.data.question_interaction_analysis));
            } catch (error: any) {
                const errorMessage = error?.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            }
        }
        fetchQuestionUserInteraction();
    }, [testAttemptId, questionNumber]);



    return (
        <>
            <div ref={scrollContainerRef}>
                <div className=' grid grid-cols-4 p-4 sm:p-2 lg:p-4 gap-4 sm:gap-2 lg:gap-4' >
                    {
                        questionsWithUserInteraction.map(item => (
                            <button key={item.question_number} className={item.question_number === questionNumber ? 'focus-question' : item.user_interaction} onClick={() => handleQuestionBoxClicked(item.question_number)}>Q{item.question_number}</button>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default NavigationByQuestionSection