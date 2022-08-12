import { StyleSheet, View, FlatList, Text, StatusBar, RefreshControl, SafeAreaView, Divider } from 'react-native'
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
            <View style={[!matchList.length > 0 ? { height: '20%', alignItems: 'center' } : { flex: 0.4 }]}>
                <Text style={styles.title}>Tus Matches</Text>
                <View style={[{ flex: 1 }, !matchList.length && { justifyContent: 'center' }]}>
                    {
                        matchList.length ? <FlatList
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={() => updateInt()} />
                            }
                            data={matchList}
                            style={[styles.flatList, !matchList.length && { backgroundColor: 'red' }]}
                            renderItem={({ item }) => (
                                <Interaction item={item} />
                            )}
                        >
                        </FlatList>
                            : <Text style={styles.noMatches}>No tienes ninguna match</Text>
                    }
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View style={[{ paddingTop: 10, paddingBottom: 0 }, !likeList.length ? { height: '20%', alignItems: 'center' } : { flex: 1 }]}>
                <Text style={styles.title}>Tus Likes</Text>
                <View style={[{ flex: 1 }, !likeList.length > 0 && { justifyContent: 'center' }]}>
                    {
                        likeList.length > 0 ?
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
                            : <Text style={styles.noMatches}>No tienes ninguna match</Text>
                    }

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
        paddingTop: StatusBar.currentHeight + 10,
        backgroundColor: '#fef',
    },
    flatList: {
        // backgroundColor: '#fff',
        paddingTop: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})