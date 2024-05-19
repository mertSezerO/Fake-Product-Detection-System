import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useContext } from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

import { CoreContext } from "../contexts/CoreContext";

export default function AdminScreen() {
  const navigation = useNavigation();
  const coreContext = useContext(CoreContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.125.23.167:3000/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const { products } = await response.json();
        await coreContext.setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/images/bg.png")}
    >
      <View className="flex-1 justify-start">
        <TouchableOpacity
          className="p-3 ml-4 mt-8"
          onPress={() => navigation.navigate("Auth", { screen: "Welcome" })}
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
            <Text className="text-gray font-bold text-3xl text-center">
              Admin Panel
            </Text>

            <View className="mb-40 mt-20 space-y-4">
              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => navigation.navigate("AddProduct")}
              >
                <Text className="font-3xl text-white font-bold text-center">
                  Add Product
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => navigation.navigate("ShowProduct")}
              >
                <Text className="font-3xl text-white font-bold text-center">
                  Show All Products
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => navigation.navigate("ProductTransaction")}
              >
                <Text className="font-3xl text-white font-bold text-center">
                  Create Transaction
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
