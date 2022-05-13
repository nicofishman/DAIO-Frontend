import React from 'react'
import { StyleSheet, Text, View, Button, Alert, Pressable } from 'react-native'
import { DraxProvider, DraxView } from 'react-native-drax';

const CardMatch = ({ onPress }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.textName}>Jorge</Text>
            <Text style={styles.textDesc}>Mido un metro ochenta y uno, tengo un sillón azul. En mi cuarto hay un baúl y me gusta el almendrado. Me despierto alunado y mi madre es medio terca.</Text>
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