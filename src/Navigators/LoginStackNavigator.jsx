import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Views/Login';
import LoadingScreen from '../Views/LoadingScreen';
import Pochi from '../Views/Pochi';
import { RegisterProvider } from '../Context/RegisterContext';

const LoginStackNavigator = () => {
    const LoginStack = createNativeStackNavigator();
    return (
        <RegisterProvider>
            <LoginStack.Navigator initialRouteName='Pochi'>
                <LoginStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <LoginStack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
                <LoginStack.Screen name="Pochi" component={Pochi} options={{ headerShown: false }} />
            </LoginStack.Navigator>
        </RegisterProvider>
    )
}

export default LoginStackNavigator

const styles = StyleSheet.create({})