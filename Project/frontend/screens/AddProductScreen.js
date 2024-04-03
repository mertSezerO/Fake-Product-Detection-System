import { View, Text, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import tailwindConfig from "../tailwind.config";
import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from "react";
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";

import { CoreContext } from '../contexts/CoreContext';

const AddProductScreen = () => {
    const [productName, setProductName] = useState("")
    const [productStatus, setProductStatus] = useState("")
    const navigation = useNavigation()
    const coreContext = useContext(CoreContext)

    const handleAddProduct = async () => {
        try {
          const response = await fetch("http://192.168.41.60:3000/product", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productName: productName,
              productStatus: productStatus,
            })
          });
    
          if (response.status !== 201) {
            throw new Error('HTTP error, status = ' + response.status);
          }

          const { productId } = await response.json();

          const newProduct = {
            productId: productId,
            productName: productName,
            productStatus: productStatus
          };
          const newProducts = [...coreContext.products, newProduct];
          
          await coreContext.setProducts(newProducts);
          // show all products sayfası
          // navigate("/products");   
        } catch (error) {
          console.error("Product addition error:", error);
        }
      };
    

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
                        className="text-gray font-bold text-4xl text-center">Add New Product
                    </Text>
                <View className="form space-y-2">
                    <View className="mb-10 mt-10">
                    <Text className="text-gray-700 font-bold mb-1 ml-4">Product Name</Text>
                    <TextInput
                        className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-5"
                        placeholder="Enter Product Name"
                        value={productName}
                        onChangeText={(text) => setProductName(text)}
                        >
                    </TextInput>
                    <Text className="text-gray-700 font-bold mb-1 ml-4">Product Status</Text>
                    <TextInput
                        className="p-4 bg-gray-200 text-gray-700 rounded-2xl"
                        placeholder="Enter Product Status"
                        value={productStatus}
                        onChangeText={(text) => setProductStatus(text)}
                        >
                    </TextInput>
                    </View>
                    <View className="mb-20 mt-20 space-y-4">
                    <TouchableOpacity className="py-4 bg-gray-900 rounded-xl"
                        onPress={handleAddProduct}>
                        <Text className= "font-3xl text-white font-extrabold text-center">
                            Add Product
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
export default AddProductScreen;