import axios from 'axios'
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects'

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

function loadPostsAPI() {
  return axios.get('/posts')
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    })
  }
}

function addPostAPI(data) {
  return axios.post('/post', { content: data }) // POST /post
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function removePostAPI(data) {
  return axios.post('/api/post', data)
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data)
    yield delay(500)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data) // POST /post/postId/comment
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ])
}
