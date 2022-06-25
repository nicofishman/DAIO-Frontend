import React from 'react'
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Dimensions } from 'react-native'

const ButtonContinue = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.buttonContinue}
            onPress={onPress}
        >
            <Text style={styles.textButton}>CONTINUAR</Text>
        </TouchableOpacity>
    );
}


export default ButtonContinue

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonContinue: {
        width: windowWidth/1.5,
        height: windowHeight/15,
        borderRadius: 38,
        backgroundColor: "#fff",
        borderColor: "#5E9DB5",
        borderWidth: 3
    },
    textButton: {
        flex: 1,
        fontSize: 22,
        color: "#000",
        //fontFamily: 'AverageSans_400Regular',
        letterSpacing: 0,
        textAlign: "center",
        textAlignVertical: "center"
    }
})