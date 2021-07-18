import React, { useState, useRef } from "react";
import { FlatList, View, StyleSheet, Text, Animated, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components";

import OnboardingItem from "./OnboardingItem";
import Pagination from "./Pagination";

const Onboarding = (props) => {
  const { data, navigation } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
      <TouchableOpacity
        style={styles.skip}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={{ textDecorationLine: "underline" }}>Skip</Text>
      </TouchableOpacity>
      <View style={{ flex: 3 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Pagination data={data} scrollX={scrollX} />
    </Container>
  );
};

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  position: relative;
`;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  skip: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#234516",
    textDecorationLine: "underline",
    width: 60,
    height: 30,
    zIndex: 10,
  },
});

export default Onboarding;
