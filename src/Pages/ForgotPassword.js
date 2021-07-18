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

//lodash
import _ from "lodash";

// redux
import { useDispatch } from "react-redux";
import { userForgot } from "../redux/action";

const ForgotPassword = ({ navigation }) => {
  //dispatch and selector redux
  const dispatch = useDispatch();

  //state
  const [user, setUser] = useState({ phone: "", pwd: "", cfpwd: "" });
  const [showPassword, setShowPassword] = useState(true);
  const [showCfPassword, setShowCfPassword] = useState(true);

  const onChangeUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async () => {
    if (user.pwd !== user.cfpwd) {
      return Alert.alert("Thông báo", "Xác nhận mật khẩu không khớp");
    }
    dispatch(await userForgot(user));
    navigation.navigate("Security");
  };
  return (
    <>
      {/* end loading */}
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Image source={logo} resizeMode="contain" style={{ width: 220, height: 220, alignSelf: "center" }} />
          <CTextInput
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={user.phone}
            onChangeText={(value) => {
              onChangeUser("phone", value);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
          <CTextInput
            label="Mật khẩu mới"
            placeholder="Mật khẩu mới"
            password={showPassword}
            rightClick={() => {
              setShowPassword(!showPassword);
            }}
            iconRight={showPassword ? "eye-off-outline" : "eye-outline"}
            value={user.pwd}
            onChangeText={(value) => {
              onChangeUser("pwd", value);
            }}
          />
          <CTextInput
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            password={showCfPassword}
            rightClick={() => {
              setShowCfPassword(!showCfPassword);
            }}
            iconRight={showCfPassword ? "eye-off-outline" : "eye-outline"}
            value={user.cfpwd}
            onChangeText={(value) => {
              onChangeUser("cfpwd", value);
            }}
          />

          <CButton title="Tiếp theo" onPress={onSubmit} />
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

export default ForgotPassword;
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
