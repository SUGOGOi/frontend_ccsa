import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, userReducer } from "./reducer/userReducer";


const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer

    }
})


export default store;

export const server  = 'https://ccsabackend.onrender.com/api/v1';