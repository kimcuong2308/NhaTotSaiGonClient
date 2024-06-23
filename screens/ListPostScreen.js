import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from "react-native-vector-icons/Ionicons";
import LoadingModal from "../components/LoadingModal";
import { formatCurrency, moment } from "../utils";

import createAxios from "../utils/axios";
import FONTS from '../constants/font';
import COLORS from '../constants/color';
const API = createAxios();

const ListPostScreen = ({navigation, route}) => {
  const { user_id } = route.params;

  const [isLoading, setIsLoading] = React.useState(true);
  const [dataYourAppointment, setDataYourAppointment] = React.useState([]);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  

  }, [])
  return (
    <>
      <Header title={"Tin của bạn"} rightIcon={"newspaper"} onPress={()=> navigation.goBack()}/>
      {dataYourAppointment.length === 0 &&
      (isLoading ?
        <View></View>
        :
        <View style={{flex: 1, backgroundColor: COLORS.white, alignItems: 'center',justifyContent: 'center', paddingBottom: 80}}>
          <Icon name="receipt-outline" size={100} color={COLORS.darkGrey}/>
          <Text style={{fontFamily: FONTS.semiBold, color: COLORS.lightGrey, fontSize: 15, marginTop: 10,}}>Không có bài đăng.</Text>
        </View>
      )

      }
      <LoadingModal modalVisible={isLoading} />
    </>
  )
}

export default ListPostScreen

const styles = StyleSheet.create({})