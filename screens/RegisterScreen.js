import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import * as AuthActions from '../store/actions/AuthActions'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'

const RegisterScreen = props => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPasswprd] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const register = () => {
    dispatch(AuthActions.register(email, password))
  }

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={30} style={styles.screen}>
      <CustomText bold style={styles.title}>Regístrate</CustomText>
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Correo electrónico' 
          value={email} 
          onChangeText={text => setEmail(text)}
        />
        <TextInput 
          secureTextEntry={true} 
          style={[styles.input, styles.inputPass]} 
          placeholder='Contraseña' 
          value={password} 
          onChangeText={text => setPasswprd(text)}
        />
        <TextInput 
          secureTextEntry={true} 
          style={[styles.input, styles.inputPass]} 
          placeholder='Repetir contraseña' 
          value={confirmPassword} 
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.loginContainer} onPress={register}>
          <View style={styles.loginButton}>
            <CustomText style={styles.buttonText}>Registrarme</CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 19,
    marginLeft: 20,
    marginVertical: 20
  },
  formContainer: {
    alignItems: 'center'
  },
  input: {
    width: '90%',
    fontSize: 17,
    fontFamily: 'open-sans',
    borderBottomWidth: 2,
    borderColor: 'black',
    paddingTop: 20,
    paddingBottom: 5
  },
  inputPass: {
    marginTop: 20
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center'
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 50,
    width: '90%',
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    paddingVertical: 20,
    textAlign: 'center'
  }
}) 

export default RegisterScreen