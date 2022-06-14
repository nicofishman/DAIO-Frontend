import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import {
    useFonts,
} from 'expo-font'

const Buttons = ({ active, setActive }) => {
    let [fontsLoaded] = useFonts({
        Capriola_400Regular: require('../../../assets/fonts/Capriola-Regular.ttf'),
    });
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={[styles.button, active !== 'cancion' && styles.inactive]}>
                <TouchableWithoutFeedback
                    onPress={() => setActive('cancion')}
                >
                    <Text style={styles.text}>CANCIONES</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={[styles.button, { marginLeft: 5 }, active !== 'artista' && styles.inactive]}>
                <TouchableWithoutFeedback
                    onPress={() => setActive('artista')}
                >
                    <Text style={styles.text}>ARTISTAS</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default Buttons

const styles = StyleSheet.create({
    button: {
        width: 159,
        height: 26,
        opacity: 0.5,
        borderRadius: 3,
        backgroundColor: "#ececec",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactive: {
        opacity: 1,
    },
    text: {
        width: 159,
        height: 16,
        // fontFamily: 'Capriola_400Regular' ?? 'Comic Sans Ms',
        fontSize: 12.7,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000",
    },
    verticalLine: {
        height: '100%',
        width: 10,
        backgroundColor: '#000',
    }
})