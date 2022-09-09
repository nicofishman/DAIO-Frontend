import { StyleSheet, View, FlatList, Text, StatusBar, RefreshControl, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

import NavBar from '../Components/Common/NavBar';
import Interaction from '../Components/Interactions/Interaction';
import { useInteractionsContext } from '../Context/InteractionsContext';

const Chat = ({ navigation, route }) => {
    const { refreshInteractions, likeList, matchList } = useInteractionsContext();
    const [refreshing, setRefreshing] = useState(false);

    const [loaded] = useFonts({
        QuicksandRegular: require('../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
        QuicksandBold: require('../../assets/fonts/Quicksand/Quicksand-Bold.ttf')
    });

    const updateInt = async () => {
        await refreshInteractions();
        setRefreshing(false);
    };

    useEffect(() => {
        (async () => {
            await refreshInteractions();
        })();
    }, []);

    return loaded && (
        <SafeAreaView style={styles.container}>
            <View style={[!matchList.length > 0 ? { height: '20%', alignItems: 'center' } : { flex: 0.4 }]}>
                <Text style={styles.title}>Tus Matches</Text>
                <View style={[{ flex: 1 }, !matchList.length && { justifyContent: 'center' }]}>
                    {
                        matchList.length
                            ? <FlatList
                                data={matchList}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={() => updateInt()} />
                                }
                                renderItem={({ item }) => (
                                    <Interaction item={item} />
                                )}
                                style={[styles.flatList, !matchList.length && { backgroundColor: 'red' }]}
                            />
                            : <Text style={styles.noMatches}>No tienes ninguna match</Text>
                    }
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }}
            />
            <View style={[{ paddingTop: 10, paddingBottom: 0 }, !likeList.length ? { height: '20%', alignItems: 'center' } : { flex: 1 }]}>
                <Text style={styles.title}>Tus Likes</Text>
                <View style={[{ flex: 1 }, !likeList.length > 0 && { justifyContent: 'center' }]}>
                    {
                        likeList.length > 0
                            ? <FlatList
                                data={likeList}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={() => updateInt()} />
                                }
                                renderItem={({ item }) => (
                                    <Interaction item={item} />
                                )}
                                style={[styles.flatList, { marginBottom: 70 }]}
                            />
                            : <Text style={styles.noMatches}>No tienes ninguna match</Text>
                    }

                </View>
            </View>
            <NavBar navigation={navigation} route={route} />
        </SafeAreaView>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 10,
        backgroundColor: '#fef'
    },
    flatList: {
        // backgroundColor: '#fff',
        paddingTop: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
