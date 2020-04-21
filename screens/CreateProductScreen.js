import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import { useState, useEffect } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'

const CreateProductScreen = props => {
  const [loginLoading, setLoginLoading] = useState(false)

  const tryLogin = async () => {
    setLoginLoading(true)
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      setLoginLoading(false)
      props.navigation.navigate('Authentication', {
        'route': 'CreateProduct', 
        'hideIcon': true
      })
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      setLoginLoading(false)
      props.navigation.navigate('Authentication', {
        'route': 'CreateProduct', 
        'hideIcon': true
      })
      return
    }

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

  if (loginLoading)
    return <CustomActivityIndicator />

  return (
    <View style={styles.screen}>
      <CustomText>CreateProductScreen</CustomText>
    </View>
  )
}

CreateProductScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon back navData={navData} iconName={'md-arrow-back'}/>
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

export default CreateProductScreen