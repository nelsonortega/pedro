import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import * as AuthActions from '../store/actions/AuthActions'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, Button, Alert, AsyncStorage } from 'react-native'

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
      <CustomText>ProfileScreen</CustomText>
      <Button title={'Salir'} onPress={logout}/>
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
  }
}) 

export default ProfileScreen