import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import _ from "lodash";

import logo from "../../../assets/mtlogo.png";

import Button from "../Button/Button";
//styled component
import styled from "styled-components";

const OTP = (props) => {
  const [otp, setOtp] = useState([]);
  const otpTextInput = [];

  const { quantity = 4, onSubmit, onChangeOTPValue, reSendOTP } = props;

  const focusKey = (key, index) => {
    if (key === "Backspace" && index !== 0) {
      otpTextInput[index - 1].focus();
    }
    if (key === "Enter" && index !== 0) {
      onChangeOTPValue(otp.join(""));
    }
  };

  const focusNext = (index, value) => {
    if (index < otpTextInput.length - 1 && value) {
      otpTextInput[index + 1].focus();
    }
    const cotp = otp;
    cotp[index] = value;
    setOtp(cotp);

    // end otp auto send submit
    if (index === otpTextInput.length - 1) {
      onChangeOTPValue(cotp.join(""));
      otpTextInput[index].blur();
    }
  };

  useEffect(() => {
    otpTextInput[0].focus();
  }, []);

  const renderInputs = () => {
    const inputs = Array(quantity).fill(0);
    const txt = inputs.map((item, index) => (
      <OTPInput
        key={index}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={(v) => focusNext(index, v)}
        onKeyPress={(e) => focusKey(e.nativeEvent.key, index)}
        ref={(ref) => (otpTextInput[index] = ref)}
      />
    ));
    return txt;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
      <Container>
        <Image source={logo} resizeMode="contain" style={{ width: 220, height: 220, alignSelf: "center" }} />
        <Title>Vui lòng nhập mã OTP chúng tôi đã gửi</Title>
        <Row>{renderInputs()}</Row>
        <View style={{ flex: 0.3 }}>
          <Button title="Xác nhận" onPress={onSubmit} />
          <TouchableOpacity onPress={reSendOTP}>
            <CText>Gửi lại OTP</CText>
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};

export default OTP;
const Container = styled(ScrollView)`
  display: flex;
  flex: 1;
  padding: 0 16px;
`;
const Row = styled(View)`
  flex: 0.7;
  align-items: center;
  flex-direction: row;
  margin: 10% 0;
`;
const CText = styled(Text)`
  text-align: center;
  font-size: 17px;
  color: #234516;
  margin-top: 22px;
`;
const Title = styled(Text)`
  text-align: center;
  color: gray;
`;
const OTPInput = styled(TextInput)`
  flex: 1;
  text-align: center;
  background-color: transparent;
  font-size: 28px;
  font-weight: bold;
  border-bottom-width: 2px;
  margin-right: 8px;
  margin-left: 8px;
  padding-bottom: 8px;
  color: #234516;
  border-bottom-color: #234516;
`;
