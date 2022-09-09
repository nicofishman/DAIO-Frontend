import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SongCard from './SongCard';

const Front = ({ canciones, visualSong, setVisualSong, setIsFlipped, isFlipped }) => {
    return (
        <View style={styles.songsAll}>
            <View style={[styles.arrowAndText]}>
                <Text style={[styles.tituloCoA, styles.tituloCanciones, styles.shadowBox]}>Canciones</Text>
                <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
                    <Ionicons name="ios-return-up-back" style={[styles.flipCardArrow, styles.shadowBox, { transform: [{ scaleX: -1 }] }]} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.songsContainer}>
                {
                    canciones.sort((a, b) => a.orden - b.orden).map((song, index) => {
                        return (
                            <SongCard key={index} index={index} isSelected={visualSong === index} setVisualSong={setVisualSong} song={song} />
                        );
                    })
                }
            </View>
        </View>
    );
};

export default Front;

const styles = StyleSheet.create({
    songsAll: {
        flexDirection: 'column',
        height: '100%',
        marginVertical: 10,
        paddingBottom: 10
    },
    arrowAndText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20
    },
    tituloCoA: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    tituloCanciones: {
        backgroundColor: '#88c4eb',
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 18,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
    },
    shadowBox: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 4
    },
    songsContainer: {
        justifyContent: 'space-evenly',
        height: '100%',
        paddingBottom: 45,
        marginHorizontal: 15
    },
    flipCardArrow: {
        fontSize: 24,
        marginRight: 6,
        padding: 4,
        paddingHorizontal: 18,
        backgroundColor: '#f3f3f3',
        borderRadius: 16,
        marginTop: 5
    }
});
