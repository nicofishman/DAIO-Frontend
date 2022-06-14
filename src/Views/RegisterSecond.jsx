import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ArtistBox from '../Components/Preferences/ArtistBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongBox from '../Components/Preferences/SongBox';
import { useRegisterContext } from '../Context/RegisterContext';

const RegisterSecond = () => {
    const { songPreference, artistPreference, setSongPreference, setArtistPreference } = useRegisterContext();
    const [selected, setSelected] = useState('canciones');

    useEffect(() => {
        console.log(selected);
    }, [selected])

    useEffect(() => {
        (async () => {
            let result = await AsyncStorage.getItem("access_token");
            const userArtists = await getUserTopArtists(result);
            setArtistPreference(userArtists);
            const userTracks = await getUserTopTracks(result);
            setSongPreference(userTracks);
        })();
    }, [])

    return (
        <View style={styles.container}>
            <ArtistBox artists={artistPreference.slice(0, 3)} selected={selected === 'artistas'} setSelected={setSelected} />
            <SongBox songs={songPreference.slice(0, 5)} selected={selected === 'canciones'} setSelected={setSelected} />
        </View>
    )
}

export default RegisterSecond

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})