import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

//helpers
import { formatDateTime } from "../helpers/helper";

//icons
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { FlatList, View, Text, Alert, TouchableOpacity } from "react-native";

import CEmpty from "../components/Empty/Empty";

//services
import BookingService from "../services/booking.service";

import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";

const History = ({ navigation }) => {
  const [historyData, setHistoryData] = useState();
  const getHistory = async () => {
    const response = await BookingService.getHistoryBooking();
    const { success, data } = response;
    if (success === false) {
      return Alert.alert("Thông báo", "Không lấy được dữ liệu , vui lòng thử lại sau");
    }
    setHistoryData(data);
  };
  useEffect(() => {
    getHistory();
  }, []);

  const renderItem = ({ item }) => (
    <Item>
      <ItemIcon>
        <FontAwesome
          size={32}
          name={
            (item.status === 0 && "calendar-plus-o") ||
            (item.status === 1 && "calendar-check-o") ||
            (item.status === 2 && "calendar-times-o")
          }
        />
      </ItemIcon>
      <Col>
        <Row>
          <ItemName>{item.name}</ItemName>
          <Row>
            <FontAwesome name="phone" size={14} style={{ paddingRight: 4 }} color="#234516" />
            <ItemSubTitle>{item.phone}</ItemSubTitle>
          </Row>
        </Row>
        <Row>
          <FontAwesome name="clock-o" size={14} style={{ paddingRight: 4 }} color="#234516" />
          <ItemTitle style={{ fontWeight: "bold", color: "#718a68" }}>{formatDateTime(item.date)}</ItemTitle>
        </Row>
        <Row style={{ paddingTop: 4 }}>
          <FontAwesome name="home" size={14} style={{ paddingRight: 4 }} color="#234516" />
          <ItemTitle>{item.address}</ItemTitle>
        </Row>
        <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center" }}>
          <ItemStatus
            style={{ color: (item.status === 2 && "tomato") || (item.status === 1 && "#275c8f") || (item.status === 0 && "#bb852d") }}
          >
            {item.status === 0 && "Đang duyệt"}
            {item.status === 1 && "Đã nhận"}
            {item.status === 2 && "Đã huỷ"}
          </ItemStatus>
          <Text style={{ textAlign: "right", flex: 1, fontSize: 12, color: "gray", fontStyle: "italic" }}>
            {moment(item.updatedAt).fromNow()}
          </Text>
        </View>
      </Col>
    </Item>
  );

  return (
    <>
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        {_.isNil(historyData) && <CEmpty title="Đang lấy dữ liệu" loading={true} />}
        {!_.isNil(historyData) && _.isEmpty(historyData) && <CEmpty title="Chưa có dữ liệu" loading={false} />}
        {!_.isEmpty(historyData) && <ListItems data={historyData} renderItem={renderItem} keyExtractor={(item) => item._id} />}
      </Container>
    </>
  );
};

export default History;

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  display: flex;
`;
const ListItems = styled(FlatList)`
  flex: 1;
  height: 100%;
`;
const Col = styled(View)`
  display: flex;
  flex-direction: column;
  padding: 0 2%;
  flex: 1;
`;
const Row = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Item = styled(TouchableOpacity)`
  display: flex;
  border-bottom-width: 0.2px;
  border-bottom-color: #234516;
  flex-direction: row;
  padding: 2% 2%;
  flex: 1;
`;
const ItemName = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: #234516;
`;
const ItemSubTitle = styled(Text)`
  font-size: 12px;
  color: #718a68;
`;
const ItemTitle = styled(Text)`
  flex: 1;
  font-size: 12px;
  color: #234516;
`;
const ItemStatus = styled(Text)`
  font-size: 12px;
  color: #234516;
  font-style: italic;
`;
const ItemIcon = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 100%;
  opacity: 0.2;
`;
