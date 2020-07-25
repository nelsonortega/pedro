import React from 'react'
import CustomText from './CustomText'

import { useState, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'

const OrderItem = props => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let totalPrice = 0
    props.order.products.map(product => {
      totalPrice = totalPrice + (parseInt(product.price) * product.quantity)
    })
    setTotal(totalPrice)
  }, [])

  return (
    <View style={styles.orderContainer}>
      <Image 
        style={styles.productImage}
        source={{uri: props.order.products[0].img}}
      />
      <CustomText bold>{total}</CustomText>
      <CustomText bold>{props.order.clientData.express}</CustomText>
      <CustomText bold>{props.order.state}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  orderContainer: {
    height: 100,
    width: '90%',
    elevation: 7,
    display: 'flex',
    borderRadius: 10,
    marginLeft: '5%',
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  productImage: {
    width: 80,
    height: 80, 
    borderRadius: 7,
    marginHorizontal: 10
  }
})

export default OrderItem