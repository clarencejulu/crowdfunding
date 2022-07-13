import {configureStore} from '@reduxjs/toolkit';
import  modalReducer from './features/modalSlice';
import activeReducer from './features/activeSlice';
// import selectRewardReducer from './features/selectRewardSlice';

export const store = configureStore({
    reducer:{
        modal: modalReducer,
        active: activeReducer,
        // selectReward: selectRewardReducer,
    }
})