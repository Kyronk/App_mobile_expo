import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import COTP from "../components/OTP/OTP";

//function api
import CustomerService from "../services/customer.service";

//styled component
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";

import { loading } from "../redux/action";
import { Alert } from "react-native";

const OTP = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loadingReducer.loading);
  const forgot_user = useSelector((state) => state.userReducer.user);
  const forgot_question = useSelector((state) => state.userReducer.question);
  const expo_token = useSelector((state) => state.expoReducer.token);
  const [otp, setOTP] = useState("");
  const onChangeOTPValue = (value) => {
    setOTP(value);
  };
  const onSubmit = async () => {
    dispatch(loading(true));
    const otpData = {
      otp: otp,
      pwd: forgot_user.pwd,
    };
    const { message, success } = await CustomerService.verifyOTP(otpData);
    if (success === false) {
      dispatch(loading(false));
      return Alert.alert("Thông báo", message);
    }

    Alert.alert("Thông báo", message);
    dispatch(loading(false));
    navigation.navigate("Login");
  };
  const reSendOTP = async () => {
    dispatch(loading(true));
    const { message, success } = await CustomerService.forgotPassword({ question: forgot_question, user: forgot_user, expo_token });
    if (success === true) {
      dispatch(loading(false));
      return Alert.alert("Thông báo", message);
    }
    Alert.alert("Thông báo", message);
    dispatch(loading(false));
  };

  return (
    <>
      {isLoading && <Loading />}
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <COTP onChangeOTPValue={onChangeOTPValue} onSubmit={onSubmit} quantity={4} reSendOTP={reSendOTP} />
      </Container>
    </>
  );
};

export default OTP;
const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`;
