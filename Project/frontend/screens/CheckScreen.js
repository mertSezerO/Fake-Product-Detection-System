import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  BarCodeScanner,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const CheckScreen = () => {
  const navigation = useNavigation();

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
            <View className="mb-20 mt-20 space-y-4">
              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => navigation.navigate("ProductFound")}
              >
                <Text className="font-3xl text-white font-extrabold text-center">
                  Product Found
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => navigation.navigate("Counterfeit")}
              >
                <Text className="font-3xl text-white font-extrabold text-center">
                  Product Counterfeit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};
export default CheckScreen;
