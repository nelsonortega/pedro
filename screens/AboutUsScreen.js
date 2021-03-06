import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'

import { View, StyleSheet, Image } from 'react-native'

const AboutUsScreen = props => {
  return (
    <View style={styles.screen}>
      <Image source={require('../assets/about_us.jpg')} style={styles.icon}/>
      <CustomText bold style={styles.title}>La Despencita</CustomText>
      <CustomText style={styles.description}>Somos un negocio familiar con más de 60 años de estar brindándole a las familias facilidad, innovación y amistad. Queremos solucionar su día a día con nuestros productos y servicios.</CustomText>
    </View>
  )
}

AboutUsScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: '100%',
    height: 200
  },
  title:{
    fontSize: 17,
    marginTop: 30
  },
  description:{
    textAlign: 'justify',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10
  }
}) 

export default AboutUsScreen