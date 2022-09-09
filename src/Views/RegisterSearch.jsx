import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { searchTrack, searchArtist } from '../Handlers/AuthHandler';
import SongSearch from '../Components/Search/SongSearch';
import ArtistSearch from '../Components/Search/ArtistSearch';

const RegisterSearch = ({ route }) => {
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const { type } = route.params;

    // NO PERMITIR ARTISTA-CANCION SI ESTA ELEGIDO YA

    useEffect(() => {
        (async () => {
            const result = await AsyncStorage.getItem('access_token');

            setAccessToken(result);
        })();
    }, []);

    const onChangeText = async (e) => {
        setText(e);
        if (text.length === 0 || !e) {
            setSearch('');

            return;
        }
        if (type === 'cancion') {
            const res = await searchTrack(e, accessToken);

            setSearch(res);
        } else if (type === 'artista') {
            const res = await searchArtist(e, accessToken);

            setSearch(res);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.inputBar}>
                    <TextInput
                        caretHidden={true}
                        placeholder={`Buscar ${type}...`}
                        placeholderTextColor="#b3b3b3"
                        style={styles.input}
                        value={text}
                        onChangeText={onChangeText}
                    />
                    <Ionicons name="search-outline" style={styles.iconSearch} />
                </View>
                <View style={styles.line} />
                {search
                    ? type === 'cancion'
                        ? search.map((item, index) => {
                            return index <= 4
                                ? (
                                    <SongSearch key={index} song={item} />
                                )
                                : null;
                        })
                        : search.map((item, index) => {
                            return index <= 4
                                ? (
                                    <ArtistSearch key={index} artist={item} />
                                )
                                : null;
                        })
                    : null
                }
            </View>
        </>
    );
};

export default RegisterSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191414',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        padding: 10
    },
    input: {
        height: 40,
        padding: 5,
        color: '#e0e0e0',
        fontSize: 18
    },
    inputBar: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between'
    },
    card: {
        height: 100,
        width: 300,
        backgroundColor: '#ccc',
        flexDirection: 'column'
    },
    line: {
        width: 300,
        height: 4,
        backgroundColor: '#535353',
        marginBottom: 40,
        borderRadius: 5
    },
    iconSearch: {
        fontSize: 28,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 10,
        color: '#535353'
    }
});
