import { StyleSheet, View, Button, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ArtistBox from '../Components/Preferences/ArtistBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongBox from '../Components/Preferences/SongBox';
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';
import * as Progress from 'react-native-progress';
import ButtonBack from '../Components/Common/ButtonBack';

const RegisterSecond = ({ navigation }) => {
    const { setSongPreference, setArtistPreference, artistPreference, songPreference, username, descripcion, spotifyId } = useRegisterContext();
    const [loading, setLoading] = useState(true);
    const [progressBarD, setprogressBarD] = useState(0.33);
    useEffect(() => {
        setprogressBarD(0.66);
    }, [])

    const finishRegister = async () => {
        const trackData = songPreference.map(song => {
            return {
                trackId: song.id,
            }
        })
        const artistData = artistPreference.map(artist => {
            return {
                artistId: artist.id,
            }
        })
        // await addUser({
        //     spotifyId,
        //     username,
        //     description: descripcion,
        //     avatarId: Math.floor(Math.random() * 10),
        //     tracks: trackData,
        //     artists: artistData
        // })
        navigation.navigate('Main', { screen: 'Match' })
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
            <Text style={styles.textTitle}>Elegí la música que más te representa</Text>

            <ArtistBox loading={loading} />
            <SongBox loading={loading} />
            <Button title="ANASHEEEE" onPress={() => navigation.goBack()} />
            <ButtonContinue onPress={() => finishRegister()} />
            <Image style={styles.backgroundImg} blurRadius={2} source={require('../Assets/register/registerSecondBackground.png')} />
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
        justifyContent: 'center',
    },
    backgroundImg: {
        position: 'absolute',
        zIndex: -10,
        resizeMode: 'cover',
        width: windowWidth,
        height: 165
    },
    textTitle: {
        width: windowWidth * .75,
        fontSize: 28,
        fontWeight: 'bold',
        color: "#1f1f1f",
        top: -10
        // fontFamily: 'Capriola_400Regular'
    },
})