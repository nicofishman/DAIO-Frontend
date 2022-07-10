import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArtistCard = ({ index, artist }) => {
    return (
        <View key={index} style={{ alignItems: 'flex-end' }}>
            <View style={[styles.artistDetails, styles.shadowBox, { position: 'relative' }]}>
                <Text numberOfLines={1} style={styles.artistDetailsName}>{artist.name}</Text>
                <View style={styles.artistDetailsText}>
                    <Text style={styles.artistDetailsText} numberOfLines={2}>
                        {artist.genres.join(', ')}
                    </Text>
                </View>
                <Image
                    key={artist.image}
                    style={[styles.artistImg]}
                    source={{ uri: artist.image }}
                />
            </View>
        </View>
    )
}

export default ArtistCard

const styles = StyleSheet.create({
    artistDetails: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: '#ffffff',
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
    artistDetailsName: {
        fontSize: 24,
        color: '#000',
        width: '65%',
    },
    artistDetailsText: {
        color: '#000',
        width: '75%',
    },
    artistImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.9,
        shadowRadius: 19.46,
        elevation: 13,
    },
})