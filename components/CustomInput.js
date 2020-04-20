import React from 'react'
import Colors from '../constants/Colors'

import { StyleSheet, TextInput } from 'react-native'

const CustomInput = props => {
  const inputStyle = props.password ? [styles.input, styles.inputPass] : [styles.input]

  return (
    <TextInput {...props} style={inputStyle} secureTextEntry={props.password} />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    fontSize: 17,
    borderRadius: 7,
    padding: 15,
    fontFamily: 'open-sans',
    backgroundColor: Colors.secondary
  },
  inputPass: {
    marginTop: 20
  }
})

export default CustomInput