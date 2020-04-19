import React from 'react'
import CustomText from '../components/CustomText'

import { View, StyleSheet } from 'react-native'

const CartScreen = props => {
  return (
    <View style={styles.screen}>
      <CustomText>CartScreen</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
}) 

export default CartScreen