import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Button } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { ButtonFloatBottom } from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-toast-message';
import { useStripe } from "@stripe/stripe-react-native";
import { useIsFocused } from "@react-navigation/native";
import { getDataAboutMe } from "../utils/api";
import { formatCurrency } from "../utils";
import createAxios from "../utils/axios";
import LoadingModal from "../components/LoadingModal";
const API = createAxios();

const CreatePostScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <Header
        title={"Đăng tin"}
        leftIcon={"close"}
        rightIcon={"information-circle-outline"}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize: 20, fontFamily: FONTS.semiBold}}>Ẩn</Text>
      </View>

      <LoadingModal modalVisible={false}/>
    </>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({});
