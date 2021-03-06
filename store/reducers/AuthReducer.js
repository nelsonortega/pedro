import { AUTHENTICATE, LOGOUT } from "../actions/AuthActions"

const initialState = {
  token: null,
  userId: null,
  isUserAdmin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        isUserAdmin: action.isUserAdmin
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}