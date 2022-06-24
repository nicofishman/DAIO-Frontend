import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../Components/Common/NavBar";
import CardMatch from "../Components/Match/CardMatch";
import SwipeCards from "react-native-swipe-cards-deck";
import { addInteraction, getUsersAndInfo } from "../Handlers/AuthHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Match = ({ navigation, route }) => {
    const [cardToMatch, setCardToMatch] = useState();

    const [visualArtist, setVisualArtist] = useState(-1);
    const [visualSong, setVisualSong] = useState(-1);

    useEffect(() => {
        (async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            const users = await getUsersAndInfo(accessToken)
            setCardToMatch(users);
        })()
    }, []);


    async function handleYup(card) {
        const spotifyId = await AsyncStorage.getItem('spotify_id');
        console.log(`Yup for ${spotifyId} -> ${card.spotifyId}`);
        const response = await addInteraction({
            madeBy: spotifyId,
            interactedWith: card.spotifyId,
            decision: true
        })
        console.log(response);
        setVisualArtist(-1);
        setVisualSong(-1);
        return true; // return false if you wish to cancel the action
    }
    async function handleNope(card) {
        const spotifyId = await AsyncStorage.getItem('spotify_id');
        console.log(`Nope for ${spotifyId} -> ${card.spotifyId}`);
        const response = await addInteraction({
            madeBy: spotifyId,
            interactedWith: card.spotifyId,
            decision: true
        })
        console.log(response);
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
                        nope: { show: false, onAction: handleNope },
                        yup: { show: false, onAction: handleYup },
                    }}

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
0
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafa",
        alignItems: "center",
        justifyContent: "center",
    },
});
