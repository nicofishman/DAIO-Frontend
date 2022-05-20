import { StyleSheet, Text, TextInput, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../NavBar'
import { searchTrack } from '../../Handlers/AuthHandler';
import * as SecureStore from 'expo-secure-store';

const Config = ({ navigation, route }) => {
    const [text, setText] = useState("");
    const [search, setSearch] = useState({})
    const [screenHeight, setScreenHeight] = useState(0)
    const { height } = Dimensions.get("window");

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight);
    };



    const onChangeText = async (e) => {
        setText(e);
        const accessToken = await SecureStore.getItemAsync('access_token');
        const res = await searchTrack(e, accessToken);
        setSearch(res);
    }

    const scrollEnabled = screenHeight > height;

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ flex: 1, }}
                contentContainerStyle={styles.container}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={onContentSizeChange}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Text>{JSON.stringify(search, null, "\t")}</Text>
            </ScrollView>
            <NavBar navigation={navigation} route={route} />
        </View>
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
    }
})