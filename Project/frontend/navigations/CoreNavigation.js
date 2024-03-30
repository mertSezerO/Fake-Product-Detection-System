import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserRoleScreen from "../screens/UserRoleScreen";
import AddProductScreen from "../screens/AddProductScreen";
import ShowProductScreen from "../screens/ShowProductScreen";
import ProductHistoryScreen from "../screens/ProductHistoryScreen";
import CounterfeitScreen from "../screens/CounterfeitScreen";
import CheckScreen from "../screens/CheckScreen";
import ProductFoundScreen from "../screens/ProductFoundScreen";

import CoreProvider from '../contexts/CoreContext';

const Stack = createNativeStackNavigator();

export default function CoreNavigation() {
    return(
        <CoreProvider>
            <Stack.Navigator initialRouteName = 'UserRole'>
                    <Stack.Screen name='UserRole' component={UserRoleScreen} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name='AddProduct' component={AddProductScreen} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name='ShowProduct' component={ShowProductScreen} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name='ProductHistory' component={ProductHistoryScreen} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name='Counterfeit' component={CounterfeitScreen} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name='Check' component={CheckScreen} options={{headerShown: false}}></Stack.Screen>
                    <Stack.Screen name='ProductFound' component={ProductFoundScreen} options={{headerShown: false}}></Stack.Screen>
            </Stack.Navigator>
        </CoreProvider>
    )
}