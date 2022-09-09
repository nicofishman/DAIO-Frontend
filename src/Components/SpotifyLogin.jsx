import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const SpotifyLogin = ({ title, fnOnPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                // disabled={!request}
                title={title}
                onPress={() => {
                    fnOnPress();
                }}
            >
                <Icon name="spotify" style={styles.icon} />
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SpotifyLogin;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1db954',
        width: 180,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        marginVertical: 10
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        marginRight: 10
    }
});
