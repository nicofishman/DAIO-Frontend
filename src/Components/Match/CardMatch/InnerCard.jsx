import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import FlipCard from 'react-native-flip-card'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SongCard from './SongCard'
import ArtistCard from './ArtistCard'

const InnerCard = ({ user, visualArtist, visualSong, setVisualArtist, setVisualSong }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <FlipCard
            flipHorizontal={true}
            flipVertical={false}
            style={[styles.cardMusic]}
            clickable={false}
            flip={isFlipped}
        >
            <View style={styles.songsAll}>
                <View style={styles.arrowAndText}>
                    <Text style={styles.tituloCoA}>Canciones</Text>
                    <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
                        <Ionicons style={[styles.flipCardArrow, styles.shadowBox, { transform: [{ scaleX: -1 }] }]} name="ios-return-up-back"></Ionicons>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.songsContainer}>
                    {
                        user.canciones.sort((a, b) => a.orden - b.orden).map((song, index) => {
                            return (
                                <SongCard key={index} index={index} song={song} isSelected={visualSong === index} setVisualSong={setVisualSong} />
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.artistAll}>
                <View style={styles.arrowAndText}>
                    <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
                        <Ionicons style={[styles.flipCardArrow, styles.shadowBox]} name="ios-return-up-back"></Ionicons>
                    </TouchableWithoutFeedback>
                    <Text style={styles.tituloCoA}>Artistas</Text>
                </View>
                <View style={styles.artistContainer}>
                    {
                        user.artistas.sort((a, b) => a.orden - b.orden).map((artist, index) => {
                            return (
                                <ArtistCard key={index} index={index} artist={artist} />
                            )
                        })
                    }
                </View>
            </View>
        </FlipCard >
    )
}

export default InnerCard

const styles = StyleSheet.create({
    tituloCoA: {
        fontSize: 16,
        alignSelf: 'center',
    },
    flipCardArrow: {
        fontSize: 24,
        marginRight: 6,
        padding: 4,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        marginTop: 5
    },
    cardMusic: {
        flex: 1,
        borderRadius: 10,
        width: 334,
        backgroundColor: "#e3e3e3",
    },
    artistAll: {
        height: '100%',
        flexDirection: 'column',
        marginVertical: 10,
    },
    songsAll: {
        flexDirection: 'column',
        height: '100%',
        zIndex: -10,
        marginVertical: 10,
        paddingBottom: 10,
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
    songDetailDescription: {
        flexDirection: 'row',
    },
    arrowAndText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    songsContainer: {
        justifyContent: 'space-evenly',
        height: '100%',
        paddingBottom: 45,
        marginHorizontal: 15,
    },
    artistContainer: {
        justifyContent: 'space-evenly',
        height: '100%',
        paddingBottom: 35,
    }
})