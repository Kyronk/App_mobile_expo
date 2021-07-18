import AsyncStorage from "@react-native-async-storage/async-storage";

import setAuthToken from "../services/authToken";

import _ from "lodash";
import jwt_decode from "jwt-decode";

export const userLogin = (token) => {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  return {
    type: "LOGIN",
    payload: { token: token, profile: decoded },
  };
};
export const userLogout = (token) => {
  return {
    type: "LOGOUT",
    payload: token,
  };
};
export const loading = (loading) => {
  return {
    type: "LOADING",
    payload: loading,
  };
};
export const userForgot = async (user) => {
  return {
    type: "FORGOT-PASSWORD",
    payload: user,
  };
};
export const userQuestion = (quest) => {
  return {
    type: "QUESTION",
    payload: quest,
  };
};

export const pushToken = (token) => {
  setAuthToken(token);
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const isLanding = await AsyncStorage.getItem("isLanding");
    return token !== null ? { token: token, isLanding: isLanding } : { token: null, isLanding: null };
  } catch (e) {
    // error reading value
  }
};
