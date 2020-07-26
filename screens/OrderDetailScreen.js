import React from 'react'
import CustomText from '../components/CustomText'

import { View, StyleSheet } from 'react-native'

const OrderDetailScreen = props => {
  const { order } = props.navigation.state.params

  return (
    <View style={styles.screen}>
      <CustomText bold style={styles.title}>Detalle de la orden</CustomText>
      <CustomText bold style={styles.title}>{order.clientData.name}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    marginVertical: 15
  }
}) 

export default OrderDetailScreen