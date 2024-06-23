import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import LoadingModal from "../components/LoadingModal";
import { ButtonFloatBottom } from "../components/Button";


import createAxios from "../utils/axios";
const API = createAxios();

const EditProfileScreen = ({ navigation, route }) => {
  const profile_id = route.params.profile_id

  const [aboutMe, setAboutMe] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

 

  if (isLoading) {
    return <LoadingModal modalVisible={isLoading} />;
  }

  return (
    <>
      <Header
        title={"Chỉnh sửa thông tin"}
        colorBackground={COLORS.white}
        colorText={COLORS.orange}
        leftIcon={"close"}
        rightIcon={"create-outline"}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize: 20, fontFamily: FONTS.semiBold}}>Ẩn</Text>
      </View>
      <ButtonFloatBottom title={"Cập nhật"} buttonColor={COLORS.orange} />
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
