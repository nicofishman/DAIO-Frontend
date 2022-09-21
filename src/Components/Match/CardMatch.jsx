import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';

import InnerCard from './CardMatch/InnerCard';

const CardMatch = ({ data, visualArtist, visualSong, setVisualArtist, setVisualSong }) => {
    const [loaded] = useFonts({
        Quicksand_400Regular,
        Quicksand_700Bold
    });

    if (!loaded) {
        return null;
    }

    return loaded && (
        <LinearGradient colors={['#cce6ff', '#fff', '#e3e3e3', '#fff', '#ffcccc']} style={styles.card}>
            <Text style={[styles.textName]}>{data.username}</Text>
            <Text style={styles.textDesc}>{data.description}</Text>
            <InnerCard setVisualArtist={setVisualArtist} setVisualSong={setVisualSong} user={data} visualArtist={visualArtist} visualSong={visualSong} />
            <View style={{ width: '100%', height: '8%' }} />
        </LinearGradient>
    );
};

export default CardMatch;

const styles = StyleSheet.create({
    card: {
        width: 360,
        bottom: '-10%',
        height: '90%',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 14
    },
    textName: {
        fontSize: 36,
        marginRight: 'auto',
        marginLeft: 20,
        marginTop: 10,
        fontFamily: 'Quicksand_400Regular'
    },
    textDesc: {
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'justify',
        overflow: 'hidden',
        fontFamily: 'Quicksand_700Bold'
    }
});
