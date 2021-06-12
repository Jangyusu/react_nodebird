import { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

import useInput from '../hooks/useInput'

const CommentForm = ({ post }) => {
  const id = useSelector(state => state.user.me?.id)
  const [commentText, onChangeCommentText, setCommentText] = useInput('')
  const inputTextArea = useRef()

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText)
    setCommentText('')
    inputTextArea.current.focus()
  }, [commentText, inputTextArea.current])

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0, zIndex: 1 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          ref={inputTextArea}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
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
    createdAt: PropTypes.object,
  }).isRequired,
}

export default CommentForm
