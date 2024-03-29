import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { useRegisterContext } from '../../Context/RegisterContext';
import { getArtistsById } from '../../Handlers/AuthHandler';

const SongSearch = ({ song }) => {
    const { setSongPreference, songPreference } = useRegisterContext();
    const navigation = useNavigation();

    const handleSelect = async () => {
        const artistsData = await getArtistsById(song.artists.map(art => art.id));

        console.log(artistsData);
        const genres = artistsData.map(art => art.genres).flat();

        console.log(song.id, genres);
        setSongPreference([...songPreference, {
            id: song.id,
            name: song.name,
            img: song.album.images[0].url,
            external_urls: song.external_urls,
            artists: artistsData,
            preview_url: song.preview_url,
            duration: song.duration_ms,
            genres,
            albumId: song.album.id,
            albumName: song.album.name,
            albumImage: song.album.images[0].url
        }]);
        navigation.goBack();
    };

    const artists = song.artists.map(art => art.name).join(', ');

    return (
        <View style={[styles.container, styles.shadowBox]}>
            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
                <Image source={{ uri: song.album.images[0].url }} style={styles.image} />
                <View style={styles.textSong}>
                    <Text numberOfLines={2} style={styles.title}>{song.name}</Text>
                    <Text numberOfLines={1} style={styles.artists}>{artists}</Text>
                </View>
            </View>
            <View style={styles.addSong}>
                <TouchableWithoutFeedback onPress={handleSelect}>
                    <AntDesign name="pluscircleo" style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default SongSearch;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        width: 300,
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#535353',
        borderRadius: 5,
        marginBottom: 15
    },
    textSong: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
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
        color: '#999'
    },
    image: {
        height: 60,
        width: 60,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
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
    addSong: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#2b2b2b',
        borderBottomEndRadius: 5,
        borderTopRightRadius: 5,
        marginLeft: 10
    },
    icon: {
        fontSize: 24,
        color: '#e0e0e0'
    }
});
