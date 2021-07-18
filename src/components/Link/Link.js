import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Link = (props) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity>
      <TextLink onPress={onPress}>{title}</TextLink>
    </TouchableOpacity>
  );
};

export default Link;
const TextLink = styled(Text)`
  padding-top: 2%;
  color: #275c8f;
  border-bottom-width: 0.5px;
  border-bottom-color: #275c8f;
`;
