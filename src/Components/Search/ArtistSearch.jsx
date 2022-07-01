import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRegisterContext } from '../../Context/RegisterContext';
import { useNavigation } from '@react-navigation/native';

const ArtistSearch = ({ artist }) => {
    const { setArtistPreference, artistPreference } = useRegisterContext();
    const navigation = useNavigation();

    const handleSelect = () => {
        setArtistPreference([...artistPreference, {
            id: artist.id,
            name: artist.name,
            img: artist.images[0].url
        }]);
        navigation.goBack();
    }

    if (!artist.images.length > 0) return null;
    return (
        <View style={[styles.container, styles.shadowBox]}>
            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
                {artist.images[0].url &&
                    <Image style={styles.image} source={{ uri: artist.images[0].url }} />
                }
                <View style={styles.textSong}>
                    <Text style={styles.title}>{artist.name}</Text>
                </View>
            </View>
            <View style={{ paddingLeft: 10 }}>
                <TouchableWithoutFeedback onPress={handleSelect}>
                    <AntDesign style={styles.icon} name="pluscircleo" />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default ArtistSearch

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: 300,
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#615e5e',
        borderRadius: 5,
        marginBottom: 15,
    },
    textSong: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    box: {
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#e0e0e0'
    },
    artists: {
        fontSize: 12,
        color: '#999',
    },
    image: {
        height: 60,
        width: 60,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
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
    icon: {
        fontSize: 20,
        color: '#e0e0e0',
        marginRight: 10,
        marginTop: 20,
    }
})