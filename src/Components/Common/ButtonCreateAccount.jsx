import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React from "react";
import { useFonts } from 'expo-font';

const ButtonCreateAccount = ({ onPress }) => {
  const [loaded] = useFonts({
    QuicksandBold: require('../../../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
  });

  if (!loaded) {
      return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <Text style={styles.textButton}> CREAR CUENTA</Text>
    </TouchableWithoutFeedback>
  );
};

export default ButtonCreateAccount;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    textButton: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
        textAlignVertical: "center",
        width:windowWidth * 0.75,
        height: 50,
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#f28384',
        fontFamily: 'QuicksandBold',
    }
});