import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { initializeFirebase } from '../../Handlers/FirebaseHandler'


const LoadingScreen = ({ navigation }) => {
    useEffect(async () => {
        const firebaseApp = await initializeFirebase();
        getAuth(firebaseApp).onAuthStateChanged(user => {
            if (user) {
                console.log('user logged in')
                navigation.navigate('Home')
            } else {
                console.log('user not logged in')
                navigation.navigate('Login')
            }
        })
    }, [])
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#000' />
            {/* <Text>LoadingScreen</Text> */}
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})