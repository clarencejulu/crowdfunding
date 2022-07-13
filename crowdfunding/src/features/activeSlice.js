import {createSlice} from '@reduxjs/toolkit';
    const initialState = {};

export const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: {
        makeInputActive: (state, action) => {
            document.getElementById(action.payload.id).classList.add('focus');
            document.getElementById(action.payload.inputId).focus();
        },
        makeInputInactive:(state) => {
            if(document.querySelector('.focus')){
                document.querySelector('.focus').classList.remove('focus');
            }           
        },
        showNotification:(state, action) => {
            document.getElementById('wrongValue').style.display = 'block';
            document.getElementById('wrongValue').innerHTML = `Pledge $${action.payload.price} or more`;

            setTimeout(() =>{
                document.getElementById('wrongValue').style.display = 'none';
            }, 2000)
        }
    }
})

export const {makeInputActive, makeInputInactive, showNotification} = activeSlice.actions;
export default activeSlice.reducer;