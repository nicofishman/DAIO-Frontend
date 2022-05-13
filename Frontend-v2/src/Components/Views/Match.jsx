import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NavBar from '../NavBar'
import CardMatch from '../pochi/CardMatch'

const Match = ({ navigation, route }) => {

    return (
        <>
            <View style={styles.container}>
                <CardMatch/>
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    )
}

export default Match

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
})