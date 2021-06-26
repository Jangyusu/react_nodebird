import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { followRequest, unfollowRequest } from '../reducers/user'

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
        unfollowRequest({
          postId: post.id,
          userId: post.User.id,
        })
      )
    } else {
      dispatch(
        followRequest({
          postId: post.id,
          userId: post.User.id,
        })
      )
    }
  }, [isFollowing, isPost])

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
    id: PropTypes.string,
    User: PropTypes.shape({
      id: PropTypes.string,
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
    createdAt: PropTypes.object,
  }).isRequired,
}

export default FollowButton
