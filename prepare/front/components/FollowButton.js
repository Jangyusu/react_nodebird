import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { follow, unfollow } from '../reducers/user'

const FollowButton = ({ post }) => {
  const dispatch = useDispatch()

  const { me, followLoading, unfollowLoading, followId } = useSelector(
    state => state.user
  )

  const isFollowing = me?.Followings.find(v => v.userId === post.User.id)
  const isPost = followId === post.id

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(
        unfollow({
          userId: post.User.id,
          postId: post.id,
        })
      )
    } else {
      dispatch(
        follow({
          userId: post.User.id,
          postId: post.id,
        })
      )
    }
  }, [isFollowing, isPost])

  if (post.User.id === me.id) {
    return null
  }

  return (
    <Button
      loading={(followLoading || unfollowLoading) && isPost}
      onClick={onClickButton}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  )
}

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
      })
    ),
    Comments: PropTypes.arrayOf(
      PropTypes.shape({
        User: PropTypes.shape({
          nickname: PropTypes.string,
          content: PropTypes.string,
        }),
      })
    ),
    createdAt: PropTypes.string,
  }).isRequired,
}

export default FollowButton
