import { StyleSheet, Text, TextInput, View, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { searchTrack } from '../../Handlers/AuthHandler';
import * as SecureStore from 'expo-secure-store';
import { getUserData } from './../../Handlers/AuthHandler';
import SongSearch from '../SongSearch';
import testJson from '../pochi/TEST.json'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Config = ({ navigation, route }) => {
    const [text, setText] = useState("");
    const [search, setSearch] = useState(undefined)
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        (async () => {
            let result = await SecureStore.getItemAsync("access_token");
            const user = await getUserData(result);
            setUser(user);
        })();
    }, [])

    const onChangeText = async (e) => {
        setText(e);
        if (text.length === 0) return
        const accessToken = await SecureStore.getItemAsync('access_token');
        const res = await searchTrack(e, accessToken);
        // console.log(res);
        setSearch(res);
    }

    return (
        <>
            <View style={styles.container}>
                <Text>{JSON.stringify(user?.display_name || 'null')}</Text>
                <View style={styles.inputBar}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        caretHidden={true}
                        placeholder={"Buscar..."}
                        placeholderTextColor="#999"
                    />
                    <Ionicons style={styles.iconSearch} name="search-outline"></Ionicons>
                </View>
                <View style={styles.line}></View>
                {search?.tracks.items.map((item, index) => {
                    return index <= 4 ? (
                        <SongSearch song={item} key={index} />
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
        backgroundColor: '#3b3b3b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        padding: 5,
        color: '#e0e0e0',
        fontSize: 18,
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
        flexDirection: 'column',
    },
    line: {
        width: 300,
        height: 4,
        backgroundColor: 'black',
        marginBottom: 40,
        borderRadius: 5
    },
    iconSearch: {
        fontSize: 30,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 10
    }
})