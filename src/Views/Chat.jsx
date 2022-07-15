import { StyleSheet, Text, View, FlatList, SafeAreaView, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Common/NavBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInteractions } from '../Handlers/AuthHandler';
import Interaction from '../Components/Interactions/Interaction';

const Chat = ({ navigation, route }) => {
    const [interactions, setInteractions] = useState([]);
    useEffect(() => {
        AsyncStorage.getItem('spotify_id').then(id => {
            getInteractions(id).then(interactions => {
                setInteractions(interactions)
            })
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ paddingTop: StatusBar.currentHeight, height: '100%' }}>
                <FlatList
                    data={interactions}
                    renderItem={({ item }) => (
                        <Interaction item={item} />
                    )}
                >

                </FlatList>
                <NavBar navigation={navigation} route={route} />
            </View>
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
})