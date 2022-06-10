import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import ButtonContinue from '../pochi/ButtonContinue'

const Pochi = ({navigation}) => {
    return (
        <View style={styles.loading}>
            {/* <ButtonContinue
                onPress={()=>navigation.navigate("Match")}
            ></ButtonContinue>
            <Text>as</Text> */}
            <Button
                onPress={()=>navigation.navigate("Loading")}
                title="Loading"
            ></Button>
        </View>
    )
}

export default Pochi

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
