import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAll } from './backend'
import { useState, useEffect } from 'react';

import Login from './src/Views/Login';
import LoadingScreen from './src/Views/LoadingScreen';
import Home from './src/Views/Home';
import Config from './src/Views/Config';
import Chat from './src/Views/Chat';
import NavBar from './src/Components/NavBar';
import Pochi from './src/Views/Pochi';
import Match from './src/Views/Match'
import RegisterFirst from './src/Views/RegisterFirst';
import RegisterSecond from './src/Views/RegisterSecond';
import RegisterSearch from './src/Views/RegisterSearch';
import { RegisterProvider } from './src/Context/RegisterContext';



export default function App() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();


    return (
        <>
            <RegisterProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Pochi' screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Pochi" component={Pochi} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Loading" component={LoadingScreen} />
                        <Stack.Screen name="Config" component={Config} />
                        <Stack.Screen name="Match" component={Match} />
                        <Stack.Screen name="Chat" component={Chat} />
                        <Stack.Screen name="RegisterFirst" component={RegisterFirst} />
                        <Stack.Screen name="RegisterSecond" component={RegisterSecond} />
                        <Stack.Screen name="RegisterSearch" component={RegisterSearch} />
                    </Stack.Navigator>
                </NavigationContainer>
            </RegisterProvider>

            <StatusBar style="auto" />
        </>
    );
    {/* <View>

    {/* <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Chat"
                        component={Chat}
                        options={{ title: 'Welcome' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <NavigationContainer>*/}
    // );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});
