import Order from '../../models/order'

import { createDocument, getAllDocuments } from './FirestoreActions'
import { orderCollection } from '../../constants/FirestoreCollections'

export const CREATE_ORDER = 'CREATE_ORDER'
export const FINISH_ORDER = 'FINISH_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const loadedOrders = []
      const responseData = await getAllDocuments(orderCollection)

      responseData.forEach(order => {
        loadedOrders.push(new Order(
          order.id,
          order.products,
          order.clientData,
          order.state
        ))
      })

      dispatch ({ type: SET_ORDERS, orders: loadedOrders })
    } catch (error) {
      throw error
    }
  }
}

export const createOrder = (cart, name, phone, express, direction, notes) => {
  return async dispatch => {
    let cartData = cart.map(item => ({
      id: item.id,
      img: item.img,
      price: item.price,
      quantity: item.quantity,
      title: item.title
    }))

    let newOrder = {
      "products": cartData, 
      "clientData": {name, phone, direction, express, notes}, 
      "state": 1
    }

    await createDocument(orderCollection, newOrder)

    dispatch ({ type: CREATE_ORDER })
  }
}

export const finishOrder = () => {
  return async dispatch => {
    dispatch ({ type: FINISH_ORDER })
  }
}