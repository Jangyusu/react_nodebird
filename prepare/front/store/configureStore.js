import { createWrapper } from 'next-redux-wrapper'
import { compose, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import rootSaga from '../sagas'

const loggerMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    console.log(action)
    return next(action)
  }

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, loggerMiddleware]
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares))
  const stroe = createStore(reducer, enhancer)
  stroe.sagaTask = sagaMiddleware.run(rootSaga)
  return stroe
}

const wrapper = createWrapper(configureStore, {
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
})

export default wrapper
