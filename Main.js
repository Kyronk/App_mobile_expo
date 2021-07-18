import * as React from "react";
import { StatusBar, BackHandler } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// screen
import Home from "./src/Pages/Home";
import Info from "./src/Pages/Info";
import Login from "./src/Pages/Login";
import Register from "./src/Pages/Register";
import History from "./src/Pages/History";
import Booking from "./src/Pages/Booking";
import Document from "./src/Pages/Document";
import BlankPage from "./src/Pages/BlankPage";
import ForgotPassword from "./src/Pages/ForgotPassword";
import OTP from "./src/Pages/OTP";
import Landing from "./src/Pages/Landing";
import Security from "./src/Pages/Security";

const RootStack = createStackNavigator();

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components";

const Main = ({ navigation }) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => BackHandler.exitApp());

    return () => backHandler.remove();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#b2cc8b" barStyle="light-content" />
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <RootStack.Navigator
          initialRouteName="Blank"
          headerMode="screen"
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: "#b2cc8b",
            },
            headerTintColor: "#ffffff",
            headerTitleAlign: "center",
            headerTitleAllowFontScaling: true,
            headerTitleStyle: {
              fontSize: 18,
            },
            gestureEnabled: false,
            gestureDirection: "vertical",
          }}
        >
          <RootStack.Screen name="Blank" component={BlankPage} options={{ headerLeft: null, title: "" }} />
          <RootStack.Screen name="Login" component={Login} options={{ title: "Đăng nhập thành viên", headerLeft: null }} />
          <RootStack.Screen name="Register" component={Register} options={{ title: "Đăng ký thành viên" }} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Quên mật khẩu" }} />
          <RootStack.Screen name="Home" component={Home} options={{ headerLeft: null, title: "MT Hospital" }} />
          <RootStack.Screen name="Info" component={Info} options={{ title: "Thông tin cá nhân" }} />
          <RootStack.Screen name="OTP" component={OTP} options={{ title: "Xác nhận OTP" }} />
          <RootStack.Screen name="History" component={History} options={{ title: "Lịch sử đặt lịch" }} />
          <RootStack.Screen name="Booking" component={Booking} options={{ title: "Đặt lịch khám" }} />
          <RootStack.Screen name="Document" component={Document} options={{ title: "Sổ khám bệnh" }} />
          <RootStack.Screen name="Landing" component={Landing} options={{ headerLeft: null, title: "" }} />
          <RootStack.Screen name="Security" component={Security} options={{ title: "Câu hỏi bảo mật" }} />
        </RootStack.Navigator>
      </Container>
    </NavigationContainer>
  );
};

export default Main;

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`;
