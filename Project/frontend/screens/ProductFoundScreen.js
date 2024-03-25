import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";

const ProductFoundScreen = () => {
    const [productName, setProductName] = useState([
        { productName: 'Vitamin', key: "1"}
    ]);

    const [productStatus, setProductStatus] = useState([
        { productStatus: 'Good', key: "1"}
    ]);

    const navigation = useNavigation();
    return (
        <ImageBackground className="flex-1" source={require('../assets/images/bg.png')}>
        <View className="flex-1 justify-start">
            <TouchableOpacity
                className="p-3 ml-4 mt-8"
                onPress={()=> navigation.navigate('Check')}>
                <ArrowLeftIcon size="30" color="white" />
            </TouchableOpacity>
        </View>
        <View className="flex-1 flex justify-end">
        <View className="flex-2/3 bg-white px-10 pt-10"
            style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <Text 
                    className="text-gray font-bold text-4xl text-center mb-10"
                    >Product found in the system
                </Text>

            <View>
            { productName.map((item, index) => (
                <View className="bg-gray-200 mb-10 p-5 rounded-full" key={item.key}>
                    <Text className="font-bold text-lg">{item.productName}</Text>
                    <Text>Product Status: {productStatus[index].productStatus}</Text>
                </View>
            ))}
            </View>


            <TouchableOpacity className="py-4 bg-gray-900 rounded-xl mb-20"
                    onPress={()=> navigation.navigate("ProductHistory")}>
                    <Text className= "font-3xl text-white font-bold text-center">
                        View History
                    </Text>
                </TouchableOpacity>
            
        </View>

        </View>
      <StatusBar style="auto" /> 
    </ImageBackground>
    )
}
export default ProductFoundScreen;