import {configureStore} from '@reduxjs/toolkit';
import  modalReducer from './features/modalSlice';
import activeReducer from './features/activeSlice';

export const store = configureStore({
    reducer:{
        modal: modalReducer,
        active: activeReducer,
    }
})