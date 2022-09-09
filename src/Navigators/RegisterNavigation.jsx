import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterFirst from '../Views/RegisterFirst';
import RegisterSecond from '../Views/RegisterSecond';
import RegisterSearch from '../Views/RegisterSearch';
import RegisterThird from '../Views/RegisterThird';
import RegisterDescription from '../Views/RegisterDescription';
import 'react-native-gesture-handler';

const RegisterNavigation = () => {
    const RegisterStack = createNativeStackNavigator();

    return (
        <RegisterStack.Navigator>
            <RegisterStack.Screen component={RegisterFirst} name="RegisterFirst" options={{ headerShown: false }} />
            <RegisterStack.Screen component={RegisterDescription} name="RegisterDescription" options={{ headerShown: false }} />
            <RegisterStack.Screen component={RegisterSecond} name="RegisterSecond" options={{ headerShown: false }} />
            <RegisterStack.Screen component={RegisterThird} name="RegisterThird" options={{ headerShown: false }} />
            <RegisterStack.Screen component={RegisterSearch} name="RegisterSearch" options={{ headerShown: false }} />
        </RegisterStack.Navigator>
    );
};

export default RegisterNavigation;
