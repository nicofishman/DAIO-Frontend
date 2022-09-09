import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Views/Login';
import LoadingScreen from '../Views/LoadingScreen';
import CreateOrSignInAcount from '../Views/CreateOrSignInAcount';

const LoginStackNavigator = () => {
    const LoginStack = createNativeStackNavigator();

    return (
        <LoginStack.Navigator initialRouteName='CreateOrSignInAcount'>
            <LoginStack.Screen component={CreateOrSignInAcount} name='CreateOrSignInAcount' options={{ headerShown: false }} />
            <LoginStack.Screen component={Login} name="Login" options={{ headerShown: false }} />
            <LoginStack.Screen component={LoadingScreen} name="Loading" options={{ headerShown: false }} />
            {/* <LoginStack.Screen name="Pochi" component={Pochi} options={{ headerShown: false }} /> */}
        </LoginStack.Navigator>
    );
};

export default LoginStackNavigator;
