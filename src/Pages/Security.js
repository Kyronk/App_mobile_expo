import React, { useState } from "react";
import { Alert, ScrollView, View, Image, Text } from "react-native";

import logo from "../../assets/mtlogo.png";

//react native elements
import { LinearGradient } from "expo-linear-gradient";
import CTextInput from "../components/Input/TextInput";
import CButton from "../components/Button/Button";
import CLink from "../components/Link/Link";

//styled component
import styled from "styled-components";

//lodash
import _ from "lodash";

//function api
import CustomerService from "../services/customer.service";

// redux
import { useDispatch, useSelector } from "react-redux";

import { loading, userQuestion, pushToken } from "../redux/action";
//page loading
import Loading from "../components/Loading/Loading";

//question
import { questions } from "../constants/question";

const Security = ({ navigation }) => {
  //dispatch and selector redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loadingReducer.loading);
  const forgot_user = useSelector((state) => state.userReducer.user);
  const expo_token = useSelector((state) => state.expoReducer.token);
  //state
  const [user, setUser] = useState({ quest1: "", quest2: "", quest3: "" });

  const onChangeUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async () => {
    dispatch(loading(true));
    // setTimeout(() => {
    //   dispatch(loading(false));
    // }, 10000);
    const questionData = {
      quest1: user.quest1,
      quest2: user.quest2,
      quest3: user.quest3,
    };

    const { message, token, success } = await CustomerService.forgotPassword({
      question: questionData,
      user: forgot_user,
      expo_token,
    });
    if (success === false) {
      dispatch(loading(false));
      return Alert.alert("Thông báo", message);
    }
    pushToken(token);
    dispatch(loading(false));
    dispatch(userQuestion(questionData));
    navigation.navigate("OTP");
  };

  return (
    <>
      {/* loading */}
      {isLoading && <Loading />}
      {/* end loading */}

      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 220 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Image source={logo} resizeMode="contain" style={{ width: 220, height: 220, alignSelf: "center" }} />
          <Title>{questions.quest1.quest}</Title>
          <CTextInput
            label="Câu hỏi bảo mật số 1"
            placeholder="Câu hỏi bảo mật số 1"
            value={user.quest1}
            onChangeText={(value) => {
              onChangeUser("quest1", value);
            }}
          />
          <Title>{questions.quest2.quest}</Title>
          <CTextInput
            label="Câu hỏi bảo mật số 2"
            placeholder="Câu hỏi bảo mật số 2"
            value={user.quest2}
            onChangeText={(value) => {
              onChangeUser("quest2", value);
            }}
          />
          <Title>{questions.quest3.quest}</Title>
          <CTextInput
            label="Câu hỏi bảo mật số 3"
            placeholder="Câu hỏi bảo mật số 3"
            value={user.quest3}
            onChangeText={(value) => {
              onChangeUser("quest3", value);
            }}
          />

          <CButton title="Xác nhận" onPress={onSubmit} />
          <Row>
            <CLink
              title="Đăng nhập"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
            <CLink
              title="Đăng ký"
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
          </Row>
        </ScrollView>
      </Container>
    </>
  );
};

export default Security;
const Container = styled(LinearGradient)`
  padding: 0 16px;
  width: 100%;
  height: 100%;
`;
const Row = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Title = styled(Text)`
  font-weight: 700;
  font-size: 15px;
  margin: 4% 0;
  color: #234516;
`;
