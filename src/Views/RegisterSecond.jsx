import { StyleSheet, View, StatusBar, Image, Dimensions, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useFonts } from 'expo-font';

import ArtistBox from '../Components/Preferences/ArtistBox';
import { getUserTopArtists, getUserTopTracks } from '../Handlers/AuthHandler';
import SongBox from '../Components/Preferences/SongBox';
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';
import ButtonBack from '../Components/Common/ButtonBack';

const RegisterSecond = ({ navigation }) => {
    const { setSongPreference, setArtistPreference, progressBar, setProgressBar } = useRegisterContext();
    const [loading, setLoading] = useState(true);
    const [loaded] = useFonts({
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf')
    });

    const continuar = () => {
        setProgressBar(0.75);
        setTimeout(() => {
            navigation.navigate('RegisterThird');
        }, 500);
    };

    const volver = () => {
        setProgressBar(0.25);
        navigation.goBack();
    };

    useEffect(() => {
        (async () => {
            const result = await AsyncStorage.getItem('access_token');
            const userArtists = await getUserTopArtists(result);

            setArtistPreference(userArtists.slice(0, 3));
            const userTracks = await getUserTopTracks(result);

            setSongPreference(userTracks.slice(0, 5));
            setLoading(false);
        })();
    }, []);

    return (
        <View style={styles.container}>
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
                            <Text style={styles.textTitle}>Elegí la música que más te representa</Text>
                            {
                                loading
                                    ? <>
                                        <ActivityIndicator color='#e38889' size={70} style={{ flex: 2.3 }} />
                                        {/* size prop only works on Android, for iOS use 'small | large', lo escribi yo pochi btw  */}
                                    </>
                                    : <View style={{ top: windowHeight * 0.195 }}>
                                        <Text style={{ fontSize: 20, fontStyle: 'italic' }}>Artistas</Text>
                                        <ArtistBox />
                                        <Text style={{ fontSize: 20, fontStyle: 'italic', top: 20 }}>Canciones</Text>
                                        <SongBox />
                                    </View>
                            }
                            <ButtonContinue onPress={() => continuar()} />
                            <Image source={require('../Assets/register/registerSecondBackground.png')} style={styles.backgroundImg} />
                            <StatusBar
                                backgroundColor={'transparent'}
                                barStyle="dark-content"
                            />
                        </>
                    ) : (
                        <ActivityIndicator />
                    )
            }
        </View>
    );
};

export default RegisterSecond;

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
        width: windowWidth * 0.75,
        fontSize: 28,
        color: '#1f1f1f',
        fontFamily: 'QuicksandBold'
    },
    progressBar: {
        borderRadius: 0,
        borderWidth: 0,
        top: StatusBar.currentHeight,
        position: 'absolute'
    },
    buttonBack: {
        position: 'absolute',
        top: StatusBar.currentHeight + 20,
        left: 35
    }
});
