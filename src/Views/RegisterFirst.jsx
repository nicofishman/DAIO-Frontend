import { StyleSheet, TextInput, View, Image, Text, Dimensions, StatusBar, SafeAreaView, TouchableWithoutFeedback, ScrollView } from 'react-native'
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
    let sourceImage = ['../Assets/Avatars/AvatarsToChoose/avatar', avatarId, '.png'].join('');

    let AvatarArray = [
        [require('../Assets/Avatars/AvatarsToChoose/avatar1.png'),
        require('../Assets/Avatars/AvatarsToChoose/avatar2.png'),
        require('../Assets/Avatars/AvatarsToChoose/avatar3.png')],
        [require('../Assets/Avatars/AvatarsToChoose/avatar4.png'),
        require('../Assets/Avatars/AvatarsToChoose/avatar5.png'),
        require('../Assets/Avatars/AvatarsToChoose/avatar6.png')],
        [require('../Assets/Avatars/AvatarsToChoose/avatar7.png'),
        require('../Assets/Avatars/AvatarsToChoose/avatar8.png'),
        require('../Assets/Avatars/AvatarsToChoose/avatar9.png')]
    ];

    function showIconSelected() {
        switch (avatarId) {
            case -1:
                return <Image source={require('../Assets/Avatars/Default.png')} style={styles.avatar} />
            case 0:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar1.png')} style={styles.avatar} />
            case 1:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar2.png')} style={styles.avatar} />
            case 2:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar3.png')} style={styles.avatar} />
            case 3:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar4.png')} style={styles.avatar} />
            case 4:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar5.png')} style={styles.avatar} />
            case 5:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar6.png')} style={styles.avatar} />
            case 6:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar7.png')} style={styles.avatar} />
            case 7:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar8.png')} style={styles.avatar} />
            case 8:
                return <Image source={require('../Assets/Avatars/AvatarsToChoose/avatar9.png')} style={styles.avatar} />
        }
    }
    // useEffect(() => {
    //     console.log(avatarId);
    //     showIconSelected()
    // }, [avatarId])

    useEffect(() => {
        if (isOpenAvatarPicker) {
            setIconText('close');
        } else {
            setIconText('edit');
        }
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
                        {
                            //XD no hay imagenes dinamicas en rn
                            showIconSelected()
                        }
                        <MaterialIcons
                            name={iconText}
                            style={styles.edit}
                        />

                    </View>
                </TouchableWithoutFeedback>
            </View>
            {isOpenAvatarPicker ? (
                <View style={{
                    flexDirection: 'column', position: 'relative', top: 120, justifyContent: 'center', backgroundColor: 'rgba(201, 201, 201, 0.4)', borderRadius: 55, padding: 30, overflow: 'scroll', maxHeight:
                        400
                }}>
                    <View blurRadius={10} style={styles.avatarBox}>
                        {
                            AvatarArray.map((row, rowIndex) => {
                                return (
                                    <View key={row} style={{ flexDirection: 'row' }}>
                                        {row.map((image, index) => {
                                            return (
                                                <TouchableWithoutFeedback key={index} onPress={() => {
                                                    console.log(index, rowIndex);
                                                    setAvatarId(index + (rowIndex * 3))
                                                }}>
                                                    <Image
                                                        key={index}
                                                        source={image}
                                                        style={styles.avatarPick}
                                                    />
                                                </TouchableWithoutFeedback>
                                            )
                                        })}
                                    </View>
                                )
                            })
                        }
                    </View>
                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>Elige un avatar para que te puedan identificar</Text>
                </View>

            ) : (
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
            )
            }
            <ButtonContinue onPress={continuar} />
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerFirstBackground.png')} />
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'transparent'}
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
    avatarBox: {
        flexDirection: 'column',
        // flexWrap: 'wrap',
        width: 310,
        height: 650 / 2
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
    avatarPick: {
        width: 300 / 3,
        height: 650 / 6,
        flexGrow: 1,
        borderRadius: 80,
        resizeMode: 'contain',
        marginRight: 5,
    }
})