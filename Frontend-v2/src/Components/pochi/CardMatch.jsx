import React from 'react'
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native'

const CardMatch = ({ data }) => {

    return (
        <View style={styles.card}>
            <Text style={styles.textName}>{data.name}</Text>
            <Text style={styles.textDesc}>{data.description}</Text>
        </View>
        /*<DraxProvider>
            <DraxView>
            </DraxView>

        </DraxProvider>*/
    );
}


export default CardMatch

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: 370,
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        marginTop: 100,
        borderRadius: 20

    },
    textName: {
        fontSize: 36,
        marginRight: "auto",
        marginLeft: 20,
        marginTop: 10

        //fontFamily: 'AverageSans_400Regular',
    },
    textDesc: {
        fontSize: 16,
        backgroundColor: "#f3f3f3",
        marginHorizontal: 15,
        marginTop: 10,
        textAlign: "justify"
    }

})