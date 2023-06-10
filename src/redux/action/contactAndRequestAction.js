import { server } from '../store';
import axios from 'axios';

export const contactRequest = (name, email, message) => async dispatch => {
  try {
    dispatch({ type: 'sendContactRequest' });
    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'sendContactSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'sendContactFail', payload: error.response.data.message });
  }
};

export const requestCourse = (name, email, course) => async dispatch => {
  try {
    dispatch({ type: 'sendRequestCourseRequest' });
    const { data } = await axios.post(
      `${server}/courserequest`,
      { name, email, course },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'sendRequestCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'sendRequestCourseFail',
      payload: error.response.data.message,
    });
  }
};
