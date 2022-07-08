import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import InnerCard from './CardMatch/InnerCard';

const CardMatch = ({ data, visualArtist, visualSong, setVisualArtist, setVisualSong }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.textName}>{data.username}</Text>
            <Text style={styles.textDesc}>{data.description}</Text>
            <InnerCard user={data} visualArtist={visualArtist} visualSong={visualSong} setVisualArtist={setVisualArtist} setVisualSong={setVisualSong} />
            <View style={{ width: '100%', height: '8%' }}>
            </View>
        </View >
    );
}

export default CardMatch

const styles = StyleSheet.create({
    card: {
        width: 370,
        bottom: '-10%',
        height: '90%',
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 20
    },
    textName: {
        fontSize: 36,
        marginRight: "auto",
        marginLeft: 20,
        marginTop: 10
    },
    textDesc: {
        fontSize: 16,
        backgroundColor: "#f3f3f3",
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 20,
        textAlign: "justify",
        overflow: "hidden",
    }
})