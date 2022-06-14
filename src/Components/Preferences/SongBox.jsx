import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

const SongBox = ({ songs, selected, setSelected }) => {
    return (
        <TouchableWithoutFeedback onPress={() => setSelected('canciones')}>
            <View style={[styles.box, selected && styles.selected]}>
                <Text>Canciones</Text>
                <View style={styles.songsBox}>
                    {
                        songs.map((song, index) => {
                            const displayText = song.name + ' - ' + song.artists.join(', ')
                            return (
                                <View key={index} style={styles.songRow}>
                                    <View style={styles.songTextBox}>
                                        <Text numberOfLines={1} style={styles.text}>{displayText}</Text>
                                    </View>
                                    <View style={styles.trashBox}>
                                        <Icon name="trash-alt" style={styles.trash} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default SongBox

const styles = StyleSheet.create({
    box: {
        width: 332,
        height: 256,
        marginTop: 20,
        justifyContent: 'center',
        borderRadius: 4,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        paddingHorizontal: 10,
    },
    selected: {
        backgroundColor: 'red'
    },
    songsBox: {
        width: 312,
        height: 211,
        justifyContent: 'space-around',
        borderRadius: 4,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1
    },
    songTextBox: {
        width: 290,
        height: 29,
        borderRadius: 4,
        backgroundColor: "#f3f3f3",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 1
    },
    songRow: {
        flexDirection: 'row',
    },
    text: {
        marginHorizontal: 4
    },
    trashBox: {
        position: 'absolute',
        right: 5,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    trash: {
        borderRadius: 4,
        color: '#fff',
        fontSize: 20,
        padding: 5,
        backgroundColor: '#f67171',
    },
})