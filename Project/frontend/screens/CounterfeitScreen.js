import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import {ArrowLeftIcon} from 'react-native-heroicons/solid';

export default function CounterfeitScreen() {
    const navigation = useNavigation();
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
            <View className="flex-col mt-10 justify-around">
                <Text 
                    className="text-gray font-bold text-3xl text-center mb-20 mt-10">This product is counterfeit!
                </Text>

                <View className="mb-40 mt-20 space-y-4">

                <View className="flex justify-center items-center space-y-6">

                <Image source={require('../assets/images/cross.png')}
                    style={{width:150, height:150}}></Image>
                <TouchableOpacity className="py-4 bg-red-600 rounded-xl mb-20"
                    style={{width:90}}
                    onPress={()=> navigation.navigate("AddProduct")}>
                    <Text className= "font-4xl text-white font-bold text-center">
                        Alert
                    </Text>
                </TouchableOpacity>

                </View>
                </View>

            </View>
            </View>
            
        </View>
      <StatusBar style="auto" /> 
    </ImageBackground>
    )
}