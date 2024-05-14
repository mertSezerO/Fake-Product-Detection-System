import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (password === confirmPassword) {
        const response = await fetch("http://10.125.19.216:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName: companyName,
            email: email,
            password: password,
          }),
        });

        if (response.status !== 201) {
          throw Error(response.message);
        }

        navigation.navigate("Login");
      } else {
        throw Error("Passwords are not the same");
      }
    } catch (error) {
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
          <Text className="text-gray font-bold text-4xl text-center">
            Register
          </Text>
          <View className="form space-y-2">
            <View className="mb-10 mt-10">
              <Text className="text-gray-700 font-bold mb-1 ml-4">
                Company Name
              </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                placeholder="Enter Company Name"
                value={companyName}
                onChangeText={(text) => setCompanyName(text)}
              ></TextInput>
              <Text className="text-gray-700 font-bold mb-1 ml-4">
                Email Adress
              </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                placeholder="Enter Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              <Text className="text-gray-700 font-bold mb-1 ml-4">
                Password
              </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                secureTextEntry
                placeholder="Enter Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              ></TextInput>

              <Text className="text-gray-700 font-bold mb-1 ml-4">
                Confirm Password
              </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl"
                secureTextEntry
                placeholder="Enter Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              ></TextInput>
            </View>
            <View className="mb-20 mt-20 space-y-4">
              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => handleRegister()}
              >
                <Text className="font-3xl text-white font-extrabold text-center">
                  Register
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
export default RegisterScreen;
