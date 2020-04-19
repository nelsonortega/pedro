import Product from '../../models/product'

import { CREATE_PRODUCT, SET_PRODUTS } from '../actions/ProductActions'

const initialState = {
  products: []
}

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUTS:
      return {
        ...state,
        products: action.products
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.title,
        action.productData.description,
        action.productData.category,
        action.productData.price,
        action.productData.img
      )
      return {
        ...state,
        products: [newProduct].concat(state.products)
      }
  }
  return state
}

export default ProductReducer