import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RegisterDescription = () => {
    const { descripcion, handleChangeDesc, charsLeft } = useRegisterContext();
  
    return (
    <View>
      <Text>RegisterDescription</Text>
    </View>
  )
}

export default RegisterDescription

const styles = StyleSheet.create({})