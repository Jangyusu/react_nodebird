import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'
import PropTypes from 'prop-types'

import useInput from '../hooks/useInput'
import { addComment } from '../reducers/post'

const CommentForm = ({ post }) => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)
  const { addCommentLoading, addCommentDone } = useSelector(state => state.post)

  const [commentText, onChangeCommentText, setCommentText] = useInput('')

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('')
    }
  }, [addCommentDone])

  const onSubmitComment = useCallback(() => {
    dispatch(
      addComment({
        content: commentText,
        postId: post.id,
        userId: me.id,
      })
    )
  }, [commentText, me.id])

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0, zIndex: 1 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
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

export default CommentForm
