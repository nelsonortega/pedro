import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import * as AuthActions from '../store/actions/AuthActions'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native'

const ProfileScreen = props => {
  const dispatch = useDispatch()

  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      props.navigation.navigate('Auth')
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      props.navigation.navigate('Auth')
      return
    }
  }

  useEffect(() => {
    tryLogin()
  }, [])

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', tryLogin)

    return () => {
      willFocus.remove()
    }
  }, [tryLogin])

  const logout = () => {
    Alert.alert(
      'Atención',
      'Desea cerrar su sesión?',
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => {
          dispatch(AuthActions.logout())
          props.navigation.navigate('Auth')
        } }
      ]
    )
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
        <View style={styles.button}>
          <CustomText style={styles.buttonText}>Cerrar Sesión</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

ProfileScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  buttonContainer: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '90%',
    height: '60%',
    borderRadius: 7,
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
}) 

export default ProfileScreen