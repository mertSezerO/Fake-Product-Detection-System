import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import {ArrowLeftIcon} from 'react-native-heroicons/solid';

export default function UserRoleScreen() {
    const navigation = useNavigation();
    return (
    <ImageBackground className="flex-1" source={require('../assets/images/bg.png')}>
        <View className="flex-1 justify-start">
            <TouchableOpacity
                className="p-3 ml-4 mt-8"
                onPress={()=> navigation.navigate('Login')}>
                <ArrowLeftIcon size="30" color="white" />
            </TouchableOpacity>
        </View>
        <View className="flex-1 flex justify-end">
        <View className="flex-2/3 bg-white px-10 pt-10"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
            <View className="flex-col mt-10 justify-around">
                <Text 
                    className="text-gray font-bold text-3xl text-center">User Role: Manufacturer
                </Text>

                <View className="mb-40 mt-20 space-y-4">
                <TouchableOpacity className="py-4 bg-gray-900 rounded-xl mb-5"
                    onPress={()=> navigation.navigate("AddProduct")}>
                    <Text className= "font-3xl text-white font-bold text-center">
                        Add Product
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="py-4 bg-gray-900 rounded-xl"
                    onPress={()=> navigation.navigate("ShowProduct")}>
                    <Text className= "font-3xl text-white font-bold text-center">
                        Show All Products
                    </Text>
                </TouchableOpacity>

                </View>

            </View>
            </View>
            
        </View>
      <StatusBar style="auto" /> 
    </ImageBackground>
    )
}