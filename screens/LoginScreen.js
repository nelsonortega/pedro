import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import * as AuthActions from '../store/actions/AuthActions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native'

const LoginScreen = props => {
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const [email, setEmail] = useState('')
  const [password, setPasswprd] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)

  const openRegisterScreen = () => {
    props.navigation.navigate({
      routeName: 'Register'
    })
  }

  const tryLogin = async () => {
    setLoginLoading(true)
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      setLoginLoading(false)
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      setLoginLoading(false)
      return
    }

    props.navigation.navigate(props.navigation.state.params.route)
    dispatch(AuthActions.authenticate(userId, token))
  }

  useEffect(() => {
    tryLogin()
  }, [dispatch])

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', tryLogin)

    return () => {
      willFocus.remove()
    }
  }, [tryLogin])

  useEffect(() => {
    if (error) {
      Alert.alert('Ocurrió un error', error, [{text: 'Ok'}])
    }
  }, [error])

  const login = async () => {
    setLoading(true)
    setError(null)
    try {
      await dispatch(AuthActions.login(email, password))
      props.navigation.navigate(props.navigation.state.params.route)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (loginLoading)
    return <CustomActivityIndicator />

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={30} style={styles.screen}>
      <CustomText bold style={styles.title}>Inicia sesión</CustomText>
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
        {loading ? <CustomActivityIndicator small /> : (
          <View style={styles.loginContainer}> 
            <TouchableOpacity style={styles.loginContainer} onPress={login}>
              <View style={styles.loginButton}>
                <CustomText style={styles.buttonText}>Iniciar Sesión</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerContainer} onPress={openRegisterScreen}>
              <CustomText>No tienes una cuenta?</CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View> 
    </KeyboardAvoidingView>
  )
}

LoginScreen.navigationOptions = navData => {
  if (navData.navigation.state.params.hideIcon) {
    return {
      headerLeft: () => <HeaderIcon back navData={navData} iconName={'md-arrow-back'}/>
    }
  } else {
    return {
      headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>
    }
  }
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
  },
  registerContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center'
  }
}) 

export default LoginScreen