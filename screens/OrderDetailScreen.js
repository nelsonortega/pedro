import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import * as OrderActions from '../store/actions/OrderActions'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Picker } from 'react-native'

const OrderDetailScreen = props => {
  const dispatch = useDispatch()
  
  const { order } = props.navigation.state.params
  const [orderState, setOrderState] = useState(order.state)
  const orderStates = useSelector(state => state.data.states)

  const pickerList = orderStates.map(state =>
    <Picker.Item label={state.name} value={state.id} key={state.id}/>
  )

  const handleStateChange = itemValue => {
    setOrderState(itemValue)
    dispatch(OrderActions.updateOrderState(order, itemValue))
  }

  return (
    <View style={styles.screen}>
      <CustomText bold style={styles.title}>Detalle de la orden</CustomText>
      <CustomText bold style={styles.title}>{order.clientData.name}</CustomText>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={orderState}
          onValueChange={handleStateChange}
        >
          {pickerList}
        </Picker>
      </View>
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
  },
  pickerContainer: {
    height: 60,
    paddingLeft: 10,
    borderRadius: 7,
    width: '90%',
    backgroundColor: Colors.secondary,
    marginBottom: 20
  },
  picker: {
    height: 60,
    color: 'grey'
  }
}) 

export default OrderDetailScreen