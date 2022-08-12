import { StyleSheet, Text, View, Linking, Alert, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Avatar from '../Common/Avatar'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Interaction = ({ item }) => {
    const SendIntentButton = ({ action, extras, children }) => {
        const instagramUrl = `instagram://user?username=${action}`
        const handlePress = useCallback(async () => {
            Linking.openURL(instagramUrl)
                .catch(() => Linking.openURL('https://www.instagram.com/' + action))
            // const isOpenable = await Linking.canOpenURL(instagramUrl);
            // if (isOpenable) {
            //     await Linking.openURL(instagramUrl);
            // } else {
            //     console.log('Don\'t know how to open URI: ' + instagramUrl);
            //     Alert.alert('No se pudo abrir el enlace');
            // }
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
                <Avatar width={45} height={45} id={item.interactedWith.avatarId} />
                <Text style={styles.text}>{item.interactedWith.username}</Text>
            </View>
            {
                item.isMatch &&
                <SendIntentButton action={item.interactedWith.instagram}>
                    <View style={styles.instagram}>
                        <AntDesign name="instagram" size={30} color="black" />
                        <Text numberOfLines={1} style={{ paddingHorizontal: 10, marginRight: 8 }}>@{item.interactedWith.instagram}</Text>
                    </View>
                </SendIntentButton>

            }
        </View>
    )
}

export default Interaction

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    },
    info: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        // backgroundColor: 'red',
        width: '60%',
    },
    instagram: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingHorizontal: 10,
        height: '85%',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25,
    }
})