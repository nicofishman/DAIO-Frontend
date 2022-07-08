import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import FlipCard from 'react-native-flip-card'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CardMatch = ({ data, visualArtist, visualSong, setVisualArtist, setVisualSong }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <View style={styles.card}>
            <Text style={styles.textName}>{data.username}</Text>
            <Text style={styles.textDesc}>{data.description}</Text>
            <FlipCard
                flipHorizontal={true}
                flipVertical={false}
                style={[styles.cardMusic]}
                clickable={false}
                flip={isFlipped}
            >
                <View style={styles.songsAll}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.tituloCoA}>Canciones</Text>
                        <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
                            <Ionicons style={[styles.flipCardArrow, styles.shadowBox, { marginTop: 5, transform: [{ scaleX: -1 }] }]} name="ios-return-up-back"></Ionicons>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ justifyContent: 'space-evenly', height: '100%', paddingBottom: 45 }}>
                        {
                            data.canciones.sort((a, b) => a.orden - b.orden).map((song, index) => {
                                let artists = ''
                                song.artists.forEach((artist, artistIndex) => {
                                    artists += artist.name
                                    if (artistIndex !== song.artists.length - 1) {
                                        artists += ', '
                                    }
                                })
                                const seconds = Math.floor((song.duration / 1000) % 60);
                                const minutes = Math.floor((song.duration / (1000 * 60)) % 60);

                                return (
                                    //#region Song
                                    <View key={index}>
                                        {visualSong === index ?
                                            <TouchableWithoutFeedback onPress={() => {
                                                setVisualSong(-1);
                                                setVisualArtist(-1);
                                            }}>
                                                <ImageBackground
                                                    source={{ "uri": song.albumImage }}
                                                    resizeMode='cover'
                                                    style={[styles.imageBackground, { height: styles.songCardDetails.height }]} imageStyle={{ opacity: 0.2, overflow: 'hidden' }}>
                                                    <View style={[styles.songCardDetails, { opacity: 1 }]}>
                                                        <Text style={styles.titleSong}>{song.name}</Text>
                                                        <View style={styles.songDetails}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                                <Image style={styles.songImgDetails} source={{ "uri": song.albumImage }} />
                                                                <View style={[styles.artistSong, { flexDirection: 'column', height: 50, justifyContent: 'space-evenly' }]}>
                                                                    <Text style={[styles.artistSongDetails]}>{artists}</Text>
                                                                    <Text style={styles.albumDetail}>{`Album: ${song.albumName}`}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <Text style={styles.songDuration}>{minutes}:{seconds >= 10 ? seconds : `0${seconds}`}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableWithoutFeedback>
                                            :
                                            <TouchableWithoutFeedback
                                                onPress={() => {
                                                    setVisualArtist(-1);
                                                    setVisualSong(index);
                                                }}
                                            >
                                                <View key={index} style={[styles.songCard, styles.shadowBox]}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'column', }}>
                                                            <Text style={styles.titleSong} numberOfLines={1}>{song.name}</Text>
                                                            <Text style={styles.artistSong} numberOfLines={1}>{artists}</Text>
                                                        </View>
                                                        <Image style={[styles.songImgDetails, { marginTop: 5, marginRight: 10 }]} source={{ "uri": song.albumImage }} />
                                                    </View>

                                                </View>
                                            </TouchableWithoutFeedback>
                                        }
                                    </View>
                                    //#endregion
                                )
                            })
                        }
                    </View>

                </View>
                <View style={styles.artistAll}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
                            <Ionicons style={[styles.flipCardArrow, styles.shadowBox, { marginTop: 5 }]} name="ios-return-up-back"></Ionicons>
                        </TouchableWithoutFeedback>
                        <Text style={styles.tituloCoA}>Artistas</Text>
                    </View>
                    <View style={{ justifyContent: 'space-evenly', height: '100%', paddingBottom: 35 }}>
                        {
                            data.artistas.sort((a, b) => a.orden - b.orden).map((artist, index) => {
                                return (
                                    // #region Artist
                                    <View key={index} style={{ position: 'relative', alignItems: 'flex-end' }}>
                                        <View style={[styles.artistDetails, { position: 'relative' }]}>
                                            <Text style={styles.artistDetailsName}>{artist.name}</Text>
                                            <View style={styles.artistDetailsText}>
                                                <Text style={styles.artistDetailsText}>
                                                    {artist.genres.slice(0, 2).join(', ')}
                                                </Text>
                                            </View>
                                            <Image
                                                key={artist.image}
                                                style={[styles.artistImg]}
                                                source={{ uri: artist.image }}
                                            />
                                        </View>
                                        {/* } */}
                                    </View>
                                    // #endregion
                                )
                            })
                        }
                    </View>
                </View>
            </FlipCard >
            <View style={{ width: '100%', height: '8%' }}>
            </View>
        </View >
    );
}

export default CardMatch

const styles = StyleSheet.create({
    card: {
        width: 370,
        bottom: '-10%',
        height: '90%',
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 20
    },
    textName: {
        fontSize: 36,
        marginRight: "auto",
        marginLeft: 20,
        marginTop: 10
        //fontFamily: 'AverageSans_400Regular',
    },
    textDesc: {
        fontSize: 16,
        backgroundColor: "#f3f3f3",
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 20,
        textAlign: "justify",
        overflow: "hidden",

    },
    titleSong: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
        color: '#1c1c1c',
        fontWeight: 'bold',
    },
    tituloCoA: {
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 5
    },
    artistSong: {
        fontSize: 14,
        marginLeft: 10,
        color: '#6e6e6e',
        // width: '90%',
    },
    artistSongDetails: {
        color: 'black',
    },
    flipCardArrow: {
        fontSize: 24,
        marginRight: 6,
        padding: 4,
        backgroundColor: '#f3f3f3',
        borderRadius: 10
    },
    cardMusic: {
        flex: 1,
        borderRadius: 10,
        width: 334,
        backgroundColor: "#e3e3e3",

        // width: '90%',
        // flexDirection: 'row',
    },
    songDetails: {
        flexDirection: 'row',
        top: 10,
        width: '100%',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
    },
    artistAll: {
        height: '100%',
        // justifyContent: 'space-evenly',
        flexDirection: 'column',
        marginVertical: 10,
    },
    artistImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        // marginHorizontal: 15,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    songsAll: {
        flexDirection: 'column',
        height: '100%',
        // justifyContent: 'space-evenly',
        marginHorizontal: 15,
        zIndex: -10,
        marginVertical: 10,
        paddingBottom: 10,
    },
    songCard: {
        height: 60,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        marginBottom: 2,
        borderRadius: 10,
    },
    songCardActive: {
        height: 80,
        backgroundColor: '#a4a4a4',
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 4,
    },
    artistDetails: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: '#1f1f1f',
        color: '#fff',
        height: 100,
        width: 300,
        paddingLeft: 10,
        paddingTop: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        zIndex: -1,
        right: 15,
    },
    songCardDetails: {
        flex: 1,
        // width: '100%',
        height: 105,
        marginBottom: 2,
        borderRadius: 10,
    },
    songImgDetails: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 4
    },
    songDetailDescription: {
        flexDirection: 'row',
    },
    songDuration: {
        position: 'absolute',
        fontSize: 14,
        right: 10,
        bottom: 10,
        marginTop: 'auto',
        color: '#6e6e6e',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    artistDetailsName: {
        fontSize: 22,
        color: '#fff',
    },
    artistDetailsText: {
        color: '#fff',
        width: '75%',
    },
    albumDetail: {
        backgroundColor: "#dedede",
        color: "black",
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 12,
    }
})