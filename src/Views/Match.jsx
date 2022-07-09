import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import NavBar from "../Components/Common/NavBar";
import CardMatch from "../Components/Match/CardMatch";
import SwipeCards from "react-native-swipe-cards-deck";
import { addInteraction, getNotInteractedUsers, getUsersAndInfo } from "../Handlers/AuthHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Match = ({ navigation, route }) => {
    const [cardToMatch, setCardToMatch] = useState();

    const [visualArtist, setVisualArtist] = useState(-1);
    const [visualSong, setVisualSong] = useState(-1);

    useEffect(() => {
        (async () => {
            const spotifyId = await AsyncStorage.getItem('spotify_id');
            const users = await getNotInteractedUsers(spotifyId)
            setCardToMatch(users);
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
                <SwipeCards
                    cards={cardToMatch}
                    renderCard={(cardData) => <CardMatch data={cardData} visualArtist={visualArtist} visualSong={visualSong} setVisualArtist={setVisualArtist} setVisualSong={setVisualSong} />}
                    keyExtractor={(cardData) => String(cardData.spotifyId)}
                    renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                    actions={{
                        nope: {
                            view: <View style={[styles.handleBox, {backgroundColor: '#ff7374'}]}><Text style={styles.handleBoxText}>Nah...</Text><Ionicons style={[styles.handleBoxText, styles.handleIcon, {color: '#ff7374'}]} name="close"/></View>, 
                            containerStyle: styles.BoxViewNope, 
                            onAction: handleNope,
                        },
                        yup: { 
                            view: <View style={[styles.handleBox, {backgroundColor: '#69f079'}]}><Text style={styles.handleBoxText}>Like :D</Text><Ionicons style={[styles.handleBoxText, styles.handleIcon, {color: '#69f079'}]} name="musical-note"/></View>, 
                            containerStyle: styles.BoxViewLike, 
                            onAction: handleYup
                        },
                    }}
                    swipeThreshold={100}
                    stack={true}
                    stackDepth={1}
                    stackOffsetX={0}
                />
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    );
};

export default Match;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffdbe7",
        alignItems: "center",
        justifyContent: "center",

    },
    handleBox: { 
        paddingLeft: 10, 
        paddingRight: 7,
        paddingVertical: 5, 
        height: 60,
        borderRadius: 20, 
        top: 0, 
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    BoxViewNope: {
        bottom: windowHeight * 0.85, 
        left: windowWidth * 0.45,
        borderWidth: 0,
    },
    BoxViewLike: {
        bottom: windowHeight * 0.85, 
        left: windowWidth * 0.03,
        borderWidth: 0,
    },
    handleBoxText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    handleIcon: {
        fontSize: 40, 
        marginLeft: 15, 
        borderRadius: 15,
        backgroundColor: '#ffdbe7'
    },
});
