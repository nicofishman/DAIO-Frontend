import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {
    useFonts,
} from 'expo-font'

const Buttons = ({ active, setActive }) => {
    let [fontsLoaded] = useFonts({
        Capriola_400Regular: require('../../../assets/fonts/Capriola-Regular.ttf'),
    });
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback
                onPress={setActive('cancion')}
                style={[styles.button, active === 'cancion' ? styles.active : null]}
            >
                <Text style={styles.text}>CANCIONES</Text>
            </TouchableWithoutFeedback>
            <View style={{ marginLeft: 10 }}>
                <TouchableWithoutFeedback
                    onPress={setActive('cancion')}
                    style={[styles.button, active === 'cancion' ? styles.active : null]}
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
        shadowOpacity: 1
    },
    text: {
        width: 159,
        height: 16,
        fontFamily: 'Capriola_400Regular',
        fontSize: 12.7,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        // color: "#404040"
    }
})