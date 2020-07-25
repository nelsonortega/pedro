import { CREATE_ORDER, FINISH_ORDER, SET_ORDERS } from "../actions/OrderActions"

const initialState = {
  orders: [],
  orderCreated: false
}

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    case CREATE_ORDER:
      return {
        ...state,
        orderCreated: true
      }
    case FINISH_ORDER:
      return {
        ...state,
        orderCreated: false
      }
  }
  return state
}

export default OrderReducer