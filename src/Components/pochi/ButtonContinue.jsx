import React from 'react'
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native'

const ButtonContinue = ({ onPress }) => {
    return (
        <Pressable
            style={styles.buttonContinue}
            onPress={onPress}
        >
            <Text style={styles.textButton}>CONTINUAR</Text>
        </Pressable>
    );
}


export default ButtonContinue

const styles = StyleSheet.create({
    buttonContinue: {
        width: 224,
        height: 47,
        borderRadius: 38,
        backgroundColor: "#ffffff",
        marginTop: 40,
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