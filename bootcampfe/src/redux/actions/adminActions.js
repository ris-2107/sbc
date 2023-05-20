import axios from 'axios';
import { server } from '../store';

export const createCourse=(title,description,category,createdBy,image)=>async dispatch=>{
    try {
        const config={
            headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true,
        }
        dispatch({
            type: 'createCourseRequest ',
          });
      
          const { data } = await axios.post(`${server}createcourseuser`,{
            title,description,category,createdBy,file:image
          },config);

          
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