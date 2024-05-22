//handle alert boş
//touchable ekli ama çalışmıyor
//close ok ortalı istersen bak
// core foundproductname çalışmıyor
//koli ortada ama marginle

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { CoreContext } from "../contexts/CoreContext";
import { AppContext } from "../contexts/AppContext";

const ProductHistoryScreen = () => {
  const navigation = useNavigation();
  const coreContext = useContext(CoreContext);
  const appContext = useContext(AppContext);
  const [productName, setProductName] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productHistory, setProductHistory] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const gatherHistory = async () => {
      try {
        const response = await fetch(
          "http://192.168.68.55:3000/supply-chain/" +
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

  const handleAlert = async () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/images/bg.png")}
    >
      <View className="flex-1 justify-start">
        <TouchableOpacity
          className="p-3 ml-4 mt-8"
          onPress={() =>
            appContext.userRole === "Seller"
              ? navigation.navigate("SellerProductFound")
              : navigation.navigate("ProductFound")
          }
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
                  className="bg-gray-300 mb-10 p-5 rounded-full flex-row"
                  key={index}
                >
                  <Image
                    className="mt-5"
                    source={require("../assets/images/box.png")}
                    style={{ width: 30, height: 30 }}
                  ></Image>
                  <View className="mx-5">
                    <Text>Date: {item.transactionDate}</Text>
                    <Text>Source: {item.sender}</Text>
                    <Text>Destination: {item.receiver}</Text>
                    <Text>Condition: {item.productStatus}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View className="items-end">
            <TouchableOpacity
              className="py-4 bg-red-600 rounded-xl mb-20"
              style={{ width: 90 }}
            >
              <Text
                className="font-4xl text-white font-bold text-center"
                onPress={() => setModalVisible(true)}
              >
                Alert
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                className="mx-10"
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 8,
                }}
              >
                <Text
                  className="text-center"
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Your request has been received. Following the review, we will
                  get back to you via email.
                </Text>
                <Text
                  className="mt-5"
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Email Adress
                </Text>
                <TouchableWithoutFeedback
                  onPress={Keyboard.dismiss}
                  accessible={false}
                >
                  <TextInput
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  ></TextInput>
                </TouchableWithoutFeedback>
                <View className="flex-row justify-center content-between">
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                  <Button title="OK" onPress={handleAlert} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};
export default ProductHistoryScreen;
