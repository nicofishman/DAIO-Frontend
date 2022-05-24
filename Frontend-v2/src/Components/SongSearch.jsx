import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SongSearch = ({ song }) => {
    //put all artists in one string separated by commas
    let artists = ''
    song.artists.forEach((artist, index) => {
        artists += artist.name
        if (index !== song.artists.length - 1) {
            artists += ', '
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.box} numberOfLines={1}><Text style={styles.title}>{song.name} - </Text><Text style={styles.artists}>{artists}</Text></Text>

        </View>
    )
}

export default SongSearch

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: 300,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
    },
    box: {
        marginLeft: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    artists: {
        fontSize: 12,
        color: '#999',
    }
})