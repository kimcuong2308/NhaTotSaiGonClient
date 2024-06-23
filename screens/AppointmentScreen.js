import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { formatCurrency, moment } from "../utils";
import { ButtonFlex } from '../components/Button'
import LoadingModal from "../components/LoadingModal";
import { useIsFocused } from "@react-navigation/native";

import createAxios from "../utils/axios";
const API = createAxios();


const dataTabView = [
  {
    id: 1,
    name: "Bạn hẹn",
  },
  {
    id: 2,
    name: "Khách hẹn",
  },
];

const dataFilter = [
  {
    id: 1,
    name: "Tất cả",
  },
  {
    id: 2,
    name: "Sắp tới",
  },
  {
    id: 3,
    name: "Chờ xác nhận",
  },
];

const AppointmentScreen = ({navigation, route}) => {
  const { userId } = route?.params
  const isFocused = useIsFocused();

  const [currentTabView, setCurrentTabView] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const [dataYourAppointment, setDataYourAppointment] = React.useState([]);
  const [dataGuestAppointment, setDataGuestAppointment] = React.useState([]);

  const statusAppointment = {
    pending: { color: COLORS.blue, text: "Chờ xác nhận" },
    confirmed: { color: COLORS.green, text: "Đã xác nhận" },
    cancelled: { color: COLORS.red, text: "Đã hủy" },
  };

  const fetchAppointment = async () => {
    setIsLoading(true)
    switch (currentTabView) {
      case 1:
        try {
          const response = await API.get(`/book-schedules/?renter_id=${userId}`);
          if (response) {
            console.log(response.data)
            setDataYourAppointment(response.data);
          }
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false)
        }
        break;
      case 2:
        try {
          const response = await API.get(`/book-schedules/?owner_id=${userId}`);
          if (response) {
            console.log(response.data)
            setDataGuestAppointment(response.data);
          }
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false)
        }
        break;
    
      default:
        break;
    }


  };



  const cancelAppointment = async (schedule_id) => {
    setIsLoading(true)
    try {
      const response = await API.put(`/book-schedules/${schedule_id}`,
        {
          status: "cancelled",
        });
      if (response) {
        console.log("Success cancelled!")
        fetchAppointment();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  const showButtonConfirm = (schedule_id) =>
    Alert.alert('Xác nhận', 'Bạn có muốn xác nhận lịch hẹn?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: ()=> {}},
    ]);

    const showButtonCancel = (schedule_id) =>
      Alert.alert('Xác nhận', 'Bạn có muốn hủy lịch hẹn?', [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: ()=> {cancelAppointment(schedule_id)}},
      ]);
  

  React.useEffect(() => {
    // if(isFocused === true)
       fetchAppointment()
  }, [currentTabView])
  

  return (
    <>
      <Header
        title={"Lịch hẹn"}
        leftIcon={"calendar-outline"}
        colorBackground={COLORS.orange}
        colorText={COLORS.white}
        rightIcon={"information-circle"}
      />
      <View style={{ flexDirection: "row" }}>
        {dataTabView.map((tabView, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrentTabView(tabView.id)}
            style={{
              flex: 1,
              alignItems: "center",
              alignSelf: "center",
              paddingVertical: 20,
              borderBottomWidth: currentTabView === tabView.id ? 3 : 0,
              borderBottomColor: COLORS.orange,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 15,
                color:
                  currentTabView === tabView.id ? COLORS.orange : COLORS.black,
              }}
            >
              {tabView.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {currentTabView === 1 && (
        dataYourAppointment.length === 0 ?
        (isLoading ?
          <View></View> 
          :
          <View style={{flex: 1, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="calendar-outline" color={COLORS.darkGrey} size={100}/>
            <Text style={{fontFamily: FONTS.semiBold, fontSize: 18, color: COLORS.lightGrey, marginTop: 10,}}>Chưa có lịch hẹn.</Text>
          </View>
        )

        :
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataYourAppointment}
          ListHeaderComponent={
            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10
            }}
          >
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18, color: COLORS.grey }}>Lọc</Text>
          <TouchableOpacity onPress={()=>{}}>
              <Icon name="options" color={COLORS.grey} size={23}/>
            </TouchableOpacity>
          </View>
          }
          renderItem={({ item, index }) => (
            <View
              activeOpacity={0.8}
              style={{
                height: 'auto',
                backgroundColor: COLORS.white,
                marginBottom: 10,
                borderRadius: 5,
                padding: 10,
                elevation: 2,
                marginHorizontal: 5,
                marginTop: index === 0 ? 5 : 0,
                marginBottom: index === (dataYourAppointment.length - 1) ? 60: 10
              }}
            >
              <View style={{ flexDirection: "row", }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 120, height: 'auto', borderRadius: 3 }}
                  resizeMode="cover"
                />

                <View style={{ flex: 1, paddingLeft: 5 }}>
                <Text
                      style={{
                        fontFamily: FONTS.bold,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                        color: COLORS.orange
                      }}
                    >
                      Thông tin liên hệ (Cho thuê)
                    </Text>
                  <View style={{ flexDirection: "row",marginTop: 8 }}>
   
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                      }}
                    >
                      Thời gian: {item.time}, {moment(item.date).format("DD/MM/yyyy")}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row",marginTop: 8 }}>
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                      }}
                    >
                      Số điện thoại: {item.owner_phone}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 8 }}>
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                      }}
                    >
                      Họ tên: {item.owner_name}
                    </Text>
                  </View>

                </View>
              </View>
              <View style={{ flex: 1, marginTop: 10, }}>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="location-outline" size={20} color={COLORS.orange} />
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      marginLeft: 5,
                      flexShrink: 1,
                      fontSize: 13,
                      lineHeight: 22
                    }}
                  >
                    {item.address}.
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10  }}>
                  <Icon name="file-tray-outline" size={18} color={COLORS.orange} />
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      marginLeft: 5,
                      flexShrink: 1,
                      fontSize: 13,
                    }}
                  >
                    Diện tích: {item.area} m²
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Icon name="pricetags-outline" size={18} color={COLORS.orange} />
                    <Text
                      style={{
                        fontFamily: FONTS.medium,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                      }}
                    >
                      {formatCurrency(item.price)} / 1 tháng
                    </Text>
                </View>
                <View style={{ flexDirection: "column", marginTop: 10 }}>
                    <Text
                      style={{
                        fontFamily: FONTS.medium,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                        lineHeight: 22
                      }}
                    >
                      Ghi chú: {item.note !== "" ? item.note : "Không" }
                    </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, alignItems: 'center'}}>
                    <Icon name="ellipse" size={12} color={statusAppointment[item.status].color} />
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        marginLeft: 5,
                        flexShrink: 1,
                        fontSize: 13,
                        color: statusAppointment[item.status].color
                      }}
                    >
                      {statusAppointment[item.status].text}
                    </Text>
                </View>
                <View style={{marginTop: 10, flex: 1, alignItems: 'flex-end',flexDirection: 'row', justifyContent: 'flex-end'}}>
                {item.status === 'pending' &&  
                <ButtonFlex
                  title="Hủy"
                  onPress={()=>showButtonCancel(item._id)}
                  stylesButton={{ paddingVertical: 8 ,backgroundColor: COLORS.white, borderWidth: 0, borderColor: COLORS.orange }}
                  stylesText={{ fontSize: 13, color: COLORS.red }}
                />
                }
                <ButtonFlex
                  title="Xem bài đăng"
                  onPress={() => navigation.navigate("PostDetail",{post_id: item.post_id})}
                  stylesButton={{ paddingVertical: 8 ,backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.orange}}
                  stylesText={{ fontSize: 13, color: COLORS.orange }}
                />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
          style={{ padding: 10, backgroundColor: COLORS.white }}
        />
      )}
      {currentTabView === 2 && (
       
        (isLoading ?
          <View></View> 
          :
          <View style={{flex: 1, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="calendar-outline" color={COLORS.darkGrey} size={100}/>
            <Text style={{fontFamily: FONTS.semiBold, fontSize: 18, color: COLORS.lightGrey, marginTop: 10,}}>Chưa có lịch hẹn. (Ẩn)</Text>
          </View>
        )
  
      )}      
                
      <LoadingModal modalVisible={isLoading} />
    </>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({});
