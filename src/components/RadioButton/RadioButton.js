import React from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

import styled from "styled-components";

const CRadioButton = (props) => {
  const { label, value, onPress, status } = props;
  return (
    <Row>
      <RadioButton label="Nữ" value={value} color="#377022" status={status} onPress={onPress} />
      <Label>{label}</Label>
    </Row>
  );
};

export default CRadioButton;

const Row = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Label = styled(Text)`
  font-weight: bold;
  color: #234516;
`;
