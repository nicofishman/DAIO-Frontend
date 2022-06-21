import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Config from '../Views/Config';
import Match from '../Views/Match';
import Chat from '../Views/Chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../Components/Common/NavBar';

const MainBottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();
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