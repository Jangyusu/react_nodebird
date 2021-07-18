import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router'
import { END } from 'redux-saga'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import wrapper from '../store/configureStore'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'
import { loadFollowers, loadFollowings, loadMyInfo } from '../reducers/user'

const Profile = () => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadFollowers())
    dispatch(loadFollowings())
  }, [])

  useEffect(() => {
    if (!me?.id) {
      Router.push('/')
    }
  }, [me?.id])

  if (!me) {
    return null
  } else {
    return (
      <>
        <Head>
          <title>내 프로필 | NodeBird</title>
        </Head>
        <AppLayout>
          <NicknameEditForm />
          <FollowList header="팔로잉" data={me.Followings} />
          <FollowList header="팔로워" data={me.Followers} />
        </AppLayout>
      </>
    )
  }
}

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : ''
  /**
   * 프론트 서버에서 쿠키를 공유해버리는 이슈가 생길 수 있으니 반드시 Cookie 초기화
   */
  axios.defaults.headers.Cookie = ''
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  context.store.dispatch(loadMyInfo())

  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

export default Profile
