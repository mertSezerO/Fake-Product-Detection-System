import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import UserRoleScreen from "../screens/UserRoleScreen";
import AddProductScreen from "../screens/AddProductScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = 'Welcome'>
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='UserRole' component={UserRoleScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='AddProduct' component={AddProductScreen} options={{headerShown: false}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}