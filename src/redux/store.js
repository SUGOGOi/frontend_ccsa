import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, subscriptionReducer, userReducer } from "./reducer/userReducer";
import { courseReducer } from "./reducer/courseReducer";


const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        course:courseReducer,
        subscription:subscriptionReducer,
    }
})


export default store;

export const server  = 'https://ccsabackend.onrender.com/api/v1';