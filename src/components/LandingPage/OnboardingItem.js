import React from "react";
import { Image, View, StyleSheet, Text, useWindowDimensions } from "react-native";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.item}>
      <Image source={item.image} style={[styles.image, { width, resizeMode: "contain" }]} />
      <View style={{ flex: 0.3 }}>
        <Text style={[styles.title, { width }]}>{item.title}</Text>
        <Text style={[styles.desc, { width }]}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: "#234516",
    textAlign: "center",
    flexWrap: "wrap",
  },
  desc: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
    flexWrap: "wrap",
    paddingHorizontal: 18,
  },
});

export default OnboardingItem;
