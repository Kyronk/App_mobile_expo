import React, { useRef } from "react";
import { Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//icons
import Ionicons from "react-native-vector-icons/Ionicons";

import styled from "styled-components";

const Navbar = ({ navigation, title, next, prev }) => {
  const ref = useRef();
  ref.current = null;
  return (
    <SafeAreaView style={{ width: "100%", display: "flex" }}>
      <Container
        colors={["#718a68", "#377022"]}
        style={{
          heightshadowColor: "#edd5a3",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
      >
        <Icons name={prev ? "arrow-back-outline" : ""} size={24} color="#333" onPress={() => prev && navigation.goBack()} />
        <Title>{title}</Title>
        <Icons name={next ? "arrow-forward-outline" : ""} size={24} color="#333" onPress={() => next && navigation.navigate(next)} />
      </Container>
    </SafeAreaView>
  );
};

export default Navbar;

const Container = styled(LinearGradient)`
  display: flex;
  height: 80px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
  box-shadow: 2px 2px #333;
`;
const Title = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: #eceae6;
  flex: 1;
  text-align: center;
`;

const Icons = styled(Ionicons)`
  width: 32px;
  color: #eceae6;
  height: 32px;
  padding-top: 2px;
`;
