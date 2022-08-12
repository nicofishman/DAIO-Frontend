import { StyleSheet, View, FlatList, Text, StatusBar, RefreshControl, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/Common/NavBar'
import Interaction from '../Components/Interactions/Interaction';
import { useInteractionsContext } from '../Context/InteractionsContext';
import { useFonts } from 'expo-font';

const Chat = ({ navigation, route }) => {
    const { interactions, refreshInteractions, likeList, matchList } = useInteractionsContext()
    const [refreshing, setRefreshing] = useState(false);

    const [loaded] = useFonts({
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
    });

    const updateInt = async () => {
        await refreshInteractions();
        setRefreshing(false);
    }

    useEffect(() => {
        (async () => {
            await refreshInteractions();
        })();
    }, [])

    return loaded && (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Tus Matches</Text>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => updateInt()} />
                    }
                    data={matchList}
                    style={styles.flatList}
                    renderItem={({ item }) => (
                        <Interaction item={item} />
                    )}
                >
                </FlatList>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Tus Likes</Text>
                <View style={{ paddingTop: 10, flex: 1 }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => updateInt()} />
                        }
                        data={likeList}
                        style={[styles.flatList, { marginBottom: 70 }]}
                        renderItem={({ item }) => (
                            <Interaction item={item} />
                        )}
                    >
                    </FlatList>

                </View>
            </View>
            <NavBar navigation={navigation} route={route} />
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})