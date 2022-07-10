import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import ArtistCard from './ArtistCard'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Back = ({ artistas, isFlipped, setIsFlipped }) => {
    return (
        <View style={styles.artistAll}>
            <View style={styles.arrowAndText}>
                <TouchableWithoutFeedback onPress={() => setIsFlipped(!isFlipped)}>
                    <Ionicons style={[styles.flipCardArrow, styles.shadowBox]} name="ios-return-up-back"></Ionicons>
                </TouchableWithoutFeedback>
                <Text style={[styles.tituloCoA, styles.tituloArtistas, styles.shadowBox]}>Artistas</Text>
            </View>
            <View style={styles.artistContainer}>
                {
                    artistas.sort((a, b) => a.orden - b.orden).map((artist, index) => {
                        return (
                            <ArtistCard key={index} index={index} artist={artist} />
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Back

const styles = StyleSheet.create({
    artistAll: {
        height: '100%',
        flexDirection: 'column',
        marginVertical: 10,
    },
    artistContainer: {
        justifyContent: 'space-evenly',
        height: '100%',
        paddingBottom: 35,
    },
    arrowAndText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20
    },
    flipCardArrow: {
        fontSize: 24,
        marginRight: 6,
        padding: 4,
        paddingHorizontal: 18,
        backgroundColor: '#f3f3f3',
        borderRadius: 16,
        marginTop: 5
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
    tituloCoA: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    tituloArtistas: {
        backgroundColor: '#eb787c',
        paddingRight: 20,
        paddingVertical: 5,
        paddingLeft: 18,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
})