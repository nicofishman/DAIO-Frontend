import { StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import { Quicksand_700Bold, useFonts } from '@expo-google-fonts/quicksand';

const ButtonCreateAccount = ({ onPress }) => {
    const [loaded] = useFonts({
        Quicksand_700Bold
    });

    if (!loaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={styles.textButton}> CREAR CUENTA</Text>
        </TouchableWithoutFeedback>
    );
};

export default ButtonCreateAccount;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    textButton: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: windowWidth * 0.75,
        height: 50,
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#f28384',
        fontFamily: 'Quicksand_700Bold'
    }
});
