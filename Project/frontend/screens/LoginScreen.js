import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useContext } from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";

import { AppContext } from '../contexts/AppContext';

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const appContext = useContext(AppContext);
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://192.168.41.60:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if(response.status !== 201) {
                throw Error(response.message);
            }

            const responseData = await response.json();
            appContext.setUserToken(responseData.token);
            //check timestamp of token
            navigation.navigate('Core', {screen: 'UserRole'});
        } 
        catch (error) {
            console.log(error);
        }
    };

    return (
        <ImageBackground className="flex-1" source={require('../assets/images/bg.png')}>
        <View className="flex-1 justify-start">
            <TouchableOpacity
                className="p-3 ml-4 mt-8"
                onPress={()=> navigation.navigate('Welcome')}>
                <ArrowLeftIcon size="30" color="white" />
            </TouchableOpacity>
        </View>
        <View className="flex-1 flex justify-end">
        <View className="flex-2/3 bg-white px-10 pt-10"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <Text 
                    className="text-gray font-bold text-4xl text-center">Login
                </Text>
            <View className="form space-y-2">
                <View className="mb-10 mt-10">
                <Text className="text-gray-700 font-bold mb-1 ml-4">Email Adress</Text>
                <TextInput
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    >
                </TextInput>
                <Text className="text-gray-700 font-bold mb-1 ml-4">Password</Text>
                <TextInput
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl"
                    secureTextEntry
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    >
                </TextInput>
                </View>
                <View className="mb-20 mt-20 space-y-4">
                <TouchableOpacity className="py-4 bg-gray-900 rounded-xl"
                    onPress={()=> handleLogin()}>
                    <Text className= "font-3xl text-white font-extrabold text-center">
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center mb-2"
                    onPress={()=> navigation.navigate('Register')}>
                    <Text className="text-gray-700 text-center font-bold underline">Don't you have an account?</Text>
                </TouchableOpacity>
                </View>

            </View>
            </View>
            
        </View>
      <StatusBar style="auto" /> 
    </ImageBackground>
    )
}
export default LoginScreen;
