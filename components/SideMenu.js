import React from 'react'

import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { StyleSheet, View, ScrollView, Image } from 'react-native'

const SideMenu = props => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <View style={styles.container}>
          <Image source={require('../assets/icon.png')} style={styles.icon} />
        </View>
        <DrawerNavigatorItems {...props}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    height: 190,
    marginTop: 30,
    paddingLeft: 10,
    borderRadius: 7,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 140,
    height: 140
  }
}) 

export default SideMenu