import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
  const { me } = useSelector(state => state.user)

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
