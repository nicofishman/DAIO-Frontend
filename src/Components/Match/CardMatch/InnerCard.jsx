import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import FlipCard from 'react-native-flip-card'
import Front from './Front'
import Back from './Back'

const InnerCard = ({ user, visualArtist, visualSong, setVisualArtist, setVisualSong }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <FlipCard
            flipHorizontal={true}
            flipVertical={false}
            style={[styles.cardMusic]}
            clickable={false}
            flip={isFlipped}
        >
            <ImageBackground
                source={require('../../../Assets/Match/matchBackground1.png')}
                resizeMode='cover'
                style={[{ height: '100%' }]}
            >
                <Front canciones={user.canciones} isFlipped={isFlipped} setIsFlipped={setIsFlipped} visualSong={visualSong} setVisualSong={setVisualSong} />
            </ImageBackground>
            <ImageBackground
                source={require('../../../Assets/Match/matchBackground2.png')}
                resizeMode='cover'
                style={{ width: '100%', height: '100%', overflow: 'hidden', opacity: 1 }}>
                <Back artistas={user.artistas} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
            </ImageBackground>
        </FlipCard >
    )
}

export default InnerCard

const styles = StyleSheet.create({
    cardMusic: {
        flex: 1,
        borderRadius: 10,
        width: 334,
        backgroundColor: "#fcfcfc",
    },
})