import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components";
import Ionicons from "react-native-vector-icons/Ionicons";
const windowHeight = Dimensions.get("window").height / 2;
const Empty = ({ title = "Chưa có dữ liệu", loading }) => {
  return (
    <Container>
      <Icons name="ios-folder-open-outline" />
      <Title>{title}</Title>
      {loading && <ActivityIndicator size="large" color="#234516" style={{ opacity: 0.5 }} />}
    </Container>
  );
};

export default Empty;

const Container = styled(View)`
  display: flex;
  flex: 1;
  align-items: center;
  padding-top: 60%;
`;

const Title = styled(Text)`
  color: #234516;
  font-size: 16px;
  font-weight: bold;
  opacity: 0.5;
`;

const Icons = styled(Ionicons)`
  font-size: 42px;
  color: #234516;
  opacity: 0.5;
`;
