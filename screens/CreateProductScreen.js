import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import CustomInput from '../components/CustomInput'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native'

const CreateProductScreen = props => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
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
      <CustomText style={styles.text}>Publicar un producto</CustomText>
      <View style={styles.center}>
        <CustomInput 
          placeholder='Título del producto' 
          placeholderTextColor="grey" 
          value={title} 
          onChangeText={text => setTitle(text)}
        />
        <CustomInput 
          placeholder='Descripción del producto' 
          placeholderTextColor="grey" 
          value={description} 
          onChangeText={text => setDescription(text)}
        />
        <CustomInput 
          placeholder='Categoría' 
          placeholderTextColor="grey" 
          value={category} 
          onChangeText={text => setCategory(text)}
        />
        <CustomInput 
          placeholder='Precio' 
          placeholderTextColor="grey" 
          value={price} 
          onChangeText={text => setPrice(text)}
        />
      </View>
      <CustomText style={styles.text}>Añade una imagen</CustomText>
      <TouchableOpacity>
        <View style={styles.addImageButton}>
          <Ionicons size={35} color='grey' name='md-add' />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomText style={styles.buttonText}>Crear Producto</CustomText>
        </View>
      </TouchableOpacity>
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
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  center: {
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    marginLeft: '5%',
    marginBottom: 10
  },
  addImageButton: {
    height: 120,
    width: '90%',
    borderRadius: 7,
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '90%',
    borderRadius: 7,
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10
  }
}) 

export default CreateProductScreen