import { StyleSheet, View, FlatList, Text, StatusBar, RefreshControl, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Common/NavBar'
import Interaction from '../Components/Interactions/Interaction';
import { useInteractionsContext } from '../Context/InteractionsContext';
import { useFonts } from 'expo-font';

const Chat = ({ navigation, route }) => {
    const { interactions, refreshInteractions } = useInteractionsContext()
    const [refreshing, setRefreshing] = useState(false);

    const [loaded] = useFonts({
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
    });

    const updateInt = async () => {
        await refreshInteractions()
        console.log(interactions.length);
        setRefreshing(false);
    }

    useEffect(() => {
        (async () => {
            await refreshInteractions();
        })();
    }, [])

    return loaded && (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tus Interacciones</Text>
            <View style={{ paddingTop: 10, flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => updateInt()} />
                    }
                    data={interactions}
                    style={styles.flatList}
                    renderItem={({ item }) => (
                        <Interaction item={item} />
                    )}
                >

                </FlatList>
                <NavBar navigation={navigation} route={route} />
            </View>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fef',
    },
    flatList: {
        backgroundColor: '#fff',
        marginBottom: 70,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})