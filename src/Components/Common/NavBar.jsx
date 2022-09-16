import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import Svg, { Image } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const NavBar = (props) => {
    const { name: routeName } = useRoute();

    if (!props.navigation) return null;

    return (
        <LinearGradient colors={['#fafafa','#e3e3e3' ]} style={styles.navbar}>
                <TouchableOpacity style={styles.button}
                    onPress={() => props.navigation.navigate('Config')}
                >
                    <MaterialCommunityIcons name="account-circle" style={[styles.icon, routeName === 'Config' && styles.active]} /></TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => props.navigation.navigate('Match')}
                >
                    <Svg height={50} style={[styles.icon, styles.daioLogo]} width={50}>
                        <Image
                            height={50}
                            href={require('../../../assets/icon.png')}
                            style={[routeName === 'Match' && styles.active]}
                            width={50}
                        />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => props.navigation.navigate('Chat')}
                >
                    <Ionicons name="chatbubbles" style={[styles.icon, routeName === 'Chat' && styles.active]} />
                </TouchableOpacity>
        </LinearGradient>
    );
};

export default NavBar;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    navbar: {
        width: windowWidth,
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 50,
        color: '#aaa'
    },
    active: {
        color: '#888'
    },
    daioLogo: {
        // make saturation 0
        tintColor: 'gray'
    }

});
