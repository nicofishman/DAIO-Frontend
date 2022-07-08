import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ArtistCard = ({ index, artist }) => {
    return (
        <View key={index} style={{ alignItems: 'flex-end' }}>
            <View style={[styles.artistDetails, { position: 'relative' }]}>
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
    artistDetailsName: {
        fontSize: 22,
        color: '#fff',
        width: '65%',
    },
    artistDetailsText: {
        color: '#fff',
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
})