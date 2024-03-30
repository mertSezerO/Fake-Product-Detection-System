import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigation from './AuthNavigation';
import CoreNavigation from "./CoreNavigation";
import {AppContext} from '../contexts/AppContext';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const appContext = useContext(AppContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthNavigation} />
                <Stack.Screen name="Core" component={CoreNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}