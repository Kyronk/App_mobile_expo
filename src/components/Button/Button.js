import React from "react";
import { TouchableOpacity, Text, Keyboard } from "react-native";

import styled from "styled-components";

const CButton = (props) => {
  const { title, onPress } = props;
  return (
    <CustomButton
      mode="contained"
      onPress={() => {
        onPress();
        Keyboard.dismiss();
      }}
    >
      <ButtonText>{title}</ButtonText>
    </CustomButton>
  );
};

export default CButton;

const CustomButton = styled(TouchableOpacity)`
  padding: 16px 0px;
  margin: 8px 0px;
  background: #377022;
  border-radius: 4px;
`;
const ButtonText = styled(Text)`
  text-transform: uppercase;
  text-align: center;
  color: whitesmoke;
  font-weight: bold;
  font-size: 15px;
  font-family: sans-serif;
`;
