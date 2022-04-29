import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Svg, { Image } from 'react-native-svg';

const NavBar = ({ navigation, route }) => {
    const { name: routeName } = useRoute();
    console.log(routeName);
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Config')}
            ><MaterialCommunityIcons style={[styles.icon, routeName === 'Config' && styles.active]} name="account-circle" /></TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                {/* <MaterialCommunityIcons style={[styles.icon, routeName === 'Home' && styles.active]} name="home" /> */}
                <Svg width={50} height={50} style={[styles.icon, styles.daioLogo]}>
                    <Image
                        href={require('../Assets/logo.png')}
                        width={50}
                        height={50}
                        style={[routeName === 'Home' && styles.active]}
                    />
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Chat')}
            ><Ionicons style={[styles.icon, routeName === 'Chat' && styles.active]} name="chatbubbles" /></TouchableOpacity>
        </View>
    )
}

export default NavBar

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    navbar: {
        width: windowWidth,
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#f0f0aa',
        // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1
    },
    icon: {
        fontSize: 50,
        color: '#aaa'
    },
    active: {
        color: '#888'
    },
    daioLogo: {
        //make saturation 0
        tintColor: 'gray',
    }

})