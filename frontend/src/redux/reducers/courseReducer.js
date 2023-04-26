import { createReducer } from "@reduxjs/toolkit";

export const courseReducer= createReducer({courses:[ ]},{
    allCoursesRequest:(state)=>{
        state.loading=true;
    },
    allCoursesSuccess:(state,action)=>{
        state.loading=true;
        state.courses=action.payload
    },
    allCoursesFail:(state,action)=>{
        state.loading=true;
        state.error=action.payload
    },

}
    
    )