import axios from "axios";
import { server } from "../store";
import { useNavigate } from "react-router-dom";
//import { GlobalNote } from "../../../../backend/models/GlobalNote";



export const register = (formData) => async (dispatch) => {

  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(`${server}register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "registerSuccess",
      payload: data.message,
    });

    alert("Otp String sent to your email");
    window.location.href = '/otp-page'
    //navigate('/otp-page')

  } catch (error) {
    alert(error.response.data.message);
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProfileNew = (formData) => async (dispatch) => {
  console.log("Enetered: updateProfileNew")
  console.log(formData);
  try {
    dispatch({
      type: 'updateProfileRequest',
    });
    const { data } = await axios.post(`${server}updateprofilenew`, { datab: formData }, {
      withCredentials: true,
    });

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
    console.log("Updated")
    alert("Updated Successfully");
  } catch (error) {
    alert(error.response.data.message);
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const verifyOtpAction = (formData) => async (dispatch) => {
  console.log("Entered: verifyOtpAction");
  console.log(formData);
  try {
    dispatch({
      type: 'verifyOtpRequest',
    });
    const { data } = await axios.post(`${server}verifyemailotp`, { datab: formData }, {
      withCredentials: true,
    });

    dispatch({
      type: "verifyOtpSuccess",
      payload: data.message,
    });
    console.log("OTP SUCCESS ")
    alert("OTP VERIFIED  Successfully");
    window.location.href('/home')
  } catch (error) {
    alert(error.response.data.message);
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    //    Axios here
    const { data } = await axios.post(
      `${server}login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    alert(data.message);
    localStorage.setItem("isUserLoggedIn", true);
    localStorage.setItem('user', JSON.stringify(data.user));
    //const userNotes = await GlobalNote.find({});
    //localStorage.setItem("notes", userNotes); 
    dispatch({
      type: "loginSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/me`, {
      withCredentials: true,
    });


    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    await localStorage.clear();
    dispatch({
      type: "logoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
