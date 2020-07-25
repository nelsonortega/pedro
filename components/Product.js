import React from 'react'
import CustomText from './CustomText'
import Colors from '../constants/Colors'
import ChangeQuantity from './ChangeQuantity'
import * as ProductActions from '../store/actions/ProductActions'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity, Image, Modal } from 'react-native'

const Product = props => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)

  const addItemToCart = () => {
    dispatch(ProductActions.addItemToCart(
      props.productItem.item.id, 
      props.productItem.item.title, 
      quantity, 
      props.productItem.item.price, 
      props.productItem.item.img
    ))
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const moreQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity+1)
    }
  }

  const lessQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity-1)
    }
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <Ionicons size={30} color='white' name='md-add' style={styles.icon}/>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ChangeQuantity
          lessQuantity={lessQuantity}
          moreQuantity={moreQuantity}
          closeModal={closeModal}
          quantity={quantity}
          addItemToCart={addItemToCart}
        />
      </Modal>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    width: '97%'
  },
  productContainer: {
    flex: 1,
    margin: 20,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: 'grey',
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
  },
  floatingButton: {
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  }
})

export default Product