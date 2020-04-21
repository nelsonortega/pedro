import React from 'react'
import Colors from '../constants/Colors'

import { StyleSheet, TextInput } from 'react-native'

const CustomInput = props => {
  return (
    <TextInput {...props} style={styles.input} secureTextEntry={props.password} />
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    width: '90%',
    fontSize: 17,
    borderRadius: 7,
    marginBottom: 20,
    fontFamily: 'open-sans',
    backgroundColor: Colors.secondary
  }
})

export default CustomInput