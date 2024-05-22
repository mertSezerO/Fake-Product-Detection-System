//touchable ekli ama çalışmıyor
//login popup format kontrol
//password?

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Image,
  Button,
} from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../contexts/AppContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const appContext = useContext(AppContext);
  const navigation = useNavigation();

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.68.55:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status !== 201) {
        throw Error(response.message);
      }

      const responseData = await response.json();
      appContext.setUserToken(responseData.token);
      //check timestamp of token
      if (appContext.userRole === "Manufacturer") {
        navigation.navigate("Core", { screen: "Admin" });
      } else {
        navigation.navigate("Core", { screen: "Check" });
      }
    } catch (error) {
      setModalVisible(true);
      console.log(error);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View
            className="flex-2/3 bg-white px-10 pt-10"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <Text className="text-gray font-bold text-4xl text-center">
              Login
            </Text>

            <View>
              <View className="form space-y-2">
                <View className="mb-10 mt-10">
                  <Text className="text-gray-700 font-bold mb-1 ml-4">
                    Email Adress
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl"
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={handleCheckEmail}
                  ></TextInput>
                  {checkValidEmail ? (
                    <Text className="text-red-500 mb-5 ml-40">
                      Wrong format email
                    </Text>
                  ) : (
                    <Text> </Text>
                  )}

                  <Text className="text-gray-700 font-bold mb-1 ml-4">
                    Password
                  </Text>
                  <View className="flex-row bg-gray-200 text-gray-700 rounded-2xl items-center justify-between">
                    <TextInput
                      className="p-4"
                      secureTextEntry={seePassword}
                      placeholder="Enter Password"
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                    ></TextInput>
                    <View className="items-end mx-5">
                      <TouchableOpacity
                        onPress={() => setSeePassword(!seePassword)}
                      >
                        <Image
                          source={
                            seePassword
                              ? require("../assets/images/view.png")
                              : require("../assets/images/eye.png")
                          }
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View className="mb-20 mt-20 space-y-4">
                  {email == "" || password == "" || checkValidEmail == true ? (
                    <TouchableOpacity
                      disabled
                      className="py-4 bg-gray-400 rounded-xl"
                      onPress={() => handleLogin()}
                    >
                      <Text className="font-3xl text-white font-extrabold text-center">
                        Login
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="py-4 bg-gray-900 rounded-xl"
                      onPress={() => handleLogin()}
                    >
                      <Text className="font-3xl text-white font-extrabold text-center">
                        Login
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    className="flex items-center mb-2"
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text className="text-gray-700 text-center font-bold underline">
                      Don't you have an account?
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
                      style={{
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        User not found.
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
        </TouchableWithoutFeedback>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};
export default LoginScreen;
