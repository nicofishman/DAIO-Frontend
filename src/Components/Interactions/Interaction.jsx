import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Avatar from '../Common/Avatar'

const Interaction = ({ item }) => {
    return (
        <View style={styles.row}>
            <View style={styles.info}>
                <Avatar width={45} height={45} id={item.interactedWith.avatarId} />
                <Text style={styles.text}>{item.interactedWith.username}</Text>
            </View>
            {
                item.isMatch ?
                    <View style={styles.match} />
                    : <View style={styles.noMatch} />
            }
            {
                item.decision ? <View style={styles.yup} /> : <View style={styles.nope} />
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
    },
    nope: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#f44336',
    }
})