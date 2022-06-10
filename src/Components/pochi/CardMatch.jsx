import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native'

const CardMatch = ({ data, visualArtist, visualSong, setVisualArtist, setVisualSong}) => {





    return (
        <View style={styles.card}>
            <Text style={styles.textName}>{data.username}</Text>
            <Text style={styles.textDesc}>{data.description}</Text>
            <View style={styles.cardMusic}>
                <View style={styles.songsAll}>
                    {
                        data.canciones.sort((a, b) => a.orden - b.orden).map((song, index) => {
                            let artists = ''
                            song.artists.forEach((artist, index) => {
                                artists += artist.name
                                if (index !== song.artists.length - 1) {
                                    artists += ', '
                                }
                            })
                            const seconds = Math.floor((song.duration / 1000) % 60);
                            const minutes = Math.floor((song.duration / (1000 * 60)) % 60);

                            return (
                                <>
                                    {
                                        visualSong === index ?
                                            <TouchableWithoutFeedback onPress={() => setVisualSong(index)}>
                                                <ImageBackground 
                                                    source={{ "uri": song.album.img }} 
                                                    resizeMode='cover' 
                                                    style={[styles.imageBackground, {height: styles.songCardDetails.height}]} imageStyle={{opacity: 0.2, overflow: 'hidden'}}>
                                                    <View key={index} style={[styles.songCardDetails, {opacity: 1}]}>
                                                        <Text style={styles.titleSong} numberOfLines={1}>{song.name}</Text>
                                                        <View style={{flexDirection:'row', top: 10}}>
                                                            <Image style={styles.songImgDetails} source={{ "uri": song.album.img }}/>
                                                            <View style={{flexDirection:'column'}}>
                                                                <Text style={[styles.artistSong, styles.artistSongDetails]} numberOfLines={2}>{artists}</Text>
                                                                <Text style={styles.songDuration}>{minutes}:{seconds}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableWithoutFeedback>
                                            :
                                            <TouchableWithoutFeedback onPress={() => setVisualSong(index)}>
                                                <View key={index} style={[styles.songCard, styles.shadowBox]}>
                                                    <Text style={styles.titleSong} numberOfLines={1}>{song.name}</Text>
                                                    <Text style={styles.artistSong} numberOfLines={1}>{artists}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                    }
                                </>
                            )
                        })
                    }
                </View>
                <View style={styles.artistAll}>
                    {
                        data.artistas.sort((a, b) => a.orden - b.orden).map((artist, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        if (visualArtist === index) {
                                            setVisualArtist(-1)
                                        } else {
                                            setVisualArtist(index)
                                        }
                                    }}>
                                    <>
                                        <View style={styles.artistDetails}>
                                            <Text>{artist.name}</Text>
                                        </View>
                                        {/* { visualArtist === index ?
                                        <View style={styles.artistDetails}>
                                        </View>
                                        :
                                        <View style={styles.artistAll}>
                                        </View>
                                    } */}
                                        <Image
                                            key={index}
                                            style={styles.artistImg}
                                            source={{ "uri": artist.images[0].url }}
                                        />
                                    </>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </View>
            <View style={{width:'100%', height:'8%'}}>
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
        backgroundColor: "#f3f3f3",
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
    },
    artistSong: {
        fontSize: 14,
        marginLeft: 10,
        color: '#6e6e6e',
        width: '90%',
    },
    artistSongDetails: {
        fontSize: 14,
        marginLeft: 10,
        color: '#4d4d4d',
        width: '55%',
    },
    cardMusic: {
        flex: 1,
        width: '90%',
        // width: 334,
        backgroundColor: "#ECECEC",
        flexDirection: 'row',
    },
    artistAll: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    artistImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginHorizontal: 15
    },
    songsAll: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 15
    },
    songCard: {
        width: 190,
        height: 60,
        backgroundColor: '#ffffff',
        marginBottom: 2,
        borderRadius: 10
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
        backgroundColor: '#42f56f',
        height: 80,
        width: '100%',
        
    },
    songCardDetails: {
        width: 190,
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
        fontSize: 14,
        marginLeft: 90,
        marginTop: 'auto',
        color: '#6e6e6e',
        width: '55%',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    }
})