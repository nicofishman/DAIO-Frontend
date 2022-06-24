import { StyleSheet, TextInput, View, Image, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRegisterContext } from '../Context/RegisterContext'
import ButtonContinue from '../Components/Common/ButtonContinue'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const RegisterFirst = ({ navigation }) => {
    const { username, descripcion, handleChangeNombre, handleChangeDesc, spotifyId, charsLeft } = useRegisterContext();


    useEffect(() => {
        console.log('RegisterFirst', spotifyId);
    }, [spotifyId])
    const continuar = () => {
        if (username.length > 0 && descripcion.length > 0) {
            navigation.navigate('RegisterSecond')
        }
    }

    return (
        <View style={styles.container}>
            {/* <ImageBackground style={styles.backgroundImg} source={require('../Assets/register/registerFirstBackground.png')}> */}
            <View style={{ position: "relative", }}>
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
                    style={[styles.input, styles.inputNombre, username.length <= 0 && styles.inputWarning]}
                    onChangeText={handleChangeNombre}
                    value={username}
                    caretHidden={true}
                    placeholder={spotifyId}
                    placeholderTextColor="#d4d4d4"
                />
            </View>
            <View style={styles.inputAll}>
                <Text style={styles.textTitle}>Descripcion</Text>
                <TextInput
                    style={[styles.input, styles.inputDesc, descripcion.length <= 0 && styles.inputRed]}
                    placeholder={`Descripción`}
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
            <ButtonContinue onPress={continuar} />
            <Image style={styles.backgroundImg} blurRadius={1.5} source={require('../Assets/register/registerFirstBackground.png')} />
            {/* </ImageBackground> */}
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
        justifyContent: 'center',
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        top: 60,
        width: windowWidth,
        height: 165
    },
    inputAll: {
        marginTop: 45,
    },
    textTitle: {
        color: "#1f1f1f",
        marginBottom: 5
    },
    avatar: {
        width: 120,
        height: 120,

    },
    edit: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#b1b1b1",
        padding: 10,
        color: "white",
        fontSize: 23,
        borderRadius: 50
    },
    input: {
        borderRadius: 4,
        backgroundColor: "#f2f2f2",
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
    },
    error: {
        color: '#eb4034',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    inputRed: {
        borderColor: '#eb4034',
        borderWidth: 2,
    },
    inputWarning: {
        borderColor: '#FFCC00',
        borderWidth: 1,
    },
    warning: {
        color: '#FFCC00',
        width: 264,
        fontWeight: 'bold',
        textAlign: 'right',
    }
})