import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useContext, useEffect } from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import * as Network from "expo-network";

import { AppContext } from "../contexts/AppContext";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  //   useEffect(async () => {
  //     const resolveAddress = async () => {
  //       const ip = await Network.getIpAddressAsync();
  //       appContext.setNetworkIP(ip);
  //     };

  //     await resolveAddress();
  //   }, []);

  const handleAction = async (role) => {
    if (role === "User") {
      await appContext.setUserRole(role);
      navigation.navigate("Core", { screen: "Check" });
    } else if (role === "Seller") {
      await appContext.setUserRole(role);
      navigation.navigate("Login");
    } else {
      await appContext.setUserRole(role);
      navigation.navigate("Login");
    }
  };

  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/images/bg.png")}
    >
      <View className="flex-1 flex justify-end">
        <View
          className="flex-2/3 bg-white px-10 pt-10"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="flex-col mt-10 justify-around">
            <Text className="text-gray font-bold text-5xl text-center">
              Welcome!
            </Text>

            <View className="mb-20 mt-20 space-y-4">
              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => handleAction("Manufacturer")}
              >
                <Text className="font-3xl text-white font-bold text-center">
                  Manufacturer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="py-4 bg-gray-900 rounded-xl"
                onPress={() => handleAction("Seller")}
              >
                <Text className="font-3xl text-white font-bold text-center">
                  Seller
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-4 bg-gray-900 rounded-xl">
                <Text
                  className="font-3xl text-white font-extrabold text-center"
                  onPress={() => handleAction("User")}
                >
                  User
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

/*
<View className="flex-row justify-center bg-white"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>

            <Text className="text-black">Open up App.js to start working on your app!</Text>
            </View>
-----
<SafeAreaView className="flex-1">
        <ImageBackground source={require('../assets/images/bg.png')}>
            <View className="flex-row justify-center">
                <Text className="text-white">here</Text>
            </View>
        <View className="flex-col">
        <View className="flex-end bg-black px-10 pt-10"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
        >
            <View className="form space-y-2">
                <Text className="text-white-800 ml-4">Welcome!</Text>
            </View>

        </View>
        </View>
        </ImageBackground>
        </SafeAreaView>
<ImageBackground
            source={require('../assets/images/ust.jpg')}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 24 }}>Welcome!</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>


<View className= "flex-1 bg-white justify-center items-center" style={{backgroundColor: 'blue'}}>
        <SafeAreaView>
            <Text>Welcome</Text>
        </SafeAreaView>
            
        </View>

<View className="flex-1 bg-white px-8 pt-8"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
        >
            <View className="form space-y-2">
                <Text className="text-gray-700 ml-4">Welcome!</Text>
            </View>
        </View>
*/
