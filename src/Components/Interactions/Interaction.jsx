import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Avatar from '../Common/Avatar'

const Interaction = ({ item }) => {
    return (
        <View style={styles.row}>
            <Avatar width={45} height={45} id={item.interactedWith.avatarId} />
            <Text>{item.interactedWith.username}</Text>
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
    }
})