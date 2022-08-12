import { StyleSheet, ActivityIndicator, SafeAreaView, Text, TextInput, View, Button, Dimensions, Image, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { updatePreferences } from '../Handlers/AuthHandler';


const Config = ({ navigation, route }) => {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [backgroundValues, setBackgroundValues] = useState([300, 300, 170]) //height, rx, ry
    const [changingAvatar, setChangingAvatar] = useState(false)
    const [boxPreferences, setBoxPreferences] = useState("CANCIONES")
    //const [editando, setEditando] = useState(true) // hacer que solo aparezca con un cambio hecho
    const {
        username,
        instagram,
        avatarId,
        descripcion,
        songPreference,
        artistPreference,
        setUsername,
        setInstagram,
        handleChangeInstagram,
        setAvatarId,
        handleChangeNombre,
        handleChangeDesc,
        setSongPreference,
        setArtistPreference
    } = useRegisterContext()

    const [loaded] = useFonts({
        Quicksand: require('../../assets/fonts/Quicksand/Quicksand.ttf'),
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
    });

    const setContext = async (user) => {
        console.log(user.username);
        setUsername(user.username)
        setAvatarId(user.avatarId)
        handleChangeDesc(user.description)
        setInstagram(user.instagram)
        setSongPreference(user.tracks)
        setArtistPreference(user.artists)
    }

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const spotiId = await AsyncStorage.getItem('spotify_id')
        const res = await getUserById(spotiId)
        await setContext(res)
        setUser(res)
        setLoading(false)
    }

    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(async () => {
            await AsyncStorage.setItem('spotify_id', '')
            navigation.navigate('LoginNavigator', { screen: 'CreateOrSignInAcount' });
        }).catch(err => {
            console.log(err);
        });
    }

    function editProfile() {
        if (editing) {
            setEditing(false)
            setBackgroundValues([300, 300, 170])
        } else {
            setEditing(true)
            setBackgroundValues([860, 550, 550])
        }
    }

    const saveProfile = async () => {
        const spotiId = await AsyncStorage.getItem('spotify_id')
        const userSend = {
            spotifyId: spotiId,
            username: username,
            description: descripcion,
            avatarId: avatarId,
            instagram: instagram,
            tracks: songPreference,
            artists: artistPreference
        }
        await updatePreferences(userSend)
        await getUser()
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                {
                    loading && loaded ? (
                        <View style={{ top: windowHeight / 2 }}>
                            <ActivityIndicator size={100} color="#fff" />
                        </View>
                    ) : (
                        <>
                            {/* Avatar-Nombre-Descripcion*/}

                            <Svg style={{ position: 'absolute' }} width={windowWidth} height={backgroundValues[0]}>
                                <Ellipse
                                    cx='200'
                                    cy='80'
                                    rx={backgroundValues[1]}
                                    ry={backgroundValues[2]}
                                    fill="#f1f1f1"
                                />
                            </Svg>
                            {/* Logo cerrar sesión */}
                            {
                                !editing ? (
                                    <>
                                        <SafeAreaView style={{ position: 'absolute', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                                            <TouchableWithoutFeedback onPress={() => logOut()}>
                                                <MaterialIcons name="logout" size={30} color="#383838" onPress={logOut} style={styles.logOutIcon} />
                                            </TouchableWithoutFeedback>
                                        </SafeAreaView>
                                        <View style={{ marginTop: 50 }}>
                                            {user && (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Avatar id={avatarId} width={130} height={130} />
                                                    <View style={styles.userInfo}>
                                                        <Text
                                                            style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}
                                                            numberOfLines={2}
                                                        >
                                                            {username}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, }}>{descripcion}</Text>
                                                        <View style={{ flexDirection: 'row', maxWidth: 190 }}>
                                                            <MaterialCommunityIcons size={20} name='instagram' />
                                                            <Text numberOfLines={1} ellipsizeMode='middle'>{instagram}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </>

                                ) : (
                                    <View style={{width: windowWidth, flex: 1, top: StatusBar.currentHeight+10}}>
                                        <View style={{ position: 'relative', width: 130, alignSelf: 'center' }}>
                                            <Avatar id={avatarId} width={130} height={130} />
                                            <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'pink', borderRadius: 40 }} activeOpacity={1} onPress={() => setChangingAvatar(!changingAvatar)}>
                                                <MaterialIcons style={{ padding: 10 }} name={changingAvatar ? "close" : "edit"} size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            changingAvatar && (
                                                <>
                                                    {
                                                        AvatarArray.map((row, rowIndex) => {
                                                            return (
                                                                <View key={row} style={{ flexDirection: 'row' }}>
                                                                    {row.map((image, index) => {
                                                                        return (
                                                                            <TouchableWithoutFeedback key={index} onPress={() => {
                                                                                setAvatarId(index + (rowIndex * 3))
                                                                            }}>
                                                                                <Image
                                                                                    key={index}
                                                                                    source={image}
                                                                                    style={{ width: 80, height: 80, marginHorizontal: 3, marginVertical: 3 }}
                                                                                />
                                                                            </TouchableWithoutFeedback>
                                                                        )
                                                                    })}
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </>
                                            )
                                        }
                                        <View style={{ width: windowWidth, }}>
                                            <Text style={styles.inputTitle}>Nombre</Text>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChangeNombre}
                                                value={username}
                                                caretHidden={true}
                                                placeholder={'Ingresa tu nombre'}
                                                placeholderTextColor="#d4d4d4"
                                                spellCheck={false}
                                                autoCorrect={false}
                                            />
                                            <Text style={styles.inputTitle}>Descripcion</Text>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChangeDesc}
                                                value={descripcion}
                                                caretHidden={true}
                                                placeholder={'Ingresa una descripcion'}
                                                placeholderTextColor="#d4d4d4"
                                                spellCheck={false}
                                                autoCorrect={false}
                                            />
                                            <Text style={styles.inputTitle}>Instagram</Text>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={handleChangeInstagram}
                                                value={instagram}
                                                caretHidden={true}
                                                placeholder={'Tu instagram'}
                                                placeholderTextColor="#d4d4d4"
                                                spellCheck={false}
                                                autoCorrect={false}
                                            />
                                        </View>
                                    </View>
                                )}






                            <TouchableOpacity style={[styles.circle, styles.shadowBox]} activeOpacity={1} onPress={() => editProfile()}>
                                <MaterialIcons name={editing ? "close" : "edit"} size={40} color="black" />
                            </TouchableOpacity>
                            {/* Canciones-Artistas */}
                            {!editing && (
                                boxPreferences === 'CANCIONES' ? (
                                    <>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity style={[styles.buttonSelect, { backgroundColor: '#bfbfbf' }]} activeOpacity={1} onPress={() => setBoxPreferences('CANCIONES')}><Text>CANCIONES</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonSelect} activeOpacity={1} onPress={() => setBoxPreferences('ARTISTAS')}><Text>ARTISTAS</Text></TouchableOpacity>
                                        </View>
                                        <SongBox />
                                    </>
                                ) :
                                    boxPreferences === 'ARTISTAS' && (
                                        <>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                                                <TouchableOpacity style={styles.buttonSelect} activeOpacity={1} onPress={() => setBoxPreferences('CANCIONES')}><Text>CANCIONES</Text></TouchableOpacity>
                                                <TouchableOpacity style={[styles.buttonSelect, styles.shadowProp, { backgroundColor: '#bfbfbf' }]} activeOpacity={1} onPress={() => setBoxPreferences('ARTISTAS')}><Text>ARTISTAS</Text></TouchableOpacity>
                                            </View>
                                            <ArtistBox />
                                        </>
                                    )
                            )
                            }
                            <TouchableOpacity onPress={saveProfile} style={styles.saveChanges}>
                                {
                                    loaded &&
                                    <Text style={styles.saveChanges_text}>Guardar cambios</Text>
                                }
                            </TouchableOpacity>
                            {/* <SpotifyLogin style={styles.logOut} title='Cerrar Sesión' fnOnPress={logOut} /> */}
                        </>
                    )
                }
            </SafeAreaView>
            <NavBar navigation={navigation} route={route} />
        </>
    )
}

export default Config

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
        backgroundColor: '#ffffff',
        top: 0,
        borderBottomRightRadius: windowWidth / 1.8,
        borderBottomLeftRadius: 150
    },
    logOut: {
        bottom: 0,
    },
    circle: {
        width: windowWidth * 0.175,
        height: windowWidth * 0.175,
        borderRadius: windowWidth * 0.175,
        backgroundColor: '#f0f0f0',
        left: windowWidth * 0.3,
        marginBottom: 80,
        justifyContent: 'center', alignItems: 'center'
    },
    buttonSelect: {
        width: windowWidth * 0.4,
        paddingVertical: 2,
        marginHorizontal: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    saveChanges: {
        backgroundColor: '#ca3',
        width: 180,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        marginVertical: 10,
    },
    saveChanges_text: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'QuicksandBold'
    },
    userInfo: {
        flexDirection: 'column',
        marginLeft: 20,
        maxWidth: 200,
        overflow: 'visible'
    },
    logOutIcon: {
        position: 'absolute',
        right: 10,
        top: StatusBar.currentHeight
    },
    input: {
        fontFamily: 'QuicksandRegular',
        paddingLeft: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingVertical: 6,
        fontSize: 16,

    },
    inputTitle: {
        fontFamily: 'QuicksandBold',
        fontSize: 18,
        marginLeft: 10,
    }
})