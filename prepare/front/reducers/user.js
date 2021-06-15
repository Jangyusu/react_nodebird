export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
}

export const loginAction = data => {
  return (dispatch, getState) => {
    const state = getState()

    dispatch(loginRequestAction())
    axios
      .post('/api/login')
      .then(res => {
        dispatch(loginSuccesstAction(res.data))
      })
      .catch(err => {
        dispatch(loginFailAction(err))
      })
  }
}

export const loginRequestAction = data => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const loginSuccesstAction = data => {
  return {
    type: 'LOG_SUCCESS',
    data,
  }
}

export const loginFailAction = data => {
  return {
    type: 'LOG_FAIL',
    data,
  }
}

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT',
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      }
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      }
    default:
      return state
  }
}

export default reducer
