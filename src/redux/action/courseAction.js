import { server } from "../store";
import axios from "axios";


export const getAllCourses =()=> async(dispatch) =>{
    try {
        dispatch({type:"loadCourseRequest"});

        const {data} = await axios.get(`${server}/getallcourses`) 
        
    } catch (error) {
        
    }
}