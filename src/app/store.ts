import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';


export interface ReduxRootState {
  auth: {
    isLoggedIn: boolean;
  };
}

const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})

export default store;