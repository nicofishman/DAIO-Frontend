import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ImageBackground, ActivityIndicator } from "react-native";
import NavBar from "../Components/Common/NavBar";
import CardMatch from "../Components/Match/CardMatch";
import SwipeCards from "react-native-swipe-cards-deck";
import { addInteraction, getNotInteractedUsers, getUsersAndInfo } from "../Handlers/AuthHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Match = ({ navigation, route }) => {
    const [cardToMatch, setCardToMatch] = useState();
    const [visualArtist, setVisualArtist] = useState(-1);
    const [visualSong, setVisualSong] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const spotifyId = await AsyncStorage.getItem('spotify_id');
            const users = await getNotInteractedUsers(spotifyId)
            setCardToMatch(users);
            setIsLoading(false);
        })()
    }, []);


    async function handleYup(card) {
        const spotifyId = await AsyncStorage.getItem('spotify_id');
        console.log(`Yup for ${spotifyId} -> ${card.spotifyId}`);
        const response = await addInteraction({
            userId: spotifyId,
            interactedWith: card.spotifyId,
            decision: true
        })
        setVisualArtist(-1);
        setVisualSong(-1);
        return true; // return false if you wish to cancel the action
    }
    async function handleNope(card) {
        const spotifyId = await AsyncStorage.getItem('spotify_id');
        console.log(`Nope for ${spotifyId} -> ${card.spotifyId}`);
        const response = await addInteraction({
            userId: spotifyId,
            interactedWith: card.spotifyId,
            decision: false
        })
        setVisualArtist(-1);
        setVisualSong(-1);
        return true;
    }
    function StatusCard({ text }) {
        return (
            <View>
                <Text style={styles.cardsText}>{text}</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.container}>
                {/* <ImageBackground
                source={require('../Assets/Match/matchBackgroundFull.png')}
                resizeMode='cover'
                style={{width: '100%', height: '100%', overflow: 'hidden', zIndex: -10}} imageStyle={{ opacity: 1, overflow: 'hidden' }}> */}

                <SwipeCards
                    cards={cardToMatch ?? []}
                    renderCard={(cardData) => <CardMatch data={cardData} visualArtist={visualArtist} visualSong={visualSong} setVisualArtist={setVisualArtist} setVisualSong={setVisualSong} />}
                    keyExtractor={(cardData) => String(cardData.spotifyId)}
                    renderNoMoreCards={() => {
                        return (
                            isLoading ?
                                <ActivityIndicator style={{ flex: 2.3 }} size={60} color='#ffffff' />
                                : <StatusCard text='No hay más usuarios por hoy... Volvé más tarde' />
                        )
                    }}
                    actions={{
                        nope: {
                            view:
                                <View style={[styles.handleBox, { paddingLeft: 10, paddingRight: 7, borderColor: '#ff7374', transform: ([{ rotateX: '35deg' }, { rotateZ: '0.45398rad' }]) }]}>
                                    <Text style={[styles.handleBoxText, { color: '#ff7374' }]}>Nope :C</Text>
                                    <Ionicons style={[styles.handleBoxText, styles.handleIcon, { marginLeft: 15, backgroundColor: '#ff7374' }]} name="close" />
                                </View>,
                            containerStyle: styles.BoxViewNope,
                            onAction: handleNope,
                        },
                        yup: {
                            view:
                                <View style={[styles.handleBox, { paddingLeft: 7, paddingRight: 10, borderColor: '#69f079', transform: ([{ rotateX: '35deg' }, { rotateZ: '-0.45398rad' }]) }]}>
                                    <Ionicons style={[styles.handleBoxText, styles.handleIcon, { marginRight: 15, backgroundColor: '#69f079' }]} name="musical-note" />
                                    <Text style={[styles.handleBoxText, { color: '#69f079' }]}>Like :D</Text>
                                </View>,
                            containerStyle: styles.BoxViewLike,
                            onAction: handleYup
                        },
                    }}
                    swipeThreshold={100}
                    stack={true}
                    stackDepth={1}
                    stackOffsetX={0}
                />
                {/* </ImageBackground> */}
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    );
};

export default Match;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACKGROUND_COLOR = "#454545"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: "center",
        justifyContent: "center",
    },
    //backgroundColor: '#69f079',
    handleBox: {
        paddingVertical: 5,
        height: 70,
        borderRadius: 20,
        top: 0,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        borderWidth: 2
    },
    BoxViewNope: {
        bottom: windowHeight * 0.85,
        left: windowWidth * 0.4,
        borderWidth: 0,
    },
    BoxViewLike: {
        bottom: windowHeight * 0.85,
        left: -windowWidth * 0.03,
        borderWidth: 0,
    },
    handleBoxText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    handleIcon: {
        fontSize: 50,
        borderRadius: 15,
        color: BACKGROUND_COLOR
    },
});
