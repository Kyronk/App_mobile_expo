import React, { useState } from "react";
import { Alert, ScrollView, View, Image } from "react-native";

import logo from "../../assets/mtlogo.png";

//react native elements
import { LinearGradient } from "expo-linear-gradient";
import CTextInput from "../components/Input/TextInput";
import CButton from "../components/Button/Button";
import CLink from "../components/Link/Link";

//styled component
import styled from "styled-components";

//function api
import AuthService from "../services/auth.service";

// redux
import { useDispatch, useSelector } from "react-redux";
import { loading, userLogin } from "../redux/action";
//page loading
import Loading from "../components/Loading/Loading";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Notifications from "expo-notifications";
const experienceId = "@kingcooker/mt-hospital";

async function getNotificationToken() {
  const { status } = await Notifications.getPermissionsAsync({
    experienceId,
  });
  if (status !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("failed to get notification token");
      return;
    }
  }
  const tokenData = await Notifications.getDevicePushTokenAsync();
  const token = tokenData.data;
  return token;
}

const Login = ({ navigation }) => {
  //dispatch and selector redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loadingReducer.loading);
  //state
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);

  const onChangePhone = (value) => {
    setUser({ ...user, username: value });
  };
  const onChangePassword = (value) => {
    setUser({ ...user, password: value });
  };
  const onSubmit = async () => {
    dispatch(loading(true));
    const expo_token = await getNotificationToken();
    setTimeout(() => {
      dispatch(loading(false));
    }, 10000);
    const { message, success, token } = await AuthService.login(user, expo_token);
    if (success === false) {
      dispatch(loading(false));
      return Alert.alert("Thông báo", message);
    }

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("isLanding", "true");
    dispatch(userLogin(token));
    dispatch(loading(false));
    navigation.navigate("Home");
  };

  return (
    <>
      {/* loading */}
      {isLoading && <Loading />}
      {/* end loading */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
          <Image source={logo} resizeMode="contain" style={{ width: 220, height: 220, alignSelf: "center" }} />
          <CTextInput
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={user.username}
            onChangeText={(value) => {
              onChangePhone(value);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
          <CTextInput
            label="Mật khẩu"
            placeholder="Mật khẩu"
            password={showPassword}
            rightClick={() => {
              setShowPassword(!showPassword);
            }}
            iconRight={showPassword ? "eye-off-outline" : "eye-outline"}
            value={user.password}
            onChangeText={(value) => {
              onChangePassword(value);
            }}
          />
          <CButton title="Đăng nhập" onPress={onSubmit} />
          <Row>
            <CLink
              title="Đăng ký"
              onPress={() => {
                navigation.navigate("Register");
              }}
            />
            <CLink
              title="Quên mật khẩu"
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            />
          </Row>
        </Container>
      </ScrollView>
    </>
  );
};

export default Login;
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
