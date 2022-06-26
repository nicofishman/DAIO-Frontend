import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBottomTabNavigator from './src/Navigators/MainBottomTabNavigator';

import RegisterNavigation from './src/Navigators/RegisterNavigation';
import LoginStackNavigator from './src/Navigators/LoginStackNavigator';
import RegisterFirst from './src/Views/RegisterFirst';
import { RegisterProvider } from './src/Context/RegisterContext';
import RegisterSecond from './src/Views/RegisterSecond';
import 'react-native-gesture-handler';

export default function App() {
    const Stack = createNativeStackNavigator();

   

    

    return (
        <RegisterProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='LoginNavigator'>
                    <Stack.Screen name="LoginNavigator" component={LoginStackNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name='Main' component={MainBottomTabNavigator} options={{ headerShown: false }}/>
                    <Stack.Screen name="Register" component={RegisterNavigation} options={{ headerShown: false }}/>
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
