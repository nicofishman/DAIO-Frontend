import { StyleSheet, Text, View, Linking, Alert, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import Avatar from '../Common/Avatar'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Interaction = ({ item }) => {
    const SendIntentButton = ({ action, extras, children }) => {
        const instagramUrl = `https://www.instagram.com/${action}`
        const handlePress = useCallback(async () => {
            const isOpenable = await Linking.canOpenURL(instagramUrl);
            if (isOpenable) {
                await Linking.openURL(instagramUrl);
            } else {
                console.log('Don\'t know how to open URI: ' + instagramUrl);
                Alert.alert('No se pudo abrir el enlace');
            }
        }, [instagramUrl]);
        return (
            <TouchableWithoutFeedback onPress={handlePress}>
                {children}
            </TouchableWithoutFeedback>
        );
    };
    return (
        <View style={styles.row}>
            <View style={styles.info}>
                <Avatar width={45} height={45} id={item.interactedWith.avatarId} />
                <Text style={styles.text}>{item.interactedWith.username}</Text>
            </View>
            {
                item.decision ?
                    <View style={styles.yup}>
                        {
                            item.isMatch &&
                            <SendIntentButton action={item.interactedWith.instagram}>
                                <AntDesign name="instagram" size={30} color="black" />
                            </SendIntentButton>
                        }
                    </View>
                    : <View style={styles.nope} />
            }
        </View>
    )
}

export default Interaction

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    yup: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#69f079',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nope: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#f44336',
    }
})