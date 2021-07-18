import React from "react";
import Onboarding from "../components/LandingPage/Onboarding";
import slides from "../constants/slides";
const Landing = ({ navigation }) => {
  return <Onboarding data={slides} navigation={navigation} />;
};
export default Landing;
