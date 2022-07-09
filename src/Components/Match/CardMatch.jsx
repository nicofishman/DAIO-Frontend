import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import InnerCard from './CardMatch/InnerCard';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const CardMatch = ({ data, visualArtist, visualSong, setVisualArtist, setVisualSong }) => {
    
    const [loaded] = useFonts({
        Capriola: require('../../../assets/fonts/Capriola.ttf'),
        Quicksand: require('../../../assets/fonts/Quicksand/Quicksand.ttf'),
        QuicksandRegular: require('../../../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    
    return (
            <LinearGradient colors={['#cce6ff', '#fff','#e3e3e3', '#fff', '#ffcccc']} style={styles.card}>
            <Text style={[styles.textName]}>{data.username}</Text>
            <Text style={styles.textDesc}>{data.description}</Text>
            <InnerCard user={data} visualArtist={visualArtist} visualSong={visualSong} setVisualArtist={setVisualArtist} setVisualSong={setVisualSong} />
            <View style={{ width: '100%', height: '8%' }}>
            </View>
            </LinearGradient>
    );
}

export default CardMatch

const styles = StyleSheet.create({
    card: {
        width: 360,
        bottom: '-10%',
        height: '90%',
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 14
    },
    textName: {
        fontSize: 36,
        marginRight: "auto",
        marginLeft: 20,
        marginTop: 10,
        fontFamily: 'QuicksandRegular',
    },
    textDesc: {
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 20,
        textAlign: "justify",
        overflow: "hidden",
        fontFamily: 'Quicksand',
    }
})