import { createReducer } from "@reduxjs/toolkit";


export const userReducer = createReducer({},{
    loginRequest:(state) => {
        state.loading= true;

    },
    loginSuccess:(state,action) => {
        state.loading= false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFail:(state,action) => {
        state.loading= false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },


    registerRequest:(state) => {
        state.loading= true;

    },
    registerSuccess:(state,action) => {
        state.loading= false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFail:(state,action) => {
        state.loading= false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    //logout 
    logoutRequest:(state) => {
        state.loading= true;

    },
    logoutSuccess:(state,action) => {
        state.loading= false;
        state.isAuthenticated = false;
        state.user = null
        state.message = action.payload.message;
    },
    logoutFail:(state,action) => {
        state.loading= false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },


    //loaduser
    loadUserRequest:(state) => {
        state.loading= true;

    },
    loadUserSuccess:(state,action) => {
        state.loading= false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.message = action.payload.message;
    },
    loadUserFail:(state,action) => {
        state.loading= false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },


    clearError:(state) =>{
        state.error = null

    },
    clearMessage:(state) =>{
        state.message = null

    },

})

export const profileReducer = createReducer ({},{
    updateProfileRequest:(state) => {
        state.loading= true;
    },
    updateProfileSuccess:(state,action) => {
        state.loading= false;
        state.message = action.payload.message;
    },
    updateProfileFail:(state,action) => {
        state.loading= false;
        state.error = action.payload;
    },

    //update profile picture
    updateProfilePictureRequest:(state) => {
        state.loading= true;

    },
    updateProfilePictureSuccess:(state,action) => {
        state.loading= false;
        state.message = action.payload.message;
    },
    updateProfilePictureFail:(state,action) => {
        state.loading= false;
        state.error = action.payload;
    },

        //change password reducer
        changePasswordRequest:(state) => {
            state.loading= true;
    
        },
        changePasswordSuccess:(state,action) => {
            state.loading= false;
            state.message = action.payload.message;
        },
        changePasswordFail:(state,action) => {
            state.loading= false;
            state.error = action.payload;
        },
        
        //forget password reducer
         foegetPasswordRequest:(state) => {
            state.loading= true;
            
        },
        foegetPasswordSuccess:(state,action) => {
            state.loading= false;
            state.message = action.payload.message;
        },
        foegetPasswordFail:(state,action) => {
            state.loading= false;
            state.error = action.payload;
        },

        //reset password reducer
        resetPasswordRequest:(state) => {
            state.loading= true;
            
        },
        resetPasswordSuccess:(state,action) => {
            state.loading= false;
            state.message = action.payload.message;
        },
        resetPasswordFail:(state,action) => {
            state.loading= false;
            state.error = action.payload;
        },

    clearError:(state) =>{
        state.error = null

    },
    clearMessage:(state) =>{
        state.message = null

    },
})