import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import ButtonCreateAccount from '../Components/Common/ButtonCreateAccount'
import ButtonLoginAccount from '../Components/Common/ButtonLoginAccount'

const CreateOrSignInAcount = () => {

    const ToLogin = () => {
        // navigation.navigate('RegisterDescription')
    }

    const ToCreateAccount = () => {
        // navigation.navigate('RegisterDescription')
    }

    return (
        <View style={styles.container}>
            <View style={{width: windowWidth, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../Assets/Common/logoDAIO.png')} style={styles.logo} />
                <Image style={styles.backgroundImg1} source={require('../Assets/register/createOrSignInAcountBackground1.png')} />
                <Image style={styles.backgroundImg2} source={require('../Assets/register/createOrSignInAcountBackground2.png')} />
            </View>
            
            <View style={{top: 200}}>
                <Text style={{width: windowWidth*0.8, left: 10}}>
                    <Text>Al apretar "Creat Cuenta" o "Iniciar Sesion", estas aceptando nuestros </Text>
                    <Text style={{fontStyle:'italic', textDecorationLine: 'underline'}}>terminos y condiciones</Text>
                    <Text>. En estos dejamos en claro todos los robos de datos y actividades ilegales contra su persona.</Text>
                </Text>
            </View>
            <View style={{position: 'absolute', bottom: 80}}>
                <ButtonCreateAccount OnPress={ToLogin}></ButtonCreateAccount>
                <ButtonLoginAccount OnPress={ToCreateAccount}></ButtonLoginAccount>
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