import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import axios from 'axios'

import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import wrapper from '../store/configureStore'
import { loadPosts } from '../reducers/post'
import { loadMyInfo } from '../reducers/user'

const Home = () => {
  const dispatch = useDispatch()

  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector(state => state.post)
  const { me } = useSelector(state => state.user)

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY >
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight * 2
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id
          dispatch(loadPosts(lastId))
        }
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePosts, mainPosts])

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  )
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
  context.store.dispatch(loadPosts())

  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

export default Home
