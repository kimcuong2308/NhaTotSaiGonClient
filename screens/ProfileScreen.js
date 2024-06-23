import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl
} from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/FontAwesome";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getDataAboutMe } from "../utils/api";
import FONTS from "../constants/font";
import { formatCurrency } from "../utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import createAxios from "../utils/axios";
import COLORS from "../constants/color";
import LoadingModal from "../components/LoadingModal";
const API = createAxios();
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [aboutMe, setAboutMe] = React.useState(null);
  const [showStationInfo, setShowStationInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { signOut } = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(aboutMe && aboutMe.is_private);

  const fetchDataAboutMe = async () => {
    try {
      const data = await getDataAboutMe();
      setAboutMe(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDataAboutMe();    
  }, []);

  React.useEffect(() => {

    if(aboutMe)setIsLoading(false);
   
  }, [aboutMe]);

  const accountItems = [
    {
      icon: "language-outline",
      text: "Ngôn ngữ",
      sub: "chevron-forward-outline",
    },
    {
      icon: "chatbubble-ellipses-outline",
      text: "Phản hồi",
      sub: "chevron-forward-outline",
    },
    {
      icon: "star-outline",
      text: "Đánh giá ứng dụng",
      sub: "chevron-forward-outline",
    },
    {
      icon: "download-outline",
      text: "Cập nhật",
      sub: "chevron-forward-outline",
    },
  ];

  const handleLogOut = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đăng xuất",
          // onPress: async () => {
          //   try {
          //     await auth().signOut();
          //     await GoogleSignin.signOut();
          //     console.log("User signed out!");
          //   } catch (error) {
          //     console.error("Error signing out: ", error);
          //   }
          // },
          onPress: signOut
        },
      ],
      { cancelable: false }
    );
  };

  const renderSettingsItem = ({ icon, text, sub }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.settingsItem}
    >
      <Icon name={icon} size={24} color="grey" />
      <Text style={styles.settingsText}>
        {text}
      </Text>
      <View style={{ alignSelf: "flex-end" }}>
        <Icon
          name={sub}
          size={24}
          color="grey"
          style={{
            fontWeight: "600",
            fontSize: 24,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView>
        <View style={styles.top}>
          <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.topButton}>
              <Icon name="person-outline" size={28} color={"black"} />
            </View>
          </Pressable>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.title}>Tài khoản</Text>
          </View>
          <Pressable
            style={styles.topButton}
            onPress={() => {}}
          >
            <Icon name="ellipsis-vertical" size={25} color={"black"} />
          </Pressable>
        </View>
      </SafeAreaView>
      {aboutMe ? 
            <ScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchDataAboutMe}/>
            }
          >
            <View style={styles.itemCard}>
              <Image
                source={{
                  uri: aboutMe ? aboutMe.image : "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>
                  {aboutMe && aboutMe.name}
                </Text>
                <Text style={styles.profileEmail}>
                {aboutMe && aboutMe.email}
                </Text>
              </View>
              <View>
                <Icon name="notifications-outline" size={26} color={"grey"} />
              </View>
            </View>
    
            <View style={{ marginHorizontal: 20 }}>
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionTitle}>Tài khoản</Text>
                <View style={styles.sectionContainer}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.settingsItem}
                  >
                    <Icon
                      name={"shield-checkmark-outline"}
                      size={24}
                      color="grey"
                    />
                    <Text style={styles.settingsText}>
                      {"Quyền riêng tư"}
                    </Text>
                    <View style={{ alignSelf: "flex-end" }}>
                      <TouchableOpacity >
                        <Icon1
                          name={aboutMe && aboutMe.is_private ? "toggle-on": "toggle-off"}
                          size={24}
                          color={aboutMe && aboutMe.is_private ? COLORS.orange :  COLORS.grey}
                          style={{
                            fontWeight: "600",
                            fontSize: 24,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.settingsItem}
                  >
                    <Icon name={"person-circle-outline"} size={24} color="grey" />
                    <Text style={styles.settingsText}>
                      {"Thông tin tài khoản"}
                    </Text>
                    <View style={{ alignSelf: "flex-end" }}>
                      <TouchableOpacity
                      onPress={()=> navigation.navigate("EditProfile", {profile_id: aboutMe._id})}
                      >
                      <Icon
                        name={"create-outline"}
                        size={24}
                        color="grey"
                        style={{
                          fontWeight: "600",
                          fontSize: 24,
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
    
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionTitle}>Cài đặt</Text>
                <View style={styles.sectionContainer}>
                  {accountItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {renderSettingsItem(item)}
                    </React.Fragment>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={handleLogOut}
              >
                <View style={styles.btnContainer}>
                  <Text style={styles.btnText}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          :
          <LoadingModal modalVisible={isLoading}/>
      }

    </>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    height: 80,
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontFamily: FONTS.semiBold,
  },
  btnContainer: {
    backgroundColor: "red",
    height: 40,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 3
  },
  top: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 80,
  },
  topButton: {
    height: 40,
    width: 40,
    marginLeft: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  profileDetails: {
    height: 100,
    marginLeft: 15,
    paddingVertical: 32,
    flex: 1,
  },
  profileName: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
  },
  profileEmail: {
    fontSize: 13,
    color: "grey",
    fontFamily: FONTS.semiBold,
  },
  sectionTitle: {
    marginVertical: 10,
    fontFamily: FONTS.bold,
  },
  sectionContainer: {
    backgroundColor: "grey",
    borderRadius: 5,
    overflow: "hidden",
    elevation: 2,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  settingsText: {
    marginLeft: 15,
    fontSize: 15,
    minWidth: 250,
    fontFamily: FONTS.semiBold,
  },
});

export default ProfileScreen;
