import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { CoreContext } from "../contexts/CoreContext";
import { AppContext } from "../contexts/AppContext";
import { Camera } from "expo-camera/legacy";

const CheckScreen = () => {
  const navigation = useNavigation();
  const coreContext = useContext(CoreContext);
  const appContext = useContext(AppContext);
  const scanned = useRef(false);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      if (cameraRef) {
        const photo = await cameraRef.resumePreview();
      }
    })();
  }, [cameraRef]);

  onScan = async (e) => {
    const response = await fetch(
      "http://192.168.68.55:3000/product/" + e.data,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!scanned.current) {
      scanned.current = true;
      if (response.status !== 200) {
        navigation.navigate("Counterfeit");
        return;
      }
      const { product } = await response.json();
      coreContext.setFoundProduct(product);

      if (appContext.userRole === "Seller") {
        navigation.navigate("Core", { screen: "SellerProductFound" });
      } else {
        navigation.navigate("Core", { screen: "ProductFound" });
      }
    }
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
          <View className="flex-col mt-10 justify-around">
            <Text className="text-gray font-bold text-3xl text-center mb-20">
              Authenticity Check
            </Text>
            <View className=" items-center mb-40 mt-10">
              <Camera
                ref={(ref) => setCameraRef(ref)}
                className="flex justify-center"
                style={{ width: 300, height: 300 }}
                type={Camera.Constants.Type.back}
                onBarCodeScanned={onScan}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default CheckScreen;
