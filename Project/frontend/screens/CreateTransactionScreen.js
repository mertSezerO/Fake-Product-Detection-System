import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native"
import React from "react"
import tailwindConfig from "../tailwind.config"
import { StatusBar } from "expo-status-bar"
import { useState, useContext } from "react"
import { ArrowLeftIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"

import { CoreContext } from "../contexts/CoreContext"

const CreateTransactionScreen = () => {
  //const [productName, setProductName] = useState("");
  const [receiver, setReceiver] = useState("")
  const [productCondition, setProductCondition] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const navigation = useNavigation()
  const coreContext = useContext(CoreContext)

  const handleTransaction = async () => {
    const { productId } = coreContext.selectedProduct
    console.log(productId)
    try {
      const response = await fetch(
        "http://192.168.41.60:3000/supply-chain/" + productId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: receiver,
            productCondition: productCondition,
          }),
        }
      )

      if (response.status !== 201) {
        throw new Error("HTTP error, status = " + response.status)
      }

      setModalVisible(true)
    } catch (error) {
      console.error("Create Transaction error:", error.message)
    }
  }

  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/images/bg.png")}>
      <View className="flex-1 justify-start">
        <TouchableOpacity
          className="p-3 ml-4 mt-8"
          onPress={() => navigation.navigate("Admin")}>
          <ArrowLeftIcon size="30" color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex justify-end">
        <View
          className="flex-2/3 bg-white px-10 pt-10"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
          <Text className="text-gray font-bold text-4xl text-center">
            {coreContext.selectedProduct.productName}
          </Text>

          <View className="form space-y-2">
            <View className="mb-10 mt-10">
              <Text className="text-gray-700 font-bold mb-1 ml-4">
                Destination
              </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                placeholder="Enter Destination Address"
                value={receiver}
                onChangeText={(text) => setReceiver(text)}></TextInput>
              <Text className="text-gray-700 font-bold mb-1 ml-4">
                Condition
              </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl"
                placeholder="Enter Product Condition"
                value={productCondition}
                onChangeText={(text) => setProductCondition(text)}></TextInput>
            </View>
            <View className="mb-20 mt-20 space-y-4">
              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={handleTransaction}>
                <Text className="font-3xl text-white font-extrabold text-center">
                  Create Transaction
                </Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}>
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 20,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}>
                      Transaction created successfully
                    </Text>
                    <Button
                      title="Close"
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  )
}
export default CreateTransactionScreen
