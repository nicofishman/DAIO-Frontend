import { StyleSheet, StatusBar, Text, View, TextInput, Dimensions, ActivityIndicator, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { useFonts } from 'expo-font';

import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';
import ButtonBack from '../Components/Common/ButtonBack';

const RegisterDescription = ({ navigation }) => {
    const { descripcion, handleChangeDesc, charsLeft, progressBar, setProgressBar } = useRegisterContext();

    const [loaded] = useFonts({
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf')
    });

    const continuar = () => {
        if (descripcion.length > 0) {
            setProgressBar(0.50);
            setTimeout(() => {
                navigation.navigate('RegisterSecond');
            }, 500);
        } else {
            Alert.alert('Cuidado!', 'Debes ingresar una descripción');
        }
    };
    const volver = () => {
        setProgressBar(0);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                loaded
                    ? (
                        <>
                            <Progress.Bar
                                color='rgb(94, 157, 181)'
                                progress={progressBar}
                                style={styles.progressBar}
                                width={windowWidth}
                            />
                            <View style={styles.buttonBack} >
                                <ButtonBack onPress={volver} />
                            </View>
                            <ScrollView style={{ top: 150 }}>
                                <Text style={styles.textTitle}>Descripción</Text>
                                <View>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={8}
                                        placeholder={'"Me gusta el arte, todo tipo de arte..."'}
                                        style={[styles.inputDesc, descripcion.length <= 0 && styles.inputYellow]}
                                        value={descripcion}
                                        onChangeText={handleChangeDesc}
                                    />
                                    <View style={styles.charsLeft}>
                                        <Text style={styles.charsLeftText}>
                                            {charsLeft}/150
                                        </Text>
                                    </View>
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
                            </ScrollView>
                            <ButtonContinue onPress={continuar} />
                            <Image source={require('../Assets/register/registerFirstBackground.png')} style={styles.backgroundImg} />

                            <StatusBar
                                backgroundColor={'transparent'}
                                barStyle="dark-content"
                            />
                        </>
                    )
                    : (
                        <ActivityIndicator />
                    )}
        </SafeAreaView>
    );
};

export default RegisterDescription;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fcfcfc',
        alignItems: 'center'
        // fontFamily: 'Capriola_400Regular' ?? 'Comic Sans Ms',
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        height: 260,
        top: 50
    },
    textTitle: {
        fontSize: 28,
        color: '#1f1f1f',
        marginBottom: 5,
        fontFamily: 'QuicksandBold'
    },
    inputDesc: {
        width: windowWidth * 0.8,
        height: 185,
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        fontFamily: 'QuicksandRegular'
    },
    inputYellow: {
        borderColor: '#F1F1F1',
        borderWidth: 2

    },
    charsLeft: {
        right: 15,
        bottom: 0,
        marginBottom: 10,
        position: 'absolute'
    },
    charsLeftText: {
        textAlign: 'right',
        color: '#8f8f8f',
        fontFamily: 'QuicksandRegular'
    },
    noDescription: {
        width: windowWidth * 0.8,
        color: '#8f8f8f',
        paddingLeft: 2,
        fontStyle: 'italic',
        fontFamily: 'QuicksandRegular'
    },
    noDescriptionUnderine: {
        width: windowWidth * 0.8,
        color: '#8f8f8f',
        bottom: -85,
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    progressBar: {
        borderRadius: 0,
        borderWidth: 0,
        top: StatusBar.currentHeight,
        position: 'absolute'
    },
    buttonBack: {
        position: 'absolute',
        top: StatusBar.currentHeight + 20,
        left: 35
    }
});
