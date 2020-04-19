import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'

const HeaderIcon = props => {
  const toggleDrawer = () => {
    props.navData.navigation.toggleDrawer()
  }

  const openCart = () => {
    props.navData.navigation.navigate('Cart')
  }

  return (
    <TouchableOpacity style={styles.icon} onPress={props.cart ? openCart : toggleDrawer}>
      <Ionicons 
        size={30} 
        color='white' 
        name={props.iconName} 
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 15
  }
})

export default HeaderIcon