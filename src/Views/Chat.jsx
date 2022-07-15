import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../Components/Common/NavBar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ navigation, route }) => {
    return (
        <>
            <View style={styles.container}>
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