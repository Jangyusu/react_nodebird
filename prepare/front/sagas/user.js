import axios from 'axios'
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects'
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from '../reducers/user'

function logInAPI(data) {
  return axios.post('/user/login', data)
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutAPI() {
  return axios.post('/user/logout')
}

function* logOut() {
  try {
    const result = yield call(logOutAPI)
    console.log(result)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function signUpAPI(data) {
  return axios.post('/user', data)
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    console.log(result)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function followAPI() {
  return axios.post('/api/signup')
}

function* follow(action) {
  try {
    // const result = yield call(followAPI)
    yield delay(500)
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    })
  }
}

function unfollowAPI() {
  return axios.post('/api/signup')
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI)
    yield delay(500)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
  ])
}
