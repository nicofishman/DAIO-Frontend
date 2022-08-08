import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRegisterContext } from '../../Context/RegisterContext';
import { useNavigation } from '@react-navigation/native';


const ArtistBox = () => {
    const { artistPreference, setArtistPreference } = useRegisterContext();
    const navigation = useNavigation();

    const removeArtist = (id) => {
        setArtistPreference(artistPreference.filter(artist => artist.id !== id))
    }

    const navegarASearch = () => {
        navigation.navigate("Register", {screen: "RegisterSearch", params: {
            type: "artista",
    }});
    }

    return (
        <View style={styles.box}>
            <View style={styles.artistBox}>
                {
                    new Array(3).fill(0).map((_, index) => {
                        const artist = artistPreference[index];
                        return (
                            artist ?
                                <View key={index} style={styles.card}>
                                    <View>
                                        <Image style={styles.image} source={{ uri: artist.image }} />
                                        <TouchableWithoutFeedback onPress={() => removeArtist(artist.id)}>
                                            <View style={styles.trashBox}>
                                                <Icon name="trash-alt" style={styles.trash} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <Text numberOfLines={2} style={styles.text}>{artist.name}</Text>
                                </View> :

                                <TouchableWithoutFeedback key={index} onPress={() => navegarASearch()}>
                                    <View style={{ justifyContent: 'center', paddingVertical: 30 }}>
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

export default ArtistBox

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        width: 332,
        height: 150,
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
        backgroundColor: 'yellow',
    },
    addView: {
        width: 43,
        borderRadius: 4,
        padding: 5,
        backgroundColor: '#98ffa8',
    },
    add: {
        color: '#fff',
        fontSize: 20,
        padding: 7,
    },
    artistBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5
    },
    text: {
        marginRight: 4,
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
        borderRadius: 10,
        bottom: -4,
        right: -4,
        color: '#fff',
        fontSize: 20,
        padding: 5,
        backgroundColor: '#ff4242',
    },
    imgAndIcon: {
        position: 'relative',
    },
    card: {
        flexDirection: 'column',
        width: 100,
        height: 112,
    },
    image: {
        width: 93,
        height: 93,
        borderRadius: 4
    }
})