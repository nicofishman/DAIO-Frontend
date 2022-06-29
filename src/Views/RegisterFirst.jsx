import { StyleSheet, TextInput, View, Image, Text, Dimensions, StatusBar, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRegisterContext } from '../Context/RegisterContext'
import ButtonContinue from '../Components/Common/ButtonContinue'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Progress from 'react-native-progress';
import {
    Capriola_400Regular
} from '@expo-google-fonts/capriola'
import { useFonts } from 'expo-font'
import { NavigationHelpersContext } from '@react-navigation/native'

const RegisterFirst = ({ navigation }) => {
    const { username, handleChangeNombre, avatarId, setAvatarId, progressBar, setProgressBar } = useRegisterContext();
    const [isOpenAvatarPicker, setIsOpenAvatarPicker] = useState(false);
    const [iconText, setIconText] = useState('edit');
    let ImageArray = [];
    
    for (var i = 0; i < 9; i++) {
       ImageArray.push(`../Assets/Avatars/AvatarsToChoose/${i}.png`)
    }

    useEffect(() => {
        if(isOpenAvatarPicker){
            setIconText('close');
        } else {
            setIconText('edit');
        }
        console.log(isOpenAvatarPicker);
    }, [isOpenAvatarPicker])
    

    const continuar = () => {
        setProgressBar(0.33)
        setTimeout(() => {
            navigation.navigate('RegisterDescription')
        }, 500);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Progress.Bar
                progress={progressBar}
                width={windowWidth}
                color='rgb(94, 157, 181)'
                style={styles.progressBar}
            />
            <View style={{ top: 190 }}>
                <TouchableWithoutFeedback onPress={() => setIsOpenAvatarPicker(!isOpenAvatarPicker)}>
                    <View>
                        <Image
                            source={require('../Assets/Avatars/Default.png')}
                            style={styles.avatar}
                        />
                        {isOpenAvatarPicker && 
                            <MaterialIcons 
                                name={iconText}
                                style={styles.edit}
                            />
                        }
                    </View>
                </TouchableWithoutFeedback>
                <View style={{backgroundColor: 'blue', flexDirection: "column", bottom: 0,}}>
                    {
                        ImageArray.map((image, index) => {
                            return (
                                console.log(image),
                                <Image 
                                    key={index} 
                                    source={require('../Assets/Avatars/AvatarsToChoose/1.png')}
                                    style={{width: windowWidth/4, height: windowHeight, backgroundColor: "red"}} 
                                />
                            )
                        })
                        // isOpenAvatarPicker && (
                        // )
                    }
                </View>
            </View>
            <View style={{ top: 150 }}>
                <Text style={styles.textTitle}>Nombre</Text>
                <TextInput
                    style={[styles.input, username.length <= 0 && styles.inputRed]}
                    onChangeText={handleChangeNombre}
                    value={username}
                    caretHidden={true}
                    placeholder={'Ingresa tu nombre'}
                    placeholderTextColor="#d4d4d4"
                    spellCheck={false}
                    autoCorrect={false}
                />
                {
                    username.length === 0 &&
                    <Text style={{ marginTop: 4, color: 'red', fontWeight: 'bold' }}>Debes ingresar un nombre para continuar.</Text>
                }
            </View>
            <ButtonContinue onPress={continuar} />
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerFirstBackground.png')} />
            <StatusBar
                backgroundColor="transparent"
            />
        </SafeAreaView>
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
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        width: 264,
        height: 51,
    },
    inputRed: {
        borderBottomColor: '#eb4034',
    },
    inputWarning: {
        borderBottomColor: '#FFCC00',
        borderRadius: 4,
    },
    progressBar: {
        borderRadius: 0,
        borderWidth: 0,
        top: StatusBar.currentHeight,
        position: "relative"
    },
})