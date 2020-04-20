import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import { useState, useEffect } from 'react'
import { View, StyleSheet, Button, AsyncStorage } from 'react-native'

const HomeScreen = props => {
  const [route, setRoute] = useState('Login')
  const [loginLoading, setLoginLoading] = useState(false)

  const tryLogin = async () => {
    setLoginLoading(true)
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      setRoute('Login')
      setLoginLoading(false)
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      setRoute('Login')
      setLoginLoading(false)
      return
    }

    setRoute('CreateProduct')
    setLoginLoading(false)
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

  const createProduct = () => {
    props.navigation.navigate(route, {
      'route': 'CreateProduct', 
      'hideIcon': true
    })
  }

  if (loginLoading)
    return <CustomActivityIndicator />

  return (
    <View style={styles.screen}>
      <CustomText>Home</CustomText>
      <Button title={'Crear Producto'} onPress={createProduct}/>
    </View>
  )
}

HomeScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>,
    headerRight: () => <HeaderIcon cart navData={navData} iconName={'md-cart'}/>
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

export default HomeScreen