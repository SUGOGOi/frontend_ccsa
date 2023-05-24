import { createReducer } from "@reduxjs/toolkit";

export const contactReducer = new createReducer({},{
    sendContactRequest :(state) =>{
        state.loading = true;
    },
    sendContactSuccess :(state,action) =>{
        state.loading = false;
        state.message = action.payload;
    },
    sendContactFail :(state,action) =>{
        state.loading = false;
        state.error = action.payload;
    },
    sendRequestCourseRequest :(state) =>{
        state.loading = true;
    },
    sendRequestCourseSuccess :(state,action) =>{
        state.loading = false;
        state.message = action.payload;
    },
    sendRequestCourseFail :(state,action) =>{
        state.loading = false;
        state.error = action.payload;
    },


    clearMessage: (state) =>{
        state.message = null;
    },
    clearError: (state)=>{
        state.error = null;
    }

})