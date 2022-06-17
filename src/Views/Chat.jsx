import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../Components/Common/NavBar'
import SpotifyLogin from '../Components/SpotifyLogin'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ navigation, route }) => {
    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(() => {
            navigation.navigate('Login');
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

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
})