import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { loadPosts } from '../reducers/post'
import { loadMyInfo } from '../reducers/user'

const Home = () => {
  const dispatch = useDispatch()

  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector(state => state.post)
  const { me } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadMyInfo())
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

export default Home
