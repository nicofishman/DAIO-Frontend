import { StyleSheet, Text, View, TouchableWithoutFeedback, Linking, ImageBackground, Image, Alert } from 'react-native';
import React, { useCallback } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const SendIntentButton = ({ action, children }) => {
    const handlePress = useCallback(async () => {
        await Linking.openURL(action)
            .catch(() => {
                console.log('Don\'t know how to open URI: ' + action);
                Alert.alert('No se pudo abrir el enlace');
            });
    }, [action]);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            {children}
        </TouchableWithoutFeedback>
    );
};

const SongCard = ({ song, setVisualSong, isSelected, index }) => {
    let artists = '';

    song.artists.forEach((artist, artistIndex) => {
        artists += artist.name;
        if (artistIndex !== song.artists.length - 1) {
            artists += ', ';
        }
    });

    const seconds = Math.floor((song.duration / 1000) % 60);
    const minutes = Math.floor((song.duration / (1000 * 60)) % 60);

    return (
        isSelected
            ? <TouchableWithoutFeedback onPress={() => {
                setVisualSong(-1);
            }}>
                <ImageBackground
                    imageStyle={{ opacity: 0.4, overflow: 'hidden' }}
                    resizeMode='cover'
                    source={{ uri: song.albumImage }} style={[styles.imageBackground, styles.shadowBox, { height: styles.songCardDetails.height, backgroundColor: '#fff' }]}>
                    <View style={[styles.songCardDetails, { opacity: 1 }]}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text numberOfLines={1} style={styles.titleSong}>{song.name}</Text>
                            <SendIntentButton action={song.external_url}>
                                <Entypo name='spotify' style={styles.spotifyIcon} />
                            </SendIntentButton>
                        </View>
                        <View style={styles.songDetails}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Image source={{ uri: song.albumImage }} style={styles.songImgDetails} />
                                <View style={[styles.artistSong, { flexDirection: 'column', height: 50, justifyContent: 'space-evenly' }]}>
                                    <Text numberOfLines={1} style={[styles.artistSongDetails]}>{artists}</Text>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.albumDetail}>{`Album: ${song.albumName}`}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.songDuration}>{minutes}:{seconds >= 10 ? seconds : `0${seconds}`}</Text>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
            : <TouchableWithoutFeedback
                onPress={() => {
                    setVisualSong(index);
                }}
            >
                <View key={index} style={[styles.songCard, styles.shadowBox]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text numberOfLines={1} style={styles.titleSong}>{song.name}</Text>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={1} style={styles.artistSong}>{artists}</Text>
                            </View>
                        </View>
                        <Image source={{ uri: song.albumImage }} style={[styles.songImgDetails, { marginTop: 5, marginRight: 10 }]} />
                    </View>

                </View>
            </TouchableWithoutFeedback>
    );
};

export default SongCard;

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    songCardDetails: {
        flex: 1,
        height: 105,
        marginBottom: 2,
        borderRadius: 10
    },
    titleSong: {
        fontSize: 16,
        marginHorizontal: 10,
        marginTop: 10,
        color: '#1c1c1c',
        fontWeight: 'bold'
    },
    songDetails: {
        flexDirection: 'row',
        top: 10,
        justifyContent: 'space-between',
        flex: 1
    },
    songImgDetails: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 4
    },
    artistSong: {
        fontSize: 14,
        marginLeft: 10,
        color: '#6e6e6e'
        // width: '90%',
    },
    artistSongDetails: {
        color: 'black',
        flex: 1,
        width: '70%'
    },
    albumDetail: {
        backgroundColor: '#dedede',
        color: 'black',
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 12,
        marginRight: 100
    },
    songDuration: {
        position: 'absolute',
        fontSize: 14,
        right: 10,
        bottom: 10,
        color: '#6e6e6e',
        fontWeight: 'bold'
    },
    songCard: {
        height: 60,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10
    },
    shadowBox: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.92,
        shadowRadius: 5.46,
        elevation: 4
    },
    spotifyIcon: {
        fontSize: 20,
        color: '#1c1c1c',
        marginRight: 10,
        marginTop: 10
    }
});
