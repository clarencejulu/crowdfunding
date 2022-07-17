import {createSlice} from '@reduxjs/toolkit';
    const initialState = { on: false, thankYou: false, menu: false
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        onModal: (state) => {
            state.on = true;
            state.menu = false;
            if(!(document.getElementById('container').classList.contains("body-overlay"))){
                document.getElementById('container').classList.add("body-overlay");
            }
        },
        offModal: (state) => {
            state.on = false;
            state.thankYou = false;
            state.menu = false;
            document.getElementById('container').classList.remove("body-overlay");
        },
        activateModal: (state, action) => {
            state.on = true;
            const {id, fromModal} = action.payload;

            setTimeout(()=>{
                if(!(document.getElementById('container').classList.contains("body-overlay"))){
                    document.getElementById('container').classList.add("body-overlay");
                } 
                
                if(document.querySelector('.active')){
                    document.querySelector('.active').classList.remove("active");
                }

                document.getElementById(id).classList.add("active");

                if(fromModal){
                    document.getElementById(id).scrollIntoView();
                }
            }, 0);
        },
        thankYouModal: (state) => {
            state.on = false;
            state.thankYou = true;
        },
        menuModal: (state) => {
            state.menu = true;
            document.getElementById('container').classList.add("body-overlay");
        }
    }
})

export const {onModal, offModal, activateModal, thankYouModal, menuModal} = modalSlice.actions;
export default modalSlice.reducer;
    