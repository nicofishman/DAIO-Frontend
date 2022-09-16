import { StyleSheet, ActivityIndicator, SafeAreaView, Text, TextInput, View, Dimensions, Image, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {
    Ellipse
} from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';

import NavBar from '../Components/Common/NavBar';
import { getUserById, updatePreferences } from '../Handlers/AuthHandler';
import Avatar from '../Components/Common/Avatar';
import { useRegisterContext } from '../Context/RegisterContext';
import SongBox from '../Components/Preferences/SongBox';
import ArtistBox from '../Components/Preferences/ArtistBox';

const Config = ({ navigation, route }) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editingAvatar, setEditingAvatar] = useState(false);
    const [backgroundValues, setBackgroundValues] = useState([300, 300, 170]); // height, rx, ry
    const [boxPreferences, setBoxPreferences] = useState('CANCIONES');
    // const [editando, setEditando] = useState(true) // hacer que solo aparezca con un cambio hecho
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
    } = useRegisterContext();

    const [loaded] = useFonts({
        Quicksand: require('../../assets/fonts/Quicksand/Quicksand.ttf'),
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf')
    });

    const setContext = async (user) => {
        console.log(user.username);
        setUsername(user.username);
        setAvatarId(user.avatarId);
        handleChangeDesc(user.description);
        setInstagram(user.instagram);
        setSongPreference(user.tracks);
        setArtistPreference(user.artists);
    };

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const spotiId = await AsyncStorage.getItem('spotify_id');
        const res = await getUserById(spotiId);

        await setContext(res);
        setUser(res);
        setLoading(false);
    };

    const logOut = async () => {
        console.log('Logging out');
        await AsyncStorage.setItem('access_token', '').then(async () => {
            await AsyncStorage.setItem('spotify_id', '');
            setUsername('');
            setAvatarId(-1);
            handleChangeDesc('');
            setInstagram('');
            setSongPreference([]);
            setArtistPreference([]);
            navigation.navigate('LoginNavigator', { screen: 'CreateOrSignInAcount' });
        }).catch(err => {
            console.log(err);
        });
    };

    function editProfile () {
        if (editing) {
            setEditing(false);
            setBackgroundValues([300, 300, 170]);
        } else {
            setEditing(true);
            setBackgroundValues([860, 540, 540]);
        }
    }

    function editAvatar () {
        if (editingAvatar) {
            setEditingAvatar(false);
        } else {
            setEditingAvatar(true);
        }
    }

    const saveProfile = async () => {
        const spotiId = await AsyncStorage.getItem('spotify_id');
        const userSend = {
            spotifyId: spotiId,
            username,
            description: descripcion,
            avatarId,
            instagram,
            tracks: songPreference,
            artists: artistPreference
        };

        await updatePreferences(userSend);
        await getUser();
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                {
                    loading &&
                    loaded
                        ? (
                            <View style={{ top: windowHeight / 2 }}>
                                <ActivityIndicator color="#fff" size={100} />
                            </View>
                        ) : (
                            <>
                                <StatusBar />
                                {/* Avatar-Nombre-Descripcion */}
                                <Svg height={backgroundValues[0]} style={{ position: 'absolute' }} width={windowWidth}>
                                    <Ellipse
                                        cx='200'
                                        cy='80'
                                        fill="#f1f1f1"
                                        rx={backgroundValues[1]}
                                        ry={backgroundValues[2]}
                                    />
                                </Svg>
                                {/* Logo cerrar sesión */}
                                {
                                    !editing ? (
                                        <>
                                            <SafeAreaView style={{ position: 'absolute', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                                                <TouchableWithoutFeedback onPress={() => logOut()}>
                                                    <MaterialIcons color="#383838" name="logout" size={30} style={styles.logOutIcon} onPress={logOut} />
                                                </TouchableWithoutFeedback>
                                            </SafeAreaView>
                                            {/* Visualizacion del Perfil */}
                                            <View style={{ marginTop: 50 }}>
                                                {user && (
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Avatar height={130} id={avatarId} width={130} />
                                                        <View style={styles.userInfo}>
                                                            <Text
                                                                numberOfLines={2}
                                                                style={{ color: 'black', fontWeight: 'bold', fontFamily: 'QuicksandRegular', fontSize: 24 }}
                                                            >
                                                                {username}
                                                            </Text>
                                                            <Text numberOfLines={4} style={{ fontSize: 14 }}>{descripcion}</Text>
                                                            <View style={{ flexDirection: 'row', maxWidth: 190, top: 5 }}>
                                                                <MaterialCommunityIcons color={'#bf2a88'} name='instagram' size={20} />
                                                                <Text ellipsizeMode='tail' numberOfLines={1} >@{instagram}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            </View>
                                        </>

                                    ) : (
                                        <View style={{ width: windowWidth, flex: 0.8, top: StatusBar.currentHeight + 10 }}>
                                            <ScrollView style={{ marginBottom: 80 }}>
                                                <View style={{ position: 'relative', width: 130, alignSelf: 'center', marginBottom: 10 }}>
                                                    <Avatar height={130} id={avatarId} width={130} />
                                                    <TouchableOpacity activeOpacity={1} style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'pink', borderRadius: 40 }} onPress={() => editAvatar()}>
                                                        <MaterialIcons color="black" name={editingAvatar ? 'close' : 'edit'} size={30} style={{ padding: 10 }} />
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    editingAvatar && (
                                                        <View style={{ width: 280, backgroundColor: '#fff', alignSelf: 'center', padding: 10, borderRadius: 20 }}>
                                                            {
                                                                AvatarArray.map((row, rowIndex) => {
                                                                    return (
                                                                        <View key={row} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                                            {row.map((image, index) => {
                                                                                return (
                                                                                    <TouchableWithoutFeedback key={index} onPress={() => {
                                                                                        setAvatarId(index + (rowIndex * 3));
                                                                                    }}>
                                                                                        <Image
                                                                                            key={index}
                                                                                            source={image}
                                                                                            style={{ width: 80, height: 80, marginHorizontal: 3, marginVertical: 3 }}
                                                                                        />
                                                                                    </TouchableWithoutFeedback>
                                                                                );
                                                                            })}
                                                                        </View>
                                                                    );
                                                                })
                                                            }
                                                        </View>
                                                    )
                                                }
                                                <View style={{ width: windowWidth }}>
                                                    <Text style={styles.inputTitle}>• Nombre</Text>
                                                    <TextInput
                                                        autoCorrect={false}
                                                        caretHidden={true}
                                                        maxLength={18}
                                                        placeholder={'Ingresa tu nombre'}
                                                        placeholderTextColor="#d4d4d4"
                                                        spellCheck={false}
                                                        style={styles.input}
                                                        value={username}
                                                        onChangeText={handleChangeNombre}
                                                    />
                                                    <Text style={styles.inputTitle}>• Descripcion</Text>
                                                    <TextInput
                                                        autoCorrect={false}
                                                        caretHidden={true}
                                                        maxLength={150}
                                                        placeholder={'Ingresa una descripcion'}
                                                        placeholderTextColor="#d4d4d4"
                                                        spellCheck={false}
                                                        style={styles.input}
                                                        value={descripcion}
                                                        onChangeText={handleChangeDesc}
                                                    />
                                                    <Text style={styles.inputTitle}>• Instagram</Text>
                                                    <TextInput
                                                        autoCorrect={false}
                                                        caretHidden={true}
                                                        maxLength={30}
                                                        placeholder={'Tu instagram'}
                                                        placeholderTextColor="#d4d4d4"
                                                        spellCheck={false}
                                                        style={styles.input}
                                                        value={instagram}
                                                        onChangeText={handleChangeInstagram}
                                                    />
                                                </View>
                                            </ScrollView>

                                        </View>
                                    )}

                                <TouchableOpacity activeOpacity={1} style={[styles.circle]} onPress={() => editProfile()}>
                                    <MaterialIcons color="black" name={editing ? 'close' : 'edit'} size={40} />
                                </TouchableOpacity>

                                {/* Canciones-Artistas */}
                                {!editing && (
                                    boxPreferences === 'CANCIONES'
                                        ? (
                                            <>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                                    <TouchableOpacity activeOpacity={1} style={[styles.buttonSelect, { backgroundColor: '#86C3EB' }]} onPress={() => setBoxPreferences('CANCIONES')}><Text style={styles.fontQuicksandBold}>CANCIONES</Text></TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={1} style={styles.buttonSelect} onPress={() => setBoxPreferences('ARTISTAS')}><Text style={styles.fontQuicksandBold}>ARTISTAS</Text></TouchableOpacity>
                                                </View>
                                                <SongBox />
                                            </>
                                        )
                                        : boxPreferences === 'ARTISTAS' && (
                                            <>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 40 }}>
                                                    <TouchableOpacity activeOpacity={1} style={styles.buttonSelect} onPress={() => setBoxPreferences('CANCIONES')}><Text style={styles.fontQuicksandBold}>CANCIONES</Text></TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={1} style={[styles.buttonSelect, styles.shadowProp, { backgroundColor: '#eb8687' }]} onPress={() => setBoxPreferences('ARTISTAS')}><Text style={styles.fontQuicksandBold}>ARTISTAS</Text></TouchableOpacity>
                                                </View>
                                                <ArtistBox />
                                            </>
                                        )
                                )
                                }
                                <TouchableOpacity style={styles.saveChanges} onPress={saveProfile}>
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
    );
};

export default Config;

const AvatarArray = [
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

/*
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
 */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
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
        bottom: 0
    },
    circle: {
        width: windowWidth * 0.175,
        height: windowWidth * 0.175,
        borderRadius: windowWidth * 0.175,
        backgroundColor: '#ffffff',
        left: windowWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSelect: {
        width: windowWidth * 0.4,
        paddingVertical: 2,
        marginHorizontal: 1,
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 4
    },
    saveChanges: {
        backgroundColor: '#31ad33',
        width: 180,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center'
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
        right: 5,
        top: StatusBar.currentHeight
    },
    input: {
        fontFamily: 'QuicksandRegular',
        paddingLeft: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingVertical: 6,
        fontSize: 16

    },
    inputTitle: {
        fontFamily: 'QuicksandBold',
        fontSize: 18,
        marginLeft: 10
    },
    fontQuicksandBold: {
        fontFamily: 'QuicksandBold'
    }
});
