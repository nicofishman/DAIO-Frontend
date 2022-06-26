import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'
import { useRegisterContext } from '../Context/RegisterContext';
import ButtonContinue from '../Components/Common/ButtonContinue';


const RegisterDescription = ({ navigation }) => {
    const { descripcion, handleChangeDesc, charsLeft } = useRegisterContext();
  
    return (
    <View>
        <View style={styles.inputAll}>
            <Text style={styles.textTitle}>Descripcion</Text>
            <TextInput
                style={[styles.input, styles.inputDesc, descripcion.length <= 0 && styles.inputRed]}
                placeholder={'"Mido un metro ochenta y uno..."'}
                onChangeText={handleChangeDesc}
                value={descripcion}
                multiline={true}
                numberOfLines={8}
            />
            </View>
            {
                descripcion.length <= 0 &&
                <Text style={styles.error}>El campo no puede estar vacío</Text>
            }
            <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default RegisterDescription

const styles = StyleSheet.create({})