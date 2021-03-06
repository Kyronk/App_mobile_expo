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
    Alert.alert("Th??ng b??o", message);
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
    Alert.alert("Th??ng b??o", message);
    dispatch(loading(false));
  };

  return (
    <>
      {isLoading && <Loading />}
      {/* <Navbar navigation={navigation} title="Th??ng tin c?? nh??n" next={false} prev={"Home"} /> */}
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <ScrollView contentContainerStyle={styles.containerStyle} showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.avatar}>
              <ImageBackground source={profile.gender === "male" ? male : female} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
              <Text style={styles.buttonText}>????ng xu???t</Text>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Th??ng tin li??n l???c</Text>
              <TextInput
                style={styles.textInput}
                placeholder="S??? ??i???n tho???i"
                label="S??? ??i???n tho???i"
                keyboardType="numeric"
                value={profile.username}
                editable={false}
              />
              <TextInput
                style={styles.textInput}
                placeholder="H??? t??n"
                label="H??? t??n"
                value={profile.name}
                onChangeText={(value) => onValueChange("name", value)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="?????a ch???"
                label="?????a ch???"
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
              <Text style={styles.buttonText}>C???p nh???p th??ng tin</Text>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>T??i kho???n</Text>
              <TextInput
                label="M???t kh???u c??"
                placeholder="M???t kh???u c??"
                password={showOldPwd}
                rightClick={() => {
                  setShowOldPwd(!showOldPwd);
                }}
                iconRight={showOldPwd ? "eye-off-outline" : "eye-outline"}
                value={password.oldPwd}
                onChangeText={(value) => onChangeTextPassword("oldPwd", value)}
              />
              <TextInput
                label="M???t kh???u m???i"
                placeholder="M???t kh???u m???i"
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
              <Text style={styles.buttonText}>?????i m???t kh???u</Text>
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
