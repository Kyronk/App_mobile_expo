import React, { useState } from "react";
import { Alert, ScrollView, View, Text } from "react-native";

//react native elements
import { LinearGradient } from "expo-linear-gradient";
import CTextInput from "../components/Input/TextInput";
import CButton from "../components/Button/Button";
import CRadioButton from "../components/RadioButton/RadioButton";
import CLink from "../components/Link/Link";
import CDateTimePicker from "../components/Picker/DateTimePicker";

//styled component
import styled from "styled-components";

//lodash
import _ from "lodash";

//function api
import CustomerService from "../services/customer.service";

// redux
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../redux/action";
//page loading
import Loading from "../components/Loading/Loading";

//question
import { questions } from "../constants/question";

const Register = ({ navigation }) => {
  //dispatch and selector redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loadingReducer.loading);
  const expo_token = useSelector((state) => state.expoReducer.token);
  //state
  const [user, setUser] = useState({
    username: "",
    password: "",
    cfpwd: "",
    email: "",
    gender: "female",
    address: "",
    name: "",
    quest1: "",
    quest2: "",
    quest3: "",
    dob: new Date(),
  });
  const [showPicker, setShowPicker] = useState({ date: false, time: false });
  const [showPassword, setShowPassword] = useState(true);
  const onChangeDate = (event, selected) => {
    if (event.type === "set") {
      const current = selected || dateSelected.date;
      setShowPicker({ date: false, time: false });
      setUser({ ...user, dob: current });
    }
  };
  const onShowPicker = (type) => {
    if (type === "time") {
      setShowPicker({ date: false, time: true });
    } else {
      setShowPicker({ date: true, time: false });
    }
  };

  const onChangeUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async () => {
    if (_.isEmpty(user.username) || _.isEmpty(user.password) || _.isEmpty(user.name) || _.isEmpty(user.email) || _.isEmpty(user.address)) {
      return Alert.alert("Thông báo", "Vui lòng điền đầy đủ tất cả thông tin");
    }
    dispatch(loading(true));
    const { message, success } = await CustomerService.register(user, expo_token);
    Alert.alert("Thông báo", message);
    if (success === true) {
      setUser({ username: "", password: "", cfpwd: "", email: "", gender: "female", address: "", name: "", dob: new Date() });
    }
    dispatch(loading(false));
  };

  return (
    <>
      {/* loading */}
      {isLoading && <Loading />}
      {/* end loading */}

      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 220 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Title>Thông tin liên lạc</Title>
          <CTextInput
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={user.username}
            onChangeText={(value) => {
              onChangeUser("username", value);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
          <CTextInput
            label="Họ và tên"
            placeholder="Họ và tên"
            value={user.name}
            onChangeText={(value) => {
              onChangeUser("name", value);
            }}
          />
          <Row>
            <CRadioButton
              label="Nữ"
              value="female"
              onPress={() => onChangeUser("gender", "female")}
              status={user.gender === "female" ? "checked" : "unchecked"}
            />
            <CRadioButton
              label="Nam"
              value="male"
              onPress={() => onChangeUser("gender", "male")}
              status={user.gender === "male" ? "checked" : "unchecked"}
            />
          </Row>
          <CDateTimePicker
            placeholder="Ngày sinh"
            value={user.dob}
            mode="date"
            onChange={onChangeDate}
            show={showPicker.date}
            onPress={() => onShowPicker("date")}
            leftIcon={"calendar"}
          />
          <CTextInput
            label="Email"
            placeholder="Email"
            value={user.email}
            onChangeText={(value) => {
              onChangeUser("email", value);
            }}
          />
          <CTextInput
            label="Địa chỉ"
            placeholder="Địa chỉ"
            value={user.address}
            onChangeText={(value) => {
              onChangeUser("address", value);
            }}
          />
          <Title>Bảo mật</Title>
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
              onChangeUser("password", value);
            }}
          />
          <CTextInput
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            password={showPassword}
            rightClick={() => {
              setShowPassword(!showPassword);
            }}
            iconRight={showPassword ? "eye-off-outline" : "eye-outline"}
            value={user.cfpwd}
            onChangeText={(value) => {
              onChangeUser("cfpwd", value);
            }}
          />
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
          <CButton title="Đăng ký" onPress={onSubmit} />
          <Row>
            <CLink
              title="Đăng nhập"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
            <CLink
              title="Quên mật khẩu"
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            />
          </Row>
        </ScrollView>
      </Container>
    </>
  );
};

export default Register;
const Container = styled(LinearGradient)`
  padding: 2% 16px;
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
