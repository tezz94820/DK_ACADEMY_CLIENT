import {configureStore} from '@reduxjs/toolkit';
import authReducer, { authStateType } from './features/authSlice';
import testWatchSlice, { TestWatchType } from './features/testWatchSlice';


export interface ReduxRootState {
    auth: authStateType,
    testWatch: TestWatchType
}

const store = configureStore({
    reducer:{
        auth: authReducer,
        testWatch: testWatchSlice
    }
})

export default store;