import { StyleSheet, TextInput, View, Image, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useRegisterContext } from '../Context/RegisterContext'
import ButtonContinue from '../Components/Common/ButtonContinue'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
    Capriola_400Regular
} from '@expo-google-fonts/capriola'
import { useFonts } from 'expo-font'


const RegisterFirst = ({ navigation }) => {
    const { username, handleChangeNombre, spotifyId } = useRegisterContext();
    // const [loaded] = useFonts({
    //     Capriola_400Regular
    // });
    // if (!loaded) {
    //     return <AppLoading />;
    // }
    const continuar = () => {
        if (username.length > 0) {
            navigation.navigate('RegisterDescription')
        }
    }
    return (

        <View style={styles.container}>
            <View style={{ position: "relative", top: 200 }}>
                <Image
                    source={require('../Assets/Avatars/Default.png')}
                    style={styles.avatar}
                />
                <MaterialIcons name="edit"
                    style={styles.edit}

                />
            </View>
            <View style={styles.inputAll}>
                <Text style={styles.textTitle}>Nombre</Text>
                <TextInput
                    style={[styles.input, styles.inputNombre, username.length <= 0 && styles.inputRed]}
                    onChangeText={handleChangeNombre}
                    value={username}
                    caretHidden={true}
                    placeholder={'Ingresa tu nombre'}
                    placeholderTextColor="#d4d4d4"
                />
            </View>
            <ButtonContinue onPress={continuar} />
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerFirstBackground.png')} />
        </View>
    )
}

export default RegisterFirst

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
    avatar: {
        width: 160,
        height: 160,
        top: -100,
        borderRadius: 80,
    },
    edit: {
        position: "absolute",
        borderRadius: 50,
        bottom: 90,
        right: 0,
        padding: 10,
        fontSize: 38,
        color: "#000",
        backgroundColor: "white",
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        height: 165,
        top: 140,
    },
    inputAll: {
        top: 150,
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
    inputWarning: {
        borderBottomColor: '#FFCC00',
        borderRadius: 4,
    },
    warning: {
        color: '#FFCC00',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'right',
    }
})