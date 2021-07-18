import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

//helpers
import { formatDateTime } from "../helpers/helper";

//icons
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IonIcons from "react-native-vector-icons/Ionicons";

import { FlatList, View, Text, Alert, TouchableOpacity } from "react-native";

import CEmpty from "../components/Empty/Empty";

//services
import RecordService from "../services/record.service";

import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";

const Document = ({ navigation }) => {
  const [recordData, setRecordData] = useState();
  const getRecord = async () => {
    const response = await RecordService.getAllRecord();
    const { success, data } = response;
    if (success === false) {
      return Alert.alert("Thông báo", "Không lấy được dữ liệu , vui lòng thử lại sau");
    }
    setRecordData(data);
  };
  useEffect(() => {
    getRecord();
  }, []);

  const renderItem = ({ item }) => (
    <Item>
      <Col>
        <Row>
          <FontAwesome name="clock-o" size={14} style={{ paddingRight: 4 }} color="#234516" />
          <ItemName>{formatDateTime(item.bookingDate)}</ItemName>
        </Row>
        <Row style={{ paddingTop: 4 }}>
          <IonIcons name="location-outline" size={14} style={{ paddingRight: 4 }} color="#234516" />
          <ItemTitle>{item.area?.name}</ItemTitle>
        </Row>
        <Row style={{ paddingTop: "5%" }}>
          <ItemSubTitle style={{ fontStyle: "italic" }}>Bác sĩ điều trị:&nbsp;</ItemSubTitle>
          <ItemName>{item.doctor.name}</ItemName>
        </Row>
        <View style={{ paddingTop: "1%", flexDirection: "row", alignItems: "center" }}>
          <ItemSubTitle>Chẩn đoán:&nbsp;</ItemSubTitle>
          <Text style={{ textAlign: "left", flex: 1, fontSize: 14, color: "gray", fontStyle: "italic" }} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={{ paddingTop: "1%", flexDirection: "row", alignItems: "center" }}>
          <ItemStatus style={{ color: "#275c8f" }}>Đã chẩn đoán: &nbsp;</ItemStatus>
          <Text style={{ textAlign: "left", flex: 1, fontSize: 12, color: "gray", fontStyle: "italic" }}>
            {moment(item.updatedAt).format("DD/MM/yyyy HH:mm")}
          </Text>
        </View>
        <Row style={{ paddingTop: "5%" }}>
          <ItemSubTitle>Ngày khám lại:&nbsp;</ItemSubTitle>
          <Text style={{ textAlign: "left", flex: 1, fontSize: 14, color: "tomato" }}>
            {moment(item.reDate).format("DD/MM/yyyy HH:mm")}
          </Text>
        </Row>
      </Col>
      <ItemIcon>
        <IonIcons size={32} name="document-text-outline" />
      </ItemIcon>
    </Item>
  );

  return (
    <>
      <Container colors={["#b2cc8b", "#edd5a3", "#a2c48b"]}>
        {_.isNil(recordData) && <CEmpty title="Đang lấy dữ liệu" loading={true} />}
        {!_.isNil(recordData) && _.isEmpty(recordData) && <CEmpty title="Chưa có dữ liệu" loading={false} />}
        {!_.isEmpty(recordData) && <ListItems data={recordData} renderItem={renderItem} keyExtractor={(item) => item._id} />}
      </Container>
    </>
  );
};

export default Document;

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
  text-align: left;
  flex: 1;
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
