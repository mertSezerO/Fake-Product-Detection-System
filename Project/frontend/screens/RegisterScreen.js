import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
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
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain whitescapes.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one uppercase character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one lowercase character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one digit.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 characters long.";
    }

    return null;
  };

  const handleRegister = async () => {
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      try {
        if (password === confirmPassword) {
          const response = await fetch("http://10.125.23.167:3001/users", {
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
          alert("Passwords are not the same");
          throw Error("Passwords are not the same");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(checkPassword);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                  className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChangeText={(text) => setCompanyName(text)}
                ></TextInput>
                <Text className="text-gray-700 font-bold mb-1 ml-4">
                  Email Adress
                </Text>
                <TextInput
                  className="p-4 bg-gray-200 text-gray-700 rounded-2xl "
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
                <View className="flex-row bg-gray-200 text-gray-700 rounded-2xl items-center justify-between mb-3">
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

                <Text className="text-gray-700 font-bold mb-1 ml-4">
                  Confirm Password
                </Text>
                <View className="flex-row bg-gray-200 text-gray-700 rounded-2xl items-center justify-between">
                  <TextInput
                    className="p-4"
                    secureTextEntry={seePassword}
                    placeholder="Enter Password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
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
                    onPress={() => handleRegister()}
                  >
                    <Text className="font-3xl text-white font-extrabold text-center">
                      Register
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="py-4 bg-gray-900 rounded-xl"
                    onPress={() => handleRegister()}
                  >
                    <Text className="font-3xl text-white font-extrabold text-center">
                      Register
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};
export default RegisterScreen;
