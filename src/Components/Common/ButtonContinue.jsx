import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native'

const ButtonContinue = ({ onPress }) => {
    const [animationBackground, setAnimationBackground] = useState(new Animated.Value(0))
    const [animationTextColor, setAnimationColorText] = useState(new Animated.Value(0))

    const handleAnimationIn = () => {
        Animated.timing(animationBackground, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start()
        Animated.timing(animationTextColor, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start()
    }
    const handleAnimationOut = () => {
        Animated.timing(animationBackground, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start()
        Animated.timing(animationTextColor, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false
        }).start()
    }
    const boxInterpolation = animationBackground.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255, 255, 255)", "rgb(94, 157, 181)"]
    })
    const boxInterpolationText = animationBackground.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
    })

    const animatedStyle = {
        backgroundColor: boxInterpolation,
        color: boxInterpolationText
    };
    return (
        <View style={{ flex: 1, position: 'absolute', bottom: 30 }} >
            <TouchableWithoutFeedback
                onPressIn={handleAnimationIn}
                onPressOut={handleAnimationOut}
                onPress={onPress}
            >
                <Animated.Text useNativeDriver style={[styles.textButton, animatedStyle,]}>CONTINUAR</Animated.Text>
            </TouchableWithoutFeedback>
        </View>
    );
}


export default ButtonContinue

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    textButton: {
        flex: 1,
        fontSize: 22,
        color: "#000",
        //fontFamily: 'AverageSans_400Regular',
        letterSpacing: 0,
        textAlign: "center",
        textAlignVertical: "center",
        borderColor: '#5E9DB5',
        borderWidth: 3,
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 50,
    }
    // buttonContinue: {
    //     width: windowWidth/1.5,
    //     height: windowHeight/15,
    //     borderRadius: 38,
    //     borderColor: "#5E9DB5",
    //     borderWidth: 3
    // },
})