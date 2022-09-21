import { StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

const ButtonLoginAccount = ({ onPress }) => {
    const [loaded] = useFonts({
        Quicksand_700Bold
    });

    if (!loaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={styles.textButton}>Iniciar Sesión</Text>
            {/* Iniciar Sesión */}
        </TouchableWithoutFeedback>
    );
};

export default ButtonLoginAccount;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    textButton: {
        fontSize: 18,
        color: '#5E9DB5',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: windowWidth * 0.75,
        height: 50,
        borderRadius: 30,
        borderColor: '#5E9DB5',
        borderWidth: 2.3,
        fontFamily: 'Quicksand_700Bold'
    }
});
