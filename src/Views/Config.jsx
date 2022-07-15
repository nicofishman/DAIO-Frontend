import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Common/NavBar'
import SpotifyLogin from '../Components/SpotifyLogin'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = ({ navigation, route }) => {
    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(() => {
            navigation.navigate('LoginNavigator', { screen: 'CreateOrSignInAcount' });
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <View style={styles.container}>
                <SpotifyLogin title='Log Out' fnOnPress={logOut} />
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    )
}

export default Config

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    input: {
        height: 40,
        padding: 5,
        color: '#e0e0e0',
        fontSize: 18,
    },
    inputBar: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between'
    },
    card: {
        height: 100,
        width: 300,
        backgroundColor: '#ccc',
        flexDirection: 'column',
    },
    line: {
        width: 300,
        height: 4,
        backgroundColor: 'black',
        marginBottom: 40,
        borderRadius: 5
    },
    iconSearch: {
        fontSize: 30,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 10
    }
})