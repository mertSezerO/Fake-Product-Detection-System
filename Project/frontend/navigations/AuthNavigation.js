import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import AuthProvider from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <AuthProvider>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}></Stack.Screen>
            </Stack.Navigator>
        </AuthProvider>
    )
}
