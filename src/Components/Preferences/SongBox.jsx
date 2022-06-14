import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRegisterContext } from '../../Context/RegisterContext';

const SongBox = ({ selected, setSelected }) => {
    const { songPreference, setSongPreference } = useRegisterContext()
    const [contador, setContador] = useState(0);

    const removeSong = (id) => {
        console.log(id);
        setSongPreference(songPreference.filter(song => song.id !== id))
    }

    return (
        <TouchableWithoutFeedback onPress={() => setSelected('canciones')}>
            <View style={[styles.box, selected && styles.selected]}>
                <Text>Canciones</Text>
                <View style={styles.songsBox}>
                    {
                        new Array(5).fill(0).map((_, index) => {
                            const song = songPreference[index];
                            const displayText = song && song.name + ' - ' + song.artists.join(', ')
                            return (
                                song ?
                                    <View key={index} style={styles.songRow}>
                                        <View style={styles.songTextBox}>
                                            <Text numberOfLines={1} style={styles.text}>{displayText}</Text>
                                        </View>
                                        <TouchableWithoutFeedback onPress={() => removeSong(song.id)}>
                                            <View style={styles.trashBox}>
                                                <Icon name="trash-alt" style={styles.trash} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View> :
                                    <View key={index} style={{ alignItems: 'center' }}>
                                        <View style={styles.add}>
                                            <Icon key={index} name="plus" style={styles.add} />
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
    add: {
        width: 43,
        borderRadius: 4,
        color: '#fff',
        fontSize: 20,
        padding: 5,
        backgroundColor: '#98ffa8',
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