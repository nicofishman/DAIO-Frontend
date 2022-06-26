import { StyleSheet, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ArtistBox from '../Components/Preferences/ArtistBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongBox from '../Components/Preferences/SongBox';
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';

const RegisterSecond = ({ navigation }) => {
    const { setSongPreference, setArtistPreference, artistPreference, songPreference, username, descripcion, spotifyId } = useRegisterContext();
    const [loading, setLoading] = useState(true);

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
        await addUser({
            spotifyId,
            username,
            description: descripcion,
            avatarId: Math.floor(Math.random() * 10),
            tracks: trackData,
            artists: artistData
        })
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

    return (
        <View style={styles.container}>
            <ArtistBox loading={loading} />
            <SongBox loading={loading} />
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
})