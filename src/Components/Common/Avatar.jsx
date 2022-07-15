import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'

const Avatar = ({ id, width, height }) => {
    function showIconSelected() {
        switch (parseInt(id)) {
            case -1:
                return <Image source={require('../../Assets/Avatars/Default.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 0:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar1.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 1:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar2.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 2:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar3.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 3:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar4.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 4:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar5.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 5:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar6.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 6:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar7.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 7:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar8.png')} style={[styles.avatar, { width: width, height: height }]} />
            case 8:
                return <Image source={require('../../Assets/Avatars/AvatarsToChoose/avatar9.png')} style={[styles.avatar, { width: width, height: height }]} />
            default:
                return <Image source={require('../../Assets/Avatars/Default.png')} style={[styles.avatar, { width: width, height: height }]} />
        }
    }
    return (
        <View style={{ width: width, height: height }}>
            {showIconSelected()}
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
    },
    avatar: {
        borderRadius: 80,
    },
})