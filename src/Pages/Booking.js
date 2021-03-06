import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

import { Alert, ScrollView, Text, View } from "react-native";

import CTextInput from "../components/Input/TextInput";
import CDateTimePicker from "../components/Picker/DateTimePicker";
import CButton from "../components/Button/Button";
import CRadioButton from "../components/RadioButton/RadioButton";

//services
import BookingService from "../services/booking.service";

import _ from "lodash";

import { useSelector } from "react-redux";

const info = ({ navigation }) => {
  const profile = useSelector((state) => state.userReducer.profile);
  const [show, setShow] = useState({ date: false, time: false });
  const [timeSelected, setTimeSelected] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(new Date());

  const [info, setInfo] = useState(profile);
  const onChangeTime = (event, selected) => {
    if (event.type === "set") {
      const current = selected || timeSelected.time;
      setShow({ date: false, time: false });
      setTimeSelected(current);
    }
  };
  const onChangeDate = (event, selected) => {
    if (event.type === "set") {
      const current = selected || dateSelected.date;
      setShow({ date: false, time: false });
      setDateSelected(current);
    }
  };

  const onShowPicker = (type) => {
    if (type === "time") {
      setShow({ date: false, time: true });
    } else {
      setShow({ date: true, time: false });
    }
  };

  const onCommitBooking = async () => {
    // combine date and time
    const hour = timeSelected.getHours();
    const minute = timeSelected.getMinutes();
    const date = dateSelected.getDate();
    const month = dateSelected.getMonth();
    const year = dateSelected.getFullYear();
    const combined = new Date(year, month, date, hour, minute);

    const bookingData = {
      name: info.name,
      address: info.address,
      gender: info.gender,
      phone: info.username,
      date: combined,
    };
    if (_.isEmpty(bookingData.name) || _.isEmpty(bookingData.phone) || _.isEmpty(bookingData.address) || _.isNil(bookingData.date)) {
      return Alert.alert("Th??ng b??o", "Vui l??ng ??i???n ?????y ????? th??ng tin");
    }
    const response = await BookingService.createBooking(bookingData);
    const { message, success } = response;
    if (success) {
      setTimeSelected(new Date());
      setDateSelected(new Date());
    }
    Alert.alert("Th??ng b??o", message);
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
          <Title>Th??ng tin c?? nh??n</Title>
          <CTextInput
            placeholder="H??? v?? t??n"
            label="H??? v?? t??n"
            value={info.name}
            onChangeText={(value) => setInfo({ ...info, name: value })}
          />
          <CTextInput
            placeholder="S??? ??i???n tho???i"
            label="S??? ??i???n tho???i"
            value={info.username}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(value) => setInfo({ ...info, username: value })}
          />
          <CTextInput
            placeholder="?????a ch???"
            label="?????a ch???"
            value={info.address}
            onChangeText={(value) => setInfo({ ...info, address: value })}
          />
          <Row>
            <CRadioButton
              label="N???"
              value="female"
              onPress={() => setInfo({ ...info, gender: "female" })}
              status={info.gender === "female" ? "checked" : "unchecked"}
            />
            <CRadioButton
              label="Nam"
              value="male"
              onPress={() => setInfo({ ...info, gender: "male" })}
              status={info.gender === "male" ? "checked" : "unchecked"}
            />
          </Row>
          <Title>Th???i gian</Title>
          <CDateTimePicker
            placeholder="Ch???n gi???"
            value={timeSelected}
            mode="time"
            onChange={onChangeTime}
            show={show.time}
            onPress={() => onShowPicker("time")}
            leftIcon={"clock-outline"}
          />

          <CDateTimePicker
            placeholder="Ch???n ng??y"
            value={dateSelected}
            mode="date"
            onChange={onChangeDate}
            show={show.date}
            onPress={() => onShowPicker("date")}
            leftIcon={"calendar"}
          />
          <CustomButton>
            <CButton title="?????t l???ch" onPress={onCommitBooking} />
          </CustomButton>
        </Container>
      </ScrollView>
    </>
  );
};

export default info;

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: 5%;
`;
const Title = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  color: #234516;
`;
const Row = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const CustomButton = styled(View)`
  margin-top: 20%;
`;
