import { StyleSheet, View, StatusBar, Image, Dimensions, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ArtistBox from '../Components/Preferences/ArtistBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongBox from '../Components/Preferences/SongBox';
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';
import * as Progress from 'react-native-progress';
import ButtonBack from '../Components/Common/ButtonBack';
import axios from 'axios';

const RegisterSecond = ({ navigation }) => {
    const { setSongPreference, setArtistPreference, artistPreference, songPreference, username, descripcion, spotifyId, avatarId, progressBar, setProgressBar } = useRegisterContext();
    const [loading, setLoading] = useState(true);


    const finishRegister = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken);
        // console.log({
        //     spotifyId,
        //     username,
        //     description: descripcion,
        //     avatarId: avatarId,
        //     tracks: songPreference,
        //     artists: artistPreference
        // });
        // await axios.post('http://192.168.0.15:3000/database/adduser', {
        //     spotifyId,
        //     username,
        //     description: descripcion,
        //     avatarId: avatarId,
        //     tracks: songPreference,
        //     artists: artistPreference
        // })
        await addUser({
            spotifyId,
            username,
            description: descripcion,
            avatarId: avatarId,
            tracks: songPreference,
            artists: artistPreference
        })
        setProgressBar(1);
        setTimeout(() => {
            navigation.navigate('Main', { screen: 'Match' })
        }, 500);
    }

    useEffect(() => {
        (async () => {
            let result = await AsyncStorage.getItem("access_token");
            const userArtists = await getUserTopArtists(result);
            setArtistPreference(userArtists.slice(0, 3));
            const userTracks = await getUserTopTracks(result);
            setSongPreference(userTracks.slice(0, 5));
            setLoading(false);
        })();
    }, [])
    const volver = () => {
        setProgressBar(0.33);
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Progress.Bar
                progress={progressBar}
                width={windowWidth}
                style={styles.progressBar}
                color='rgb(94, 157, 181)'
            />
            <View style={styles.buttonBack} >
                <ButtonBack onPress={volver} />
            </View>
            <Text style={styles.textTitle}>Elegí la música que más te representa</Text>
            {
                loading ?
                    <>
                        <ActivityIndicator style={{ flex: 2.3 }} size={70} color='#e38889' />
                        {/* size prop only works on Android, for iOS use 'small | large', lo escribi yo pochi btw  */}
                    </>
                    :
                    <View style={{ top: windowHeight * 0.195 }}>
                        <ArtistBox />
                        <SongBox />
                    </View>
            }
            <ButtonContinue onPress={() => finishRegister()} />
            <Image style={styles.backgroundImg} source={require('../Assets/register/registerSecondBackground.png')} />
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'transparent'}
            />
        </View>
    )
}

export default RegisterSecond

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        position: 'relative'
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'contain',
        width: windowWidth,
        top: 180
    },
    textTitle: {
        top: windowHeight * 0.175,
        width: windowWidth * .75,
        fontSize: 28,
        fontWeight: 'bold',
        color: "#1f1f1f",
        // fontFamily: 'Capriola_400Regular'
    },
    progressBar: {
        borderRadius: 0,
        borderWidth: 0,
        top: StatusBar.currentHeight,
        position: "absolute"
    },
    buttonBack: {
        position: 'absolute',
        top: StatusBar.currentHeight + 20,
        left: 35
    },
})