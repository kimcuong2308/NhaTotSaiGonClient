import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import LoadingModal from "../components/LoadingModal";
import { formatCurrency } from "../utils";
import { useIsFocused } from "@react-navigation/native";




const FavouriteScreen = ({ navigation, route }) => {

  const { user_id } = route.params
  const isFocused = useIsFocused();

  const [dataFavouritePost, setDataFavouritePost] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  

  }, [])
  

  return (
    <>
      <Header
        title="Yêu thích"
        colorText={COLORS.orange}
        colorBackground={COLORS.white}
        rightIcon="heart"
        onPress={() => navigation.goBack()}
      />
      {dataFavouritePost.length === 0 &&
      (isLoading ?
      <View></View>
      :
      <View style={{flex: 1, backgroundColor: COLORS.white, alignItems: 'center',justifyContent: 'center', paddingBottom: 80}}>
          <Icon name="heart-dislike-outline" size={100} color={COLORS.darkGrey}/>
          <Text style={{fontFamily: FONTS.semiBold, color: COLORS.lightGrey, fontSize: 15, marginTop: 10,}}>Không có bài đăng yêu thích.</Text>
      </View>)
}
      <LoadingModal modalVisible={isLoading}/>

    </>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
