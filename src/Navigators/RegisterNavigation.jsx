import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterFirst from '../Views/RegisterFirst';
import RegisterSecond from '../Views/RegisterSecond';
import RegisterSearch from '../Views/RegisterSearch';
import { RegisterProvider } from '../Context/RegisterContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RegisterNavigation = () => {
    const RegisterStack = createNativeStackNavigator();
    return (
        <RegisterStack.Navigator>
            <RegisterStack.Screen name="RegisterFirst" component={RegisterFirst} options={{ headerShown: false }} />
            <RegisterStack.Screen name="RegisterSecond" component={RegisterSecond} options={{ headerShown: false }} />
            <RegisterStack.Screen name="RegisterSearch" component={RegisterSearch} options={{ headerShown: false }} />
        </RegisterStack.Navigator>
    );
}

export default RegisterNavigation

const styles = StyleSheet.create({})