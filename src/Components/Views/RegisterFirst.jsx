import { StyleSheet, TextInput, View, Text, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { useRegisterContext } from '../../Context/RegisterContext'

const RegisterFirst = ({ navigation }) => {
    const { nombre, descripcion, handleChangeNombre, handleChangeDesc, charsLeft } = useRegisterContext();
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.inputNombre]}
                onChangeText={handleChangeNombre}
                value={nombre}
                caretHidden={true}
                placeholder={`Nombre`}
                placeholderTextColor="#999"
            />
            <TextInput
                style={[styles.input, styles.inputDesc]}
                placeholder={`Descripción`}
                onChangeText={handleChangeDesc}
                value={descripcion}
                multiline={true}
                numberOfLines={8}
            >
                <Text style={{
                    fontSize: 12,
                    color: '#999',
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                }}>
                    {charsLeft}
                </Text>
            </TextInput>
            <TouchableHighlight
                style={styles.button}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableHighlight>
        </View>
    )
}

export default RegisterFirst

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 47,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        padding: 10,
    },
    inputNombre: {
        width: 264,
        height: 51,
    },
    inputDesc: {
        width: 264,
        height: 185,
        textAlignVertical: 'top',
    },
    button: {
        width: 264,
        height: 47,
        marginTop: 40,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    buttonText: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})