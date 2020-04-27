import Product from '../../models/product'

import { createDocument, getAllDocuments } from './FirestoreActions'
import { productCollection } from '../../constants/FirestoreCollections'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const SET_PRODUTS = 'SET_PRODUTS'

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const loadedProducts = []
      const responseData = await getAllDocuments(productCollection)

      responseData.forEach(product => {
        loadedProducts.push(new Product(
          product.id,
          product.title,
          product.description,
          product.category,
          product.price,
          product.img
        ))
      })

      dispatch ({ type: SET_PRODUTS, products: loadedProducts })
    } catch (error) {
      throw error
    }
  }
}

export const createProduct = (title, description, category, price, img) => {
  return async dispatch => {
    let newProduct = {
      "title": title, 
      "description": description, 
      "category": category, 
      "price": price, 
      "img": img
    }

    const response = await createDocument(productCollection, newProduct)

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        response,
        title,
        description,
        category,
        price,
        img
      }
    })
  }
}
