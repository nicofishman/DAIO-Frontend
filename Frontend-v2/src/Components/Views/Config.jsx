import { StyleSheet, Text, TextInput, View, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { searchTrack } from '../../Handlers/AuthHandler';
import * as SecureStore from 'expo-secure-store';

const Config = ({ navigation, route }) => {
    const [text, setText] = useState("");
    const [search, setSearch] = useState(undefined)

    const onChangeText = async (e) => {
        setText(e);
        const accessToken = await SecureStore.getItemAsync('access_token');
        const res = await searchTrack(e, accessToken);
        setSearch(res);
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                {search && search.body.tracks.items.map((item, index) => {
                    return index <= 3 ? (
                        <View key={index} style={styles.card}>
                            <Text>{item.name}</Text>
                            <Text>{item.artists[0].name}</Text>
                        </View>
                    ) : null
                })}
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    )
}

export default Config

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#7a42f4',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f3f3f3',
        width: 300,
    },
    card: {
        height: 100,
        width: 300,
        backgroundColor: '#ccc',
        flexDirection: 'column',
    }
})