import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../NavBar";
import CardMatch from "../pochi/CardMatch";
import SwipeCards from "react-native-swipe-cards-deck";
import { getUsers } from "../../Handlers/AuthHandler";

const Match = ({ navigation, route }) => {
    const [cardToMatch, setCardToMatch] = useState();

    useEffect(() => {
        setTimeout(async () => {
            const users = await getUsers()
            console.log(users)
            setCardToMatch(users);
        }, 3000);
    }, []);

    function handleYup(card) {
        console.log(`Yup for ${cardToMatch.name}`);
        return true; // return false if you wish to cancel the action
    }
    function handleNope(card) {
        console.log(`Nope for ${cardToMatch.name}`);
        return true;
    }
    function handleMaybe(card) {
        console.log(`Maybe for ${cardToMatch.name}`);
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
                    renderCard={(cardData) => <CardMatch data={cardData} />}
                    keyExtractor={(cardData) => String(cardData.text)}
                    renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                    actions={{
                        nope: { onAction: handleNope },
                        yup: { onAction: handleYup },
                        maybe: { onAction: handleMaybe },
                    }}

                stack={true}
                stackDepth={3}
                />
            </View>
            <NavBar navigation={navigation} route={route} />
        </>
    );
};

export default Match;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafa",
        alignItems: "center",
        justifyContent: "center",
    },
});
