import { StyleSheet, Text, View, TextInput, Dimensions, StatusBar, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';
import ButtonBack from '../Components/Common/ButtonBack'
import * as Progress from 'react-native-progress';

const RegisterDescription = ({ navigation }) => {
    const { descripcion, handleChangeDesc, charsLeft } = useRegisterContext();
    const [progressBarD, setprogressBarD] = useState(0.33);

    const continuar = () => {
        if (descripcion.length > 0) {
            setprogressBarD(0.66);
            setTimeout(() => {
                navigation.navigate('RegisterSecond')
            }, 500);
        }
    }
    const volver = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#ffffff"
            />
            <Progress.Bar
                position="absolute"
                progress={progressBarD}
                width={windowWidth}
                borderRadius={0}
                borderWidth={0}
                top={31}
                color='rgb(94, 157, 181)'
            />
            <View style={{ position: 'absolute', top: 60, left: 30 }} >
                <ButtonBack onPress={volver} />
            </View>
            <View style={{ top: 80 }}>
                <Text style={styles.textTitle}>Descripción</Text>
                <TextInput
                    style={[styles.inputDesc, descripcion.length <= 0 && styles.inputYellow]}
                    placeholder={'"Mido un metro ochenta y uno..."'}
                    onChangeText={handleChangeDesc}
                    value={descripcion}
                    multiline={true}
                    numberOfLines={8}
                    maxLength={150}
                />
                <View style={styles.charsLeft}>
                    <Text style={styles.charsLeftText}>
                        {charsLeft}/150
                    </Text>
                </View>
                {
                    descripcion.length <= 0 &&
                    <Text style={styles.noDescription}>
                        <Text style={styles.noDescription}>Escriba una breve descripción de su persona</Text>
                        <Text style={styles.noDescription}>, así los demas usuarios podran </Text>
                        <Text style={styles.noDescriptionUnderine}>conocerte mejor</Text>
                        <Text style={styles.noDescription}>.</Text>
                    </Text>
                }
            </View>
            <View style={{ position: 'absolute', bottom: 20 }} >
                <ButtonContinue onPress={continuar} />
            </View>
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerDescriptionBackground.png')} />

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
        // fontFamily: 'Capriola_400Regular' ?? 'Comic Sans Ms',
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        height: 260,
        top: 50,
    },
    textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#1f1f1f",
        marginBottom: 5,
        top: 90,
        // fontFamily: 'Capriola_400Regular'
    },
    inputDesc: {
        width: windowWidth * 0.8,
        height: 185,
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        top: 100,

    },
    inputYellow: {
        borderColor: '#F1F1F1',
        borderWidth: 2,

    },
    charsLeft: {
        bottom: 0,
        top: 70,
        right: 15
    },
    charsLeftText: {
        textAlign: 'right',
        color: '#8f8f8f'
    },
    noDescription: {
        width: windowWidth * 0.8,
        color: '#8f8f8f',
        bottom: -85,
        paddingLeft: 2,
        fontStyle: 'italic',
    },
    noDescriptionUnderine: {
        width: windowWidth * 0.8,
        color: '#8f8f8f',
        bottom: -85,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    }
})