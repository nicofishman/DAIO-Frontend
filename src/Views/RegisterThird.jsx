import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, StatusBar, Dimensions, TextInput } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import ButtonBack from '../Components/Common/ButtonBack';
import ButtonContinue from '../Components/Common/ButtonContinue';
import * as Progress from 'react-native-progress';
import { useRegisterContext } from '../Context/RegisterContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../Handlers/AuthHandler';
import AntDesign from 'react-native-vector-icons/AntDesign'


const RegisterThird = ({ navigation }) => {
    const { instagram, setInstagram, artistPreference, songPreference, username, descripcion, spotifyId, avatarId, progressBar, setProgressBar } = useRegisterContext();

    const [loaded] = useFonts({
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
    });

    const volver = () => {
        setProgressBar(0.50);
        navigation.goBack()
    }

    const finishRegister = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken);
        await addUser({
            spotifyId,
            username,
            description: descripcion,
            avatarId: avatarId,
            tracks: songPreference,
            artists: artistPreference
        })
        setProgressBar(0.75);
        setTimeout(() => {
            navigation.navigate('Main', { screen: 'Match' })
        }, 500);
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                loaded ? (
                    <>
                        <Progress.Bar
                            progress={progressBar}
                            width={windowWidth}
                            color='rgb(94, 157, 181)'
                            style={styles.progressBar}
                        />
                        <View style={styles.buttonBack} >
                            <ButtonBack onPress={volver} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textTitle}>Ingresa tu Instaram para hablar con tus match</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#000', width: windowWidth * .7, marginTop: 15 }}>
                                <AntDesign style={{ marginRight: 10 }} name="instagram" size={30} color="#de4ba1" />
                                <TextInput
                                    onChangeText={(e) => setInstagram(e)}
                                    value={instagram}
                                    caretHidden={true}
                                    placeholder={'Ingresa tu Instagram'}
                                    placeholderTextColor="#d4d4d4"
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={styles.input}
                                    maxLength={30}
                                />
                            </View>
                        </View>
                        <ButtonContinue onPress={() => finishRegister()} />

                    </>

                ) : (
                    <ActivityIndicator />
                )
            }
        </SafeAreaView>
    )
}

export default RegisterThird

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        position: 'relative'
    },
    buttonBack: {
        position: 'absolute',
        top: StatusBar.currentHeight + 20,
        left: 35
    },
    progressBar: {
        borderRadius: 0,
        borderWidth: 0,
        top: StatusBar.currentHeight,
        position: "relative"
    },
    textTitle: {
        marginTop: windowHeight * 0.175,
        width: windowWidth * .75,
        fontSize: 28,
        color: "#1f1f1f",
        fontFamily: 'QuicksandBold',
    },
    input: {
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        width: 264,
        height: 51,
        position: 'relative',

    },

})
