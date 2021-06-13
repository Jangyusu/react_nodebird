import { createWrapper } from 'next-redux-wrapper'
import { compose, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '../reducers'

const configureStore = () => {
  const middlewares = []
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares))
  const stroe = createStore(reducer, enhancer)
  return stroe
}

const wrapper = createWrapper(configureStore, {
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
})

export default wrapper
