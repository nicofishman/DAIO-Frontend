import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'

const ButtonBack = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <Ionicons style={[styles.textButton]} name="chevron-back" />
    </TouchableWithoutFeedback>
  );
};

export default ButtonBack;

const styles = StyleSheet.create({
    textButton: {
        flex: 1,
        fontSize: 40,
        color: "#bdbdbd",
        //fontFamily: 'AverageSans_400Regular',
        textAlign: "center",
        textAlignVertical: "center",
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    }
});