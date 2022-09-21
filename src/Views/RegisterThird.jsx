import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, StatusBar, Dimensions, TextInput } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ButtonBack from '../Components/Common/ButtonBack';
import ButtonContinue from '../Components/Common/ButtonContinue';
import { useRegisterContext } from '../Context/RegisterContext';
import { addUser } from '../Handlers/AuthHandler';
import {Quicksand_700Bold, useFonts} from "@expo-google-fonts/quicksand";

const RegisterThird = ({ navigation }) => {
    const { instagram, setInstagram, artistPreference, songPreference, username, descripcion, spotifyId, avatarId, progressBar, setProgressBar } = useRegisterContext();

    const [loaded] = useFonts({
        Quicksand_700Bold
    });

    const volver = () => {
        setProgressBar(0.50);
        navigation.goBack();
    };

    const finishRegister = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');

        console.log(accessToken);
        await addUser({
            spotifyId,
            username,
            description: descripcion,
            avatarId,
            tracks: songPreference,
            artists: artistPreference,
            instagram: instagram
        });
        setProgressBar(0.75);
        setTimeout(() => {
            navigation.navigate('Main', { screen: 'Match' });
        }, 500);
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
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textTitle}>Ingresa tu Instaram para hablar con tus match</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#000', width: windowWidth * 0.7, marginTop: 15 }}>
                                    <AntDesign color="#de4ba1" name="instagram" size={30} style={{ marginRight: 10 }} />
                                    <TextInput
                                        autoCorrect={false}
                                        caretHidden={true}
                                        maxLength={30}
                                        placeholder={'Ingresa tu Instagram'}
                                        placeholderTextColor="#d4d4d4"
                                        spellCheck={false}
                                        style={styles.input}
                                        value={instagram}
                                        onChangeText={(e) => setInstagram(e)}
                                    />
                                </View>
                            </View>
                            <ButtonContinue onPress={() => finishRegister()} />

                        </>

                    )
                    : (
                        <ActivityIndicator />
                    )
            }
        </SafeAreaView>
    );
};

export default RegisterThird;

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
        position: 'relative'
    },
    textTitle: {
        marginTop: windowHeight * 0.175,
        width: windowWidth * 0.75,
        fontSize: 28,
        color: '#1f1f1f',
        fontFamily: 'Quicksand_700Bold'
    },
    input: {
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 22,
        width: 264,
        height: 51,
        position: 'relative'

    }

});
