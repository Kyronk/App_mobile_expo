import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#234516" />
      <Text style={{ color: "#234516" }}>Đang thực hiện...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
