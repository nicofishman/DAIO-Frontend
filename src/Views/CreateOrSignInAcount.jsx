import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import ButtonCreateAccount from '../Components/Common/ButtonCreateAccount'
import ButtonLoginAccount from '../Components/Common/ButtonLoginAccount'
import { spotifyPromptAsync } from '../Login'

const CreateOrSignInAcount = ({ navigation }) => {

    const ToLogin = () => {
        navigation.navigate('Login')
    }

    const ToCreateAccount = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../Assets/Common/logoDAIO.png')} style={styles.logo} />
                <Image style={styles.backgroundImg1} source={require('../Assets/register/createOrSignInAcountBackground1.png')} />
                <Image style={styles.backgroundImg2} source={require('../Assets/register/createOrSignInAcountBackground2.png')} />
            </View>

            <View style={{ top: 180 }}>
                <Text style={{ width: windowWidth * 0.75, left: 10, fontSize: 12 }}>
                    <Text>Al apretar "Crear Cuenta" o "Iniciar Sesion", está aceptando nuestros </Text>
                    <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>terminos y condiciones</Text>
                    <Text>. En estos dejamos en claro todos los robos de datos y actividades ilegales contra su persona.</Text>
                </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 80 }}>
                <ButtonCreateAccount onPress={ToLogin}></ButtonCreateAccount>
                <ButtonLoginAccount onPress={ToCreateAccount}></ButtonLoginAccount>
            </View>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'transparent'}
            />
        </View>
    )
}

export default CreateOrSignInAcount

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    logo: {
        resizeMode: 'contain',
        top: 100,
        width: 160,
    },
    backgroundImg1: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
    },
    backgroundImg2: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        top: 310
    },
})