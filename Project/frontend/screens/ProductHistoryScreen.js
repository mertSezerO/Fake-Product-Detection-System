import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";

const ProductHistoryScreen = () => {
    const [productName, setProductName] = useState([
        { productName: 'Multivitamin', key: "1"},
        { productName: 'Multivitamin', key: "2"},
        { productName: 'Multivitamin', key: "3"}
    ]);

    const [transactionDate, setTransactionDate] = useState([
        { transactionDate: '23-01-23', key: "1"},
        { transactionDate: '23-01-23', key: "2"},
        { transactionDate: '23-01-23', key: "3"}
    ]);

    const [transactionSource, setTransactionSource] = useState([
        { sender: 'A Company', key: "1"},
        { sender: 'A Company', key: "2"},
        { sender: 'A Company', key: "3"}
    ]);

    const [transactionDestination, setTransactionDestination] = useState([
        { receiver: 'B Company', key: "1"},
        { receiver: 'B Company', key: "2"},
        { receiver: 'B Company', key: "3"}
    ]);

    const [productStatus, setProductStatus] = useState([
        { productStatus: 'Good', key: "1"},
        { productStatus: 'Good', key: "2"},
        { productStatus: 'Good', key: "3"}
    ]);

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
                <Text 
                    className="text-gray font-bold text-4xl text-center mb-10">Product History
                </Text>
                
                <Text className="font-bold text-xl mb-5">Multivitamin</Text>
        <ScrollView>
        <View className="border-l border-gray-500 h-full mr-4">
            { productName.map((item, index) => (
                <View className="bg-gray-300 mb-10 p-5 rounded-full" key={item.key}>
                    <Image className="flex-start" source={require('../assets/images/box.png')} 
                        style={{width:30, height:30}}></Image>
                    <View>
                    <Text>Date: {transactionDate[index].transactionDate}</Text>
                    <Text>Source: {transactionSource[index].sender}</Text>
                    <Text>Destination: {transactionDestination[index].receiver}</Text>
                    <Text>Condition: {productStatus[index].productStatus}</Text>
                    </View>
                </View>
            ))}
        </View>
        </ScrollView>
        </View>

        </View>
      <StatusBar style="auto" /> 
    </ImageBackground>
    )
}
export default ProductHistoryScreen;