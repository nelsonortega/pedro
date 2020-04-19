import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'

import { View, StyleSheet } from 'react-native'

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <CustomText>Home</CustomText>
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