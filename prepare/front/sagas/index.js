import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

import postSaga from './post'
import userSaga from './user'

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true // saga에서 보내는 axios 요청, backend에 쿠기를 전달하기 위해 withCredentials = true

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)])
}
