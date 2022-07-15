import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Config from '../Views/Config';
import Match from '../Views/Match';
import Chat from '../Views/Chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../Components/Common/NavBar';
import {getUserData} from '../Handlers/AuthHandler'
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const MainBottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    useEffect(() => {
        (async () => {
            const myUser = await getUserData();
            await AsyncStorage.setItem('spotify_id', myUser.id);
        })()
    }, [])
    return (
        <Tab.Navigator options={{ headerShown: false }} initialRouteName="Match" tabBar={props => <NavBar />}>
            {/* add icons */}
            <Tab.Screen name="Config" component={Config} options={{ headerShown: false }} />
            <Tab.Screen name="Match" component={Match} options={{ headerShown: false }} />
            <Tab.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default MainBottomTabNavigator

const styles = StyleSheet.create({})