import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

const Pagination = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({ inputRange, outputRange: [10, 20, 10], extrapolate: "clamp" });
        return <Animated.View style={[styles.dot, { width: dotWidth }]} key={index.toString()} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#234516",
    marginHorizontal: 8,
  },
});
export default Pagination;
