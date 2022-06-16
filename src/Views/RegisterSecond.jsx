import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ArtistBox from '../Components/Preferences/ArtistBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongBox from '../Components/Preferences/SongBox';
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/pochi/ButtonContinue';

const RegisterSecond = ({ navigation }) => {
    const { setSongPreference, setArtistPreference } = useRegisterContext();
    const [loading, setLoading] = useState(true);

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
            <ButtonContinue onPress={() => navigation.navigate("Match")} />
        </View>
    )
}

export default RegisterSecond

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d4d4d4',
        alignItems: 'center',
        justifyContent: 'center',
    },
})