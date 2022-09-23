import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import SwipeCards from 'react-native-swipe-cards-deck';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NavBar from '../Components/Common/NavBar';
import CardMatch from '../Components/Match/CardMatch';
import { addInteraction, getNotInteractedUsers } from '../Handlers/AuthHandler';
import { useInteractionsContext } from '../Context/InteractionsContext';

const Match = ({ navigation, route }) => {
    const [cardToMatch, setCardToMatch] = useState();
    const [visualArtist, setVisualArtist] = useState(-1);
    const [visualSong, setVisualSong] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { refreshInteractions } = useInteractionsContext();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await refreshUsers(true);
            setIsLoading(false);
        })();
    }, []);

    const refreshUsers = async (first) => {
        if (!first) setIsRefreshing(true);
        const spotifyId = await AsyncStorage.getItem('spotify_id');
        const users = await getNotInteractedUsers(spotifyId);

        setCardToMatch(users || []);
        setIsRefreshing(false);
    };

    async function handleYup (card) {
        const spotifyId = await AsyncStorage.getItem('spotify_id');

        console.log(`Yup for ${spotifyId} -> ${card.spotifyId}`);
        const _response = await addInteraction({
            userId: spotifyId,
            interactedWith: card.spotifyId,
            decision: true
        });

        setVisualArtist(-1);
        setVisualSong(-1);
        refreshInteractions();

        return true; // return false if you wish to cancel the action
    }
    async function handleNope (card) {
        const spotifyId = await AsyncStorage.getItem('spotify_id');

        console.log(`Nope for ${spotifyId} -> ${card.spotifyId}`);
        const _response = await addInteraction({
            userId: spotifyId,
            interactedWith: card.spotifyId,
            decision: false
        });

        setVisualArtist(-1);
        setVisualSong(-1);
        refreshInteractions();

        return true;
    }
    function StatusCard ({ text }) {
        return (
            <View style={{ backgroundColor: '#969696', padding: 5, paddingHorizontal: 10, borderRadius: 10 }}>
                <Text style={styles.cardsText}>{text}</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={() => refreshUsers(false)} />
                }
            >
                {/* <ImageBackground
                source={require('../Assets/Match/matchBackgroundFull.png')}
                resizeMode='cover'
                style={{width: '100%', height: '100%', overflow: 'hidden', zIndex: -10}} imageStyle={{ opacity: 1, overflow: 'hidden' }}> */}

                <SwipeCards
                    actions={{
                        nope: {
                            view:
                                <View style={[styles.handleBox, { paddingLeft: 10, paddingRight: 7, borderColor: '#ff7374', transform: ([{ rotateZ: '0.45398rad' }]) }]}>
                                    <Text style={[styles.handleBoxText, { color: '#ff7374' }]}>Nope :C</Text>
                                    <Ionicons name="close" style={[styles.handleBoxText, styles.handleIcon, { marginLeft: 15, backgroundColor: '#ff7374' }]} />
                                </View>,
                            containerStyle: styles.BoxViewNope,
                            onAction: handleNope
                        },
                        yup: {
                            view:
                                <View style={[styles.handleBox, { paddingLeft: 7, paddingRight: 10, borderColor: '#69f079', transform: ([{ rotateZ: '-0.45398rad' }]) }]}>
                                    <Ionicons name="musical-note" style={[styles.handleBoxText, styles.handleIcon, { marginRight: 15, backgroundColor: '#69f079' }]} />
                                    <Text style={[styles.handleBoxText, { color: '#69f079' }]}>Like :D</Text>
                                </View>,
                            containerStyle: styles.BoxViewLike,
                            onAction: handleYup
                        }
                    }}
                    cards={cardToMatch ?? []}
                    keyExtractor={(cardData) => String(cardData.spotifyId)}
                    renderCard={(cardData) => <CardMatch data={cardData} setVisualArtist={setVisualArtist} setVisualSong={setVisualSong} visualArtist={visualArtist} visualSong={visualSong} />}
                    renderNoMoreCards={() => {
                        return (
                            isLoading
                                ? <ActivityIndicator color='#ff7374' size={60} style={{ flex: 2.3 }} />
                                : <StatusCard text='No hay más usuarios por hoy... Volvé más tarde' />
                        );
                    }}
                    stack={true}
                    stackDepth={1}
                    stackOffsetX={0}
                    swipeThreshold={100}
                />
                {/* </ImageBackground> */}
            </ScrollView>
            <NavBar navigation={navigation} route={route} />
        </>
    );
};

export default Match;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACKGROUND_COLOR = '#fafafa';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    handleBox: {
        paddingVertical: 5,
        height: 70,
        borderRadius: 20,
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 2
    },
    BoxViewNope: {
        bottom: windowHeight * 0.82,
        left: windowWidth * 0.4,
        borderWidth: 0
    },
    BoxViewLike: {
        bottom: windowHeight * 0.82,
        left: -windowWidth * 0.03,
        borderWidth: 0
    },
    handleBoxText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    handleIcon: {
        fontSize: 50,
        borderRadius: 15,
        color: BACKGROUND_COLOR
    }
});
