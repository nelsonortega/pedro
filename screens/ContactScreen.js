import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'

import { View, StyleSheet } from 'react-native'
import { Image } from 'react-native'
const ContactScreen = props => {
  return (
    <View style={styles.screen}>
      <Image source={require('../assets/icon.png')} style={styles.icon}/>
      <CustomText bold>¿Necesitas ponerte en contacto?</CustomText>
      <CustomText></CustomText>
      <CustomText>Llámanos al 2234-1060</CustomText>
    </View>
  )
}

ContactScreen.navigationOptions = navData => {
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
  icon: {
    width: 200,
    height: 200
  }
}) 

export default ContactScreen