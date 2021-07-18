import React from "react";
import { TouchableOpacity } from "react-native";

import { TextInput } from "react-native-paper";

import styled from "styled-components";

import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";
import "moment/locale/vi";

const CDateTimePicker = (props) => {
  const { placeholder, value, mode, onChange, show, onPress, leftIcon } = props;
  return (
    <>
      <Container onPress={onPress}>
        <InputPicker
          placeholder={placeholder}
          value={moment(value).format(mode === "date" ? "DD-MM-YYYY" : "HH:mm")}
          editable={false}
          mode="flat"
          outlineColor="transparent"
          underlineColor="transparent"
          label={placeholder}
          left={leftIcon && <TextInput.Icon name={leftIcon} />}
        />
      </Container>
      {show && <DateTimePicker testID="dateTimePicker" value={value} mode={mode} is24Hour={true} display="default" onChange={onChange} />}
    </>
  );
};

export default CDateTimePicker;
const Container = styled(TouchableOpacity)`
  width: 100%;
  height: auto;
  margin-top: 8px;
`;
const InputPicker = styled(TextInput)`
  text-align: center;
  border: none;
  background-color: rgba(244, 244, 244, 244);
  border-radius: 3px;
  height: 58px;
  color: #333;
`;
