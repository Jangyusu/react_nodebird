import { useSelector } from 'react-redux'
import { END } from '@redux-saga/core'
import Head from 'next/head'

import AppLayout from '../components/AppLayout'
import { Avatar, Card } from 'antd'
import { loadUserInfo } from '../reducers/user'
import wrapper from '../store/configureStore'

const About = () => {
  const { userInfo } = useSelector(state => state.user)

  return (
    <AppLayout>
      <Head>
        <title>Yusu | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  )
}

export const getStaticProps = wrapper.getStaticProps(async context => {
  context.store.dispatch(loadUserInfo(1))

  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

export default About
