import React from 'react'
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native'

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

const styles = StyleSheet.create({
    buttonContinue: {
        width: 224,
        height: 47,
        borderRadius: 38,
        backgroundColor: "#b3b3b3",
        marginTop: 40,
        borderColor: "#949494",
        borderWidth: 2
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