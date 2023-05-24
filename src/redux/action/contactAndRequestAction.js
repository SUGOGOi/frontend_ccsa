import {server} from "../store"
import axios from "axios"


export const contactRequest = (name,email,message)=> async(dispatch)=>{
   try {
    dispatch({type:"sendContactRequest"});
    const {data} = await axios.post(`${server}/contact`,{name,email,message},{
        headers:{
            "Content-type":"application/json"
        },
        withCredentials:true,
    });
    dispatch({type:"sendContactSuccess"});
    
   } catch (error) {
    dispatch({type:"sendContactFail"});
   }
}

export const requestCourse = ()=> async(dispatch)=>{
    try {
     dispatch({type:"sendRequestCourseRequest"});
     const {data} = await axios.post(`${server}/courserequest`,{},{
         headers:{
             "Content-type":"application/json"
         },
         withCredentials:true,
     });
     dispatch({type:"sendRequestCourseSuccess"});
     
    } catch (error) {
     dispatch({type:"sendRequestCourseFail"});
    }
 }