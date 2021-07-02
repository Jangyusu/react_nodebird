import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'

import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { loadFollowers, loadFollowings } from '../reducers/user'

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

export default Profile
