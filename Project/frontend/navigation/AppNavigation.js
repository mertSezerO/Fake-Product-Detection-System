import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import UserRoleScreen from "../screens/UserRoleScreen";
import AddProductScreen from "../screens/AddProductScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShowProductScreen from "../screens/ShowProductScreen";
import ProductHistoryScreen from "../screens/ProductHistoryScreen";
import CounterfeitScreen from "../screens/CounterfeitScreen";
import CheckScreen from "../screens/CheckScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = 'Welcome'>
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='UserRole' component={UserRoleScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='AddProduct' component={AddProductScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='ShowProduct' component={ShowProductScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='ProductHistory' component={ProductHistoryScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Counterfeit' component={CounterfeitScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Check' component={CheckScreen} options={{headerShown: false}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}