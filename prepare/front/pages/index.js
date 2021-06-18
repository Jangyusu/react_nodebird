import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { loadPosts } from '../reducers/post'

const Home = () => {
  const dispatch = useDispatch()

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    state => state.post
  )
  const { me } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadPosts())
  }, [])

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY >
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight * 2
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch(loadPosts())
        }
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePosts])

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  )
}

export default Home
