import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Components/Views/Home';
import Config from './src/Components/Views/Config';
import Chat from './src/Components/Views/Chat';
import NavBar from './src/Components/NavBar';
import { getAll } from './backend'
import { useState, useEffect } from 'react';

export default function App() {
    const Stack = createNativeStackNavigator();
    
    const [peliculas, setPeliculas] = useState()
    useEffect (() => getAll(setPeliculas), [])

    return (
        <View style={styles.container}>
            <View>
                <Text>{peliculas !== {} && JSON.stringify(peliculas)}</Text>
            </View>





            <TouchableOpacity
                onPress={() => alert('Hello, world!')}
                style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>

            
            {/*<NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Chat"
                        component={Chat}
                        options={{ title: 'Welcome' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Config" component={Config} />
                    <Stack.Screen name="Chat" component={Chat} />
                </Stack.Navigator>
            </NavigationContainer>*/}
            <StatusBar style="auto" />
        </View>
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
