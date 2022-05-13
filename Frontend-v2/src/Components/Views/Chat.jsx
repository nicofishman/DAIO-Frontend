import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../NavBar'

const Chat = ({ navigation, route }) => {
    return (
        <>
            <View style={styles.container}>
                <Text>Chat</Text>
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