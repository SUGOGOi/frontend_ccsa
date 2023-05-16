import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = new createReducer({},{
    loadCourseReuest:(state) =>{
        state.loading = true;

    },
    loadCourseSuccess:(state,action) =>{
        state.loading = false;
        state.course = action.payload.course
        state.message = action.payload.message


    },
    loadCourseFail:(state) =>{
        state.loading = false;
        state.error = action.payload;


    }

})