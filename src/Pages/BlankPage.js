import React, { useEffect } from "react";

import { getToken, userLogin } from "../redux/action";
import { useDispatch } from "react-redux";
import _ from "lodash";

import * as Notifications from "expo-notifications";
const experienceId = "@kingcooker/mt-hospital";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function getNotificationToken() {
  const { status } = await Notifications.getPermissionsAsync({
    experienceId,
  });
  if (status !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("failed to get notification token");
      return;
    }
  }
  const tokenData = await Notifications.getDevicePushTokenAsync();
  const token = tokenData.data;
  return token;
}

const BlankPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      // navigation.navigate("History");
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      if (response.notification.request.content.data.customer) {
        navigation.navigate("History");
      } else {
        navigation.navigate("OTP");
      }
    });
    //get token
    getToken()
      .then(async (res) => {
        const expo_token = await getNotificationToken();
        dispatch({ type: "EXPO-TOKEN", payload: expo_token });
        if (_.isNull(res.token) || _.isNil(res.token) || _.isEmpty(res.token) || res.token === "null") {
          navigation.navigate("Landing");
        } else {
          dispatch(userLogin(res.token));
          navigation.navigate("Home");
        }
      })
      .catch({
        //loi async storage khong hoat dong
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <></>;
};

export default BlankPage;
