import { StyleSheet, Text, View, Linking, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Avatar from '../Common/Avatar';

const Interaction = ({ item }) => {
    const SendIntentButton = ({ action, children }) => {
        const instagramUrl = `instagram://user?username=${action}`;
        const handlePress = useCallback(async () => {
            Linking.openURL(instagramUrl)
                .catch(() => Linking.openURL('https://www.instagram.com/' + action));
        }, [instagramUrl]);

        return (
            <TouchableWithoutFeedback onPress={handlePress}>
                {children}
            </TouchableWithoutFeedback>

        );
    };

    return item.decision && (
        <View style={styles.row}>
            <View style={styles.info}>
                <Avatar height={45} id={item.interactedWith.avatarId} width={45} />
                <Text style={styles.text}>{item.interactedWith.username}</Text>
            </View>
            {
                item.isMatch &&
                <SendIntentButton action={item.interactedWith.instagram}>
                    <View style={styles.instagram}>
                        <AntDesign color="black" name="instagram" size={30} />
                        <Text numberOfLines={1} style={{ paddingHorizontal: 10, marginRight: 8 }}>@{item.interactedWith.instagram}</Text>
                    </View>
                </SendIntentButton>

            }
        </View>
    );
};

export default Interaction;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 50,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 16,
        marginLeft: 10
    },
    info: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        // backgroundColor: 'red',
        width: '60%'
    },
    instagram: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingHorizontal: 10,
        height: '85%',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25
    }
});
