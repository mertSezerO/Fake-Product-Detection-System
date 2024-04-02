import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  BarCodeScanner,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { QRCodeScanner } from "react-native-qrcode-scanner";
import { CoreContext } from "../contexts/CoreContext";

const CheckScreen = () => {
  const navigation = useNavigation();
  const coreContext = useContext(CoreContext);

  onSuccess = async (e) => {
    const response = await fetch(
      "http://192.168.41.60:3000/product/" + e.data,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { product } = await response.json();
    coreContext.setFoundProduct(product);
  };

  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/images/bg.png")}
    >
      <View className="flex-1 justify-start">
        <TouchableOpacity
          className="p-3 ml-4 mt-8"
          onPress={() => navigation.navigate("Welcome")}
        >
          <ArrowLeftIcon size="30" color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex justify-end">
        <View
          className="flex-2/3 bg-white px-10 pt-10"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <Text className="text-gray font-bold text-4xl text-center">
            Authenticity Check
          </Text>
          <View className="form space-y-2">
            <QRCodeScanner
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.torch}
            ></QRCodeScanner>
            <View className="mb-20 mt-20 space-y-4"></View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};
export default CheckScreen;
