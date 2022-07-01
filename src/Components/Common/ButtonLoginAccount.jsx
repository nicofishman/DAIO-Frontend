import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React from "react";

const ButtonLoginAccount = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <Text style={styles.textButton}>Iniciar Sesión</Text> 
        {/* Iniciar Sesión */}
    </TouchableWithoutFeedback>
  );
};

export default ButtonLoginAccount;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    textButton: {
        fontSize: 18,
        color: "#5E9DB5",
        textAlign: "center",
        textAlignVertical: "center",
        width:windowWidth * 0.75,
        height: 50,
        borderRadius: 30,
        borderColor: '#5E9DB5',
        borderWidth: 2.3,
        
    }
});