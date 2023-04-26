import axios from "axios";
import { server } from "../store";

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

    alert("Registered In Successfully");
  } catch (error) {
    alert(error.response.data.message);
    dispatch({
      type: "registerFail",
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
    localStorage.setItem("userLogInTime", true); //28800000 --> 8 hrs
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
