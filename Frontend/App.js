import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './src/Components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Components/Views/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from './src/Components/Views/Config';
import Chat from './src/Components/Views/Chat';


export default function App() {
    const [contador, setContador] = useState(0)
    const Stack = createNativeStackNavigator();

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Config" component={Config} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Chat" component={Chat} />
                </Stack.Navigator>
            </NavigationContainer>


            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
