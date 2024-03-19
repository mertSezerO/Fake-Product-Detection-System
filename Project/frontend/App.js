import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import AppNavigation from './navigation/AppNavigation';
import LoginScreen from './screens/LoginScreen';
import UserRoleScreen from './screens/UserRoleScreen';
import AddProductScreen from './screens/AddProductScreen';

export default function App() {
  return <AppNavigation />;
  }
