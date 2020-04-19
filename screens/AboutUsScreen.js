import React from 'react'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'

import { View, StyleSheet } from 'react-native'

const AboutUsScreen = props => {
  return (
    <View style={styles.screen}>
      <CustomText>AboutUsScreen</CustomText>
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
    justifyContent: 'center'
  }
}) 

export default AboutUsScreen