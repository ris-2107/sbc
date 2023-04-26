import {configureStore} from "@reduxjs/toolkit"
import { adminReducer } from "./reducers/adminReducer";
import { courseReducer } from "./reducers/courseReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";

export const server='http://localhost:4000/api/v1/'

const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        course:courseReducer,
        admin:adminReducer
    }
})

export default store;