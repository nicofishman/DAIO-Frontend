import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Pochi = ({ navigation }) => {
    return (
        <View style={styles.loading}>
            <Button
                title="Loading"
                onPress={() => navigation.navigate('Main', { screen: 'Loading' })}
            />
        </View>
    );
};

export default Pochi;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
