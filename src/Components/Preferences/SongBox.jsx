import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRegisterContext } from '../../Context/RegisterContext';
import { useNavigation } from '@react-navigation/native';

const SongBox = () => {
    const { songPreference, setSongPreference } = useRegisterContext()
    const navigation = useNavigation();

    const removeSong = (id) => {
        setSongPreference(songPreference.filter(song => song.id !== id))
    }

    const navegarASearch = () => {
        navigation.navigate("Register", {screen: "RegisterSearch", params: {
            type: "cancion",
    }});
    }

    return (
        <View style={styles.box}>
            <View style={styles.songsBox}>
                {
                    new Array(5).fill(0).map((_, index) => {
                        const song = songPreference[index];
                        const displayText = song && song.name + ' - ' + song.artists.map(art => art.name).join(', ')
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

                                <TouchableWithoutFeedback key={index} onPress={() => navegarASearch()}>
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.addView}>
                                            <Icon name="plus" style={styles.add} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
        </View>
    )

}

export default SongBox

const styles = StyleSheet.create({
    box: {
        width: 332,
        height: 300,
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
        left: -9
    },
    selected: {
        backgroundColor: 'red'
    },
    addView: {
        width: 40,
        borderRadius: 4,
        padding: 5,
        backgroundColor: '#98ffa8',
    },
    add: {
        color: '#fff',
        fontSize: 20,
        padding: 6,
    },
    songsBox: {
        width: 312,
        height: 250,
        justifyContent: 'space-around',
        borderRadius: 4,
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
        height: 40,
        borderRadius: 4,
        backgroundColor: "#f3f3f3",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 2,
            height: 2
        },
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 1,
        marginRight: 5,
    },
    songRow: {
        flexDirection: 'row',
    },
    text: {
        marginHorizontal: 7
    },
    trashBox: {
        right: 3,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    trash: {
        borderRadius: 4,
        color: '#fff',
        fontSize: 28,
        padding: 6,
        backgroundColor: '#ff4242', //'#ff4242',
    },
})