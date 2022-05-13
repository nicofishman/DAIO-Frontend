import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../NavBar'
import * as AuthSession from 'expo-auth-session';


const Home = ({ navigation, route }) => {
    console.log(AuthSession.makeRedirectUri());

    return (
        <>
            <View style={styles.container}>
                <Text style={{ color: '#000' }}>CASA</Text>
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
})