import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import React from "react";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { ButtonFlex } from "../components/Button";


const SearchScreen = ({navigation}) => {
  const [showModalFilters, setShowModalFilters] = React.useState(false);
  const [priceFilter, setPriceFilter] = React.useState();
  const [areaFilter, setAreaFilter] = React.useState();

  return (
    <>
      <View
        style={{ backgroundColor: COLORS.white, flex: 1,  padding: 20  }}
      >
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 25,
              color: COLORS.orange,
            }}
          >
            Tìm kiếm
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="Tìm kiếm đường, quận..."
                // onFocus={() => {navigation.navigate("Tìm kiếm")}}
              />
              <Icon name="search" size={23} color={COLORS.grey} />
            </View>
            <TouchableOpacity
              onPress={() => setShowModalFilters(true)}
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.orange,
                borderRadius: 10,
                padding: 15,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="options" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Modal
              isVisible={showModalFilters}
              onBackdropPress={() => setShowModalFilters(!showModalFilters)}
              animationOutTiming={800}
              animationInTiming={300}
              animationIn={"fadeInUp"}
              animationOut={"fadeOutDown"}
              hasBackdrop={true}
            >
              <View style={{alignItems: 'center', justifyContent:'center'}}><Text></Text></View>
            </Modal>

          </View>
        </View>
        <View style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize: 20, fontFamily: FONTS.semiBold}}>Ẩn</Text>
      </View>
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  boxInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginRight: 15,
    paddingRight: 15,
    paddingVertical: 8,
    backgroundColor: "#F6F6F5",
    flex: 1,
  },
  input: {
    height: 36,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    fontFamily: FONTS.medium,
    flex: 1,
  },
});
