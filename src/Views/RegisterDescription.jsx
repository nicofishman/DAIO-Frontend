import { StyleSheet, Button, Text, View, TextInput, Dimensions, Image } from 'react-native'
import React from 'react'
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';


const RegisterDescription = ({ navigation }) => {
    const { descripcion, handleChangeDesc, charsLeft } = useRegisterContext();

    const nextPage = () => {
        if (descripcion.length > 0) {
            navigation.navigate('RegisterSecond');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputAll}>
                <Text style={styles.textTitle}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.inputDesc, descripcion.length <= 0 && styles.inputRed]}
                    placeholder={'"Mido un metro ochenta y uno..."'}
                    onChangeText={handleChangeDesc}
                    value={descripcion}
                    multiline={true}
                    numberOfLines={8}
                />
            </View>
            {
                descripcion.length <= 0 &&
                <Text style={styles.error}>El campo no puede estar vacío</Text>
            }
            {/* <Button title='Go Back' onPress={() => navigation.goBack()} /> */}
            <ButtonContinue onPress={nextPage} />
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerFirstBackground.png')} />
        </View>
    )
}

export default RegisterDescription

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        justifyContent: 'center',
        // fontFamily: 'Capriola_400Regular' ?? 'Comic Sans Ms',
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        height: 165,
        top: 140,
    },
    textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#1f1f1f",
        marginBottom: 5,
        // fontFamily: 'Capriola_400Regular'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
    },
    error: {
        color: '#eb4034',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    inputRed: {
        borderBottomColor: '#eb4034',
    },
})