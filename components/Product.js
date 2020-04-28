import React from 'react'
import CustomText from './CustomText'

import { StyleSheet, View, TouchableNativeFeedback, Image } from 'react-native'

const Product = props => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.productContainer}>
        <Image 
          style={styles.imageStyle}
          source={{uri: props.productItem.item.img}}
        />
        <View style={styles.lineSeparator} />
        <View>
          <CustomText bold style={styles.title}>{props.productItem.item.title}</CustomText>
          <CustomText numberOfLines={2} style={styles.description}>{props.productItem.item.description}</CustomText>
          {props.productItem.item.price === '0' ?
            <CustomText bold style={styles.free}>Gratis</CustomText> :
            <CustomText bold style={styles.price}>₡{props.productItem.item.price}</CustomText> 
          }
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 20,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  lineSeparator: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    opacity: 0.5
  },
  imageStyle: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    height: 170
  },
  title: {
    marginTop: 10,
    marginHorizontal: 15,
    fontSize: 20
  },
  description: {
    marginHorizontal: 15,
    fontSize: 14,
    color: 'grey'
  },
  price: {
    marginRight: 30,
    marginVertical: 20,
    fontSize: 13,
    textAlign: 'right'
  },
  free: {
    marginRight: 30,
    marginVertical: 20,
    fontSize: 13,
    textAlign: 'right',
    color: 'green'
  }
})

export default Product