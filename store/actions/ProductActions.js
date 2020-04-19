import Product from '../../models/product'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const SET_PRODUTS = 'SET_PRODUTS'

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch('')

      if (!response.ok) {
        throw new Error('Algo salió mal')
      }
    
      const responseData = await response.json()
      const loadedProducts = []

      for (const key in responseData) {
        loadedProducts.push(new Product(
          responseData[key].id,
          responseData[key].title,
          responseData[key].description,
          responseData[key].category,
          responseData[key].price,
          responseData[key].img
        ))
      }

      dispatch ({ type: SET_PRODUTS, products: loadedProducts })
    } catch (error) {
      throw error
    }
  }
}

export const createPost = (title, description, category, price, img) => {
  return async dispatch => {
    const response = await fetch('', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'title': title,
        'description': description,
        'category': category,
        'price': price,
        'img': img
      })
    })
    
    const responseData = await response.json()
    const id = responseData.id

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id,
        title,
        description,
        category,
        price,
        imgs
      }
    })
  }
}
