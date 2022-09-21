import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { Quicksand_700Bold, useFonts } from '@expo-google-fonts/quicksand';

const ButtonContinue = ({ onPress }) => {
    const [animationBackground, _setAnimationBackground] = useState(new Animated.Value(0));
    const [animationTextColor, _setAnimationColorText] = useState(new Animated.Value(0));

    const [loaded] = useFonts({
        Quicksand_700Bold
    });

    if (!loaded) {
        return null;
    }

    const handleAnimationIn = () => {
        Animated.timing(animationBackground, {
            toValue: 1,
            duration: 80,
            useNativeDriver: false
        }).start();
        Animated.timing(animationTextColor, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };
    const handleAnimationOut = () => {
        Animated.timing(animationBackground, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
        Animated.timing(animationTextColor, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    };
    const boxInterpolation = animationBackground.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(255, 255, 255)', 'rgb(94, 157, 181)']
    });
    const boxInterpolationText = animationBackground.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(94, 157, 181)', 'rgb(255, 255, 255)']
    });

    const animatedStyle = {
        backgroundColor: boxInterpolation,
        color: boxInterpolationText
    };

    return loaded && (
        <View style={{ position: 'absolute', bottom: 20 }} >
            <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={handleAnimationIn}
                onPressOut={handleAnimationOut}
            >
                <Animated.Text useNativeDriver style={[styles.textButton, animatedStyle]}>CONTINUAR</Animated.Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ButtonContinue;

const styles = StyleSheet.create({
    textButton: {
        flex: 1,
        fontSize: 22,
        fontFamily: 'Quicksand_700Bold',
        letterSpacing: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: '#5E9DB5',
        color: '#5E9DB5',
        borderWidth: 3,
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 50
    }
});
