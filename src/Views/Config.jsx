import { StyleSheet, Text, TextInput, View, Button, Dimensions, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Common/NavBar'
import SpotifyLogin from '../Components/SpotifyLogin'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {
    Ellipse,
} from 'react-native-svg';
import { getUserById } from '../Handlers/AuthHandler'
import Avatar from '../Components/Common/Avatar';
import { useRegisterContext } from '../Context/RegisterContext';
import SongBox from '../Components/Preferences/SongBox';
import ArtistBox from '../Components/Preferences/ArtistBox';


const Config = ({ navigation, route }) => {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [boxPreferences, setBoxPreferences] = useState("CANCIONES")
    const {
        username,
        instagram,
        avatarId,
        descripcion,
        songPreference,
        artistPreference,
        handleChangeNombre,
        setInstagram,
        setAvatarId,
        handleChangeDesc,
        setSongPreference,
        setArtistPreference
    } = useRegisterContext()

    const setContext = async (user) => {
        handleChangeNombre(user.username)
        setAvatarId(user.avatarId)
        handleChangeDesc(user.description)
        setInstagram(user.instagram)
        setSongPreference(user.tracks)
        setArtistPreference(user.artists)
    }

    useEffect(() => {
        (async () => {
            const spotiId = await AsyncStorage.getItem('spotify_id')
            const res = await getUserById(spotiId)
            await setContext(res)
            setUser(res)
            setLoading(false)
        })()
    }, [])

    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(async () => {
            await AsyncStorage.setItem('spotify_id', '')
            navigation.navigate('LoginNavigator', { screen: 'CreateOrSignInAcount' });
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <View style={styles.container}>
                <Svg style={{ position: 'absolute' }} height="300" width={windowWidth}>
                    <Ellipse
                        cx='200'
                        cy="80"
                        rx='300'
                        ry="170"
                        fill="white"
                    />
                </Svg>
                <View style={{ marginTop: 50 }}>
                    {user && (
                        <View style={{ flexDirection: 'row' }}>
                            <Avatar id={avatarId} width={130} height={130} />
                            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ color: 'black', fontSize: 24 }}>{username}</Text>
                                <Text style={{ fontSize: 14, }}>{descripcion}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: windowWidth*0.8}}>
                    <Button width={windowWidth*0.8} title='CANCIONES' onPress={() => setBoxPreferences('CANCIONES')}/>
                    <Button width={windowWidth*0.8} title='ARTISTAS' onPress={() => setBoxPreferences('ARTISTAS')}/>
                </View>
                {
                    boxPreferences === 'CANCIONES' ? <SongBox /> :
                    boxPreferences === 'ARTISTAS' && <ArtistBox />
                }
                <SpotifyLogin style={styles.logOut} title='Log Out' fnOnPress={logOut} />
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    )
}

export default Config

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        position: 'relative'
    },
    profile: {
        width: windowWidth * 1.2,
        height: windowHeight * 0.2,
        backgroundColor: '#fff',
        top: 0,
        borderBottomRightRadius: windowWidth / 1.8,
        borderBottomLeftRadius: 150
    },
    logOut: {
        bottom: 0,
    }
})