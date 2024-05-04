import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { CoreContext } from "../contexts/CoreContext";

const ProductHistoryScreen = () => {
  const navigation = useNavigation();
  const coreContext = useContext(CoreContext);
  const [productName, setProductName] = useState([]);
  const [productHistory, setProductHistory] = useState([]);

  useEffect(() => {
    const gatherHistory = async () => {
      try {
        const response = await fetch(
          "http://192.168.68.51:3000/supply-chain/" +
            coreContext.foundProduct.productId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { transactions } = await response.json();
        setProductHistory(transactions);
      } catch (error) {
        console.error("Error fetching product history:", error);
      }
    };

    gatherHistory();
  }, []);

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
          <Text className="text-gray font-bold text-4xl text-center mb-10">
            Product History
          </Text>

          <Text className="font-bold text-xl mb-5">
            {coreContext.foundProduct.productName}
          </Text>
          <ScrollView>
            <View className="border-l border-gray-500 h-full mr-4">
              {productHistory.map((item, index) => (
                <View
                  className="bg-gray-300 mb-10 p-5 rounded-full"
                  key={index}
                >
                  <Image
                    className="flex-start"
                    source={require("../assets/images/box.png")}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View>
                    <Text>Date:</Text>
                    <Text>Source: {item.sender}</Text>
                    <Text>Destination: {item.receiver}</Text>
                    <Text>Condition: {coreContext.foundProduct.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};
export default ProductHistoryScreen;
