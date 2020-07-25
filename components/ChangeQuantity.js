import React from 'react'
import CustomText from './CustomText'
import Colors from '../constants/Colors'

import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

const ChangeQuantity = props => {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.modal}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={props.lessQuantity}>
            <CustomText style={styles.minusIcon}>-</CustomText>
          </TouchableOpacity>
          <CustomText bold style={styles.quantityText}>{props.quantity}</CustomText>
          <TouchableOpacity style={styles.circleButton} onPress={props.moreQuantity}>
            <Ionicons size={30} color='white' name='md-add'/>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={props.addItemToCart}>
            <CustomText style={styles.buttonText}>Agregar</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={props.closeModal}>
            <CustomText style={styles.buttonText}>Cancelar</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modal: {
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center',
    backgroundColor: 'white', 
    justifyContent: 'center'
  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  circleButton: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.primary
  },
  minusIcon: {
    fontSize: 50,
    color: 'white',
    marginBottom: 10
  },
  quantityText: {
    fontSize: 20, 
    marginHorizontal: 20
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center', 
    flexDirection: 'row'
  },
  button: {
    height: 50,
    width: 140, 
    borderRadius: 5, 
    marginHorizontal: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.primary
  },
  buttonText: {
    fontSize: 15, 
    color: 'white',
    marginHorizontal: 20,
  }
})

export default ChangeQuantity