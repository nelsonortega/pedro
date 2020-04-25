import Product from '../../models/product'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const SET_PRODUTS = 'SET_PRODUTS'

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://despensita-e856a.firebaseio.com/products.json')

      if (!response.ok) {
        throw new Error('Algo salió mal')
      }
    
      const responseData = await response.json()
      const loadedProducts = []

      for (const key in responseData) {
        loadedProducts.push(new Product(
          key,
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

export const createProduct = (title, description, category, price, img) => {
  return async dispatch => {
    const response = await fetch('https://despensita-e856a.firebaseio.com/products.json', {
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
    const id = responseData.name

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id,
        title,
        description,
        category,
        price,
        img
      }
    })
  }
}
