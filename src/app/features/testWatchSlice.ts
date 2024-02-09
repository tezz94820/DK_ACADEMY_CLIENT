import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//constants 
let tabs: string[] = ['PHYSICS', 'PHYSICS NUMERICAL', 'CHEMISTRY', 'CHEMISTRY NUMERICAL', 'MATHEMATICS', 'MATHEMATICS NUMERICAL'];
let summaryTabs = ['TOTAL', 'PHYSICS', 'PHYSICS NUMERICAL', 'CHEMISTRY', 'CHEMISTRY NUMERICAL', 'MATHEMATICS', 'MATHEMATICS NUMERICAL'];


// types and initialStates
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

const initialCurrentQuestion: currentQuestionType = {
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
    question_number: string;
    user_interaction: string;
}

type questionInteractionAnalysisType = {
    "not-visited": string;
    "answered": string;
    "not-answered": string;
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


type TestSummaryDetailsType = {
    total: {
        total_questions: number;
        answered: number;
        not_answered: number;
        marked_review: number;
        not_visited: number;
    }
    physics: {
        total_questions: number;
        answered: number;
        not_answered: number;
        marked_review: number;
        not_visited: number;
    },
    physics_numerical: {
        total_questions: number;
        answered: number;
        not_answered: number;
        marked_review: number;
        not_visited: number;
    },
    chemistry: {
        total_questions: number;
        answered: number;
        not_answered: number;
        marked_review: number;
        not_visited: number;
    },
    chemistry_numerical: {
        total_questions: number;
        answered: number;
        not_answered: number;
        marked_review: number;
        not_visited: number;
    },
    mathematics: {
        total_questions: number;
        answered: number;
        not_answered: number;
        marked_review: number;
        not_visited: number;
    },
    mathematics_numerical: {
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

const initialTestsummaryDetails: TestSummaryDetailsType = {
    total: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    },
    physics: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    },
    physics_numerical: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    },
    chemistry: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    },
    chemistry_numerical: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    },
    mathematics: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    },
    mathematics_numerical: {
        total_questions: 0,
        answered: 0,
        not_answered: 0,
        marked_review: 0,
        not_visited: 0
    }
}






 export interface TestWatchType {
    testDetails: testDetailsType,
    tabSelected: string,
    currentQuestion: currentQuestionType,
    questionNumber: string,
    duration: number,
    timer: number,
    selectedOption: string,
    questionsWithUserInteraction: questionsWithUserInteractionType[],
    questionInteractionAnalysis: questionInteractionAnalysisType,
    fullScreenEnabled: boolean,
    showSummary: boolean,
    summaryTabSelected: string,
    testSummaryDetails: TestSummaryDetailsType,
    showSubmitModal: boolean
}



const initialState: TestWatchType = {
    testDetails: initialTestDetails,
    tabSelected: tabs[0],
    currentQuestion: initialCurrentQuestion,
    questionNumber: '1',
    duration: 180 * 60,
    timer: 180 * 60,
    selectedOption: '',
    questionsWithUserInteraction: [],
    questionInteractionAnalysis: initialQuestionInteractionAnalysis,
    fullScreenEnabled: true,
    showSummary: false,
    summaryTabSelected: summaryTabs[0],
    testSummaryDetails: initialTestsummaryDetails,
    showSubmitModal: false
}



const TestWatchSlice = createSlice({
    name: 'testWatch',
    initialState,
    reducers: {
        setTestDetails: (state, action: PayloadAction<testDetailsType>) => {
            state.testDetails = action.payload;
        },
        setTabSelected: (state, action: PayloadAction<string>) => {
            state.tabSelected = action.payload;
        },
        setCurrentQuestion: (state, action: PayloadAction<currentQuestionType>) => {
            state.currentQuestion = action.payload;
        },
        setQuestionNumber: (state, action: PayloadAction<string>) => {
            state.questionNumber = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setTimer: (state, action: PayloadAction<number>) => {
            state.timer = action.payload;
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
        },
        setQuestionsWithUserInteraction: (state, action: PayloadAction<questionsWithUserInteractionType[]>) => {
            state.questionsWithUserInteraction = action.payload;
        },
        setQuestionInteractionAnalysis: (state, action: PayloadAction<questionInteractionAnalysisType>) => {
            state.questionInteractionAnalysis = action.payload;
        },
        setFullScreenEnabled: (state, action: PayloadAction<boolean>) => {
            state.fullScreenEnabled = action.payload;
        },
        setShowSummary: (state, action: PayloadAction<boolean>) => {
            state.showSummary = action.payload;
        },
        setSummaryTabSelected: (state, action: PayloadAction<string>) => {
            state.summaryTabSelected = action.payload;
        },
        setTestSummaryDetails: (state, action: PayloadAction<TestSummaryDetailsType>) => {
            state.testSummaryDetails = action.payload;
        },
        setShowSubmitModal: (state, action: PayloadAction<boolean>) => {
            state.showSubmitModal = action.payload;
        },
        incrementQuestionNumber: (state) => {
            const { questionNumber } = state;
            if(questionNumber !== state.testDetails.total_questions){
                state.questionNumber = (Number(questionNumber) + 1).toString();
            } 
        },
        decrementQuestionNumber: (state) => {
            const { questionNumber } = state;
            if(questionNumber !== '1'){
                state.questionNumber = (Number(questionNumber) - 1).toString();
            }
        },
        decrementTimer: (state) => {
            const { timer } = state;
            state.timer = timer === 0 ? 0 : timer-1;
        },
        

    }
})

export default TestWatchSlice.reducer;

export const {
    setTestDetails,
    setTabSelected,
    setCurrentQuestion,
    setQuestionNumber,
    setDuration,
    setTimer,
    setSelectedOption,
    setQuestionsWithUserInteraction,
    setQuestionInteractionAnalysis,
    setFullScreenEnabled,
    setShowSummary,
    setSummaryTabSelected,
    setTestSummaryDetails,
    setShowSubmitModal,
    incrementQuestionNumber,
    decrementQuestionNumber,
    decrementTimer,
} = TestWatchSlice.actions;