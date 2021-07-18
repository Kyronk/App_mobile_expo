import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Alert } from "react-native";

import TextInput from "../components/Input/TextInput";

import Navbar from "../components/Nav/Navbar";
import male from "../../assets/male.png";
import female from "../../assets/female.png";

import Loading from "../components/Loading/Loading";

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { userLogout, loading, userLogin } from "../redux/action";

//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomerService from "../services/customer.service";
import AuthService from "../services/auth.service";

const Info = ({ navigation }) => {
  const isLoading = useSelector((state) => state.loadingReducer.loading);
  const dispatch = useDispatch();

  const onLogout = async () => {
    setTimeout(() => {
      dispatch(loading(false));
      return navigation.push("Login");
    }, 1000);
    dispatch(loading(true));
    dispatch(userLogout(""));
    await AsyncStorage.removeItem("token");
    const { success } = AuthService.logout();
    if (success === true) {
      dispatch(loading(false));
      return navigation.push("Login");
    }
  };

  const info = useSelector((state) => state.userReducer.profile);
  const [profile, setProfile] = useState(info);
  const [password, setPassword] = useState({ newPwd: "", oldPwd: "" });
  const [showOldPwd, setShowOldPwd] = useState(true);
  const [showNewPwd, setShowNewPwd] = useState(true);

  const onValueChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };
  const onChangeTextPassword = (name, value) => {
    setPassword({ ...password, [name]: value });
  };

  const onUpdateProfile = async () => {
    dispatch(loading(true));
    const { message, token, success } = await CustomerService.updateProfile(profile);
    if (success === true) {
      await AsyncStorage.setItem("token", token);
      dispatch(userLogin(token));
    }
    Alert.alert("Thông báo", message);
    dispatch(loading(false));
  };

  const onSubmitChangePassword = async () => {
    dispatch(loading(true));
    const { message, token, success } = await CustomerService.changePassword(password);
    if (success === true) {
      await AsyncStorage.setItem("token", token);
      dispatch(userLogin(token));
      setPassword({ newPwd: "", oldPwd: "" });
    }
    Alert.alert("Thông báo", message);
    dispatch(loading(false));
  };

  return (
    <>
      {isLoading && <Loading />}
      {/* <Navbar navigation={navigation} title="Thông tin cá nhân" next={false} prev={"Home"} /> */}
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <ScrollView contentContainerStyle={styles.containerStyle} showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.avatar}>
              <ImageBackground source={profile.gender === "male" ? male : female} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
              <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Thông tin liên lạc</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Số điện thoại"
                label="Số điện thoại"
                keyboardType="numeric"
                value={profile.username}
                editable={false}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Họ tên"
                label="Họ tên"
                value={profile.name}
                onChangeText={(value) => onValueChange("name", value)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Địa chỉ"
                label="Địa chỉ"
                value={profile.address}
                onChangeText={(value) => onValueChange("address", value)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                label="Email"
                value={profile.email}
                onChangeText={(value) => onValueChange("email", value)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={onUpdateProfile}>
              <Text style={styles.buttonText}>Cập nhập thông tin</Text>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Tài khoản</Text>
              <TextInput
                label="Mật khẩu cũ"
                placeholder="Mật khẩu cũ"
                password={showOldPwd}
                rightClick={() => {
                  setShowOldPwd(!showOldPwd);
                }}
                iconRight={showOldPwd ? "eye-off-outline" : "eye-outline"}
                value={password.oldPwd}
                onChangeText={(value) => onChangeTextPassword("oldPwd", value)}
              />
              <TextInput
                label="Mật khẩu mới"
                placeholder="Mật khẩu mới"
                password={showNewPwd}
                rightClick={() => {
                  setShowNewPwd(!showNewPwd);
                }}
                iconRight={showNewPwd ? "eye-off-outline" : "eye-outline"}
                value={password.newPwd}
                onChangeText={(value) => onChangeTextPassword("newPwd", value)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={onSubmitChangePassword}>
              <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    </>
  );
};

export default Info;

const Container = styled(LinearGradient)`
  display: flex;
  width: 100%;
  height: 100%;
`;

const styles = StyleSheet.create({
  keyboard: {
    padding: "5%",
    alignItems: "center",
  },
  containerStyle: {
    paddingBottom: 220,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: "#377022",
    padding: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 150 / 2,
    resizeMode: "cover",
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#377022",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    borderRadius: 8,
    marginTop: "5%",
  },
  buttonText: {
    color: "#ffffff",
  },
  info: {
    display: "flex",
    width: "100%",
    flex: 1,
    marginTop: "5%",
  },
  infoTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: "4%",
    color: "#234516",
  },
  infoLabel: {
    fontSize: 12,
    marginTop: "5%",
    marginLeft: "2%",
    marginBottom: "1%",
  },
});
