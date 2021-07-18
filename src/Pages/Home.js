import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styled from "styled-components";


const Home = ({ navigation }) => {
  return (
    <>
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
              <Image
                source={require("../../assets/booking.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
              <Text style={styles.text}>Đặt lịch khám</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate("Info")}>
              <Image
                source={require("../../assets/profile.png")}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />
              <Text style={styles.text}>Thông tin cá nhân</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Image
                source={require("../../assets/booked.png")}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />
              <Text style={styles.text}>Lịch sử đặt lịch</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => navigation.navigate("Document")}>
              <Image
                source={require("../../assets/document.png")}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />
              <Text style={styles.text}>Sổ khám bệnh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 20%;
`;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10%",
    paddingLeft: 8,
    paddingRight: 8,
  },
  box: {
    maxHeight: 180,
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    padding: 1,
    paddingBottom: "7%",
    width: "100%",
    backgroundColor: "rgba(189, 210, 182, 0.5)",
  },
  text: {
    color: "#234516",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
});
export default Home;
