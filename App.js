import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import MainBottomTabNavigator from './src/Navigators/MainBottomTabNavigator';
import RegisterNavigation from './src/Navigators/RegisterNavigation';
import LoginStackNavigator from './src/Navigators/LoginStackNavigator';
import { RegisterProvider } from './src/Context/RegisterContext';

import 'react-native-gesture-handler';

export default function App () {
    const Stack = createNativeStackNavigator();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(async () => {
        const id = await AsyncStorage.getItem('spotify_id');

        console.log('id', id);
        setIsLoggedIn(id !== null);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <RegisterProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isLoggedIn ? 'Main' : 'LoginNavigator'}>
                    <Stack.Screen component={LoginStackNavigator} name="LoginNavigator" options={{ headerShown: false }} />
                    <Stack.Screen component={MainBottomTabNavigator} name='Main' options={{ headerShown: false }} />
                    <Stack.Screen component={RegisterNavigation} name="Register" options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </RegisterProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    }
});
