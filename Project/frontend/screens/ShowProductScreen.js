import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React, { useContext } from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";

import { ProductContext } from '../contexts/AppContext';

const ShowProductScreen = () => {
    const navigation = useNavigation();

    const productContext = useContext(ProductContext);
    
    return (
        <ImageBackground className="flex-1" source={require('../assets/images/bg.png')}>
        <View className="flex-1 justify-start">
            <TouchableOpacity
                className="p-3 ml-4 mt-8"
                onPress={()=> navigation.navigate('UserRole')}>
                <ArrowLeftIcon size="30" color="white" />
            </TouchableOpacity>
        </View>
        <View className="flex-1 flex justify-end">
        <View className="flex-2/3 bg-white px-10 pt-10"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <Text 
                    className="text-gray font-bold text-4xl text-center mb-10">All Products
                </Text>
            
        <ScrollView>
            { productContext.products.map((item, index) => (
                <View className="bg-gray-200 mb-10 p-5 rounded-full" key={index}>
                    <Text className="font-bold text-lg">{item.productName}</Text>
                    <Text>Product Status: {productContext.products[index].productStatus}</Text>
                </View>
            ))}
        </ScrollView>
        </View>
        </View>
      <StatusBar style="auto" /> 
    </ImageBackground>
    )
}
export default ShowProductScreen;