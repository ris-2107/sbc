import axios from 'axios';
import { server } from '../store';


export const getAllCourses=()=>async dispatch=>{
    try {
        dispatch({
            type: 'allCoursesRequest',
          });
      
          const { data } = await axios.get(`${server}courses`);
          dispatch({
            type: 'allCoursesSuccess',
            payload:data.courses
          });

        
    } catch (error) {
        alert("Some Error Occured")
        dispatch({
            type: 'allCoursesFail',
            payload:error.response.data.message
          });
        
    }
}