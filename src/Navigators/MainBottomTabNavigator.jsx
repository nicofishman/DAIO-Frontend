import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from '../Views/Config';
import Match from '../Views/Match';
import Chat from '../Views/Chat';
import NavBar from '../Components/Common/NavBar';
import { getUserData } from '../Handlers/AuthHandler';
import { InteractionsProvider } from '../Context/InteractionsContext';

const MainBottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        (async () => {
            const userToken = await AsyncStorage.getItem('spotify_id');
            if (userToken === null) {
                const myUser = await getUserData();
                await AsyncStorage.setItem('spotify_id', myUser.id);
            }
        })();
    }, []);

    return (
        <InteractionsProvider>
            <Tab.Navigator initialRouteName="Match" options={{ headerShown: false }} tabBar={() => <NavBar />}>
                {/* add icons */}
                <Tab.Screen component={Config} name="Config" options={{ headerShown: false }} />
                <Tab.Screen component={Match} name="Match" options={{ headerShown: false }} />
                <Tab.Screen component={Chat} name="Chat" options={{ headerShown: false }} />
            </Tab.Navigator>
        </InteractionsProvider>
    );
};

export default MainBottomTabNavigator;
