import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'

import useInput from '../hooks/useInput'
import { addPost } from '../reducers/post'

const PostForm = () => {
  const dispatch = useDispatch()
  const { imagePaths, addPostDone } = useSelector(state => state.post)

  const textInput = useRef()
  const imgInput = useRef()

  const [text, onChangeText, setText] = useInput('')

  useEffect(() => {
    if (addPostDone) {
      setText('')
    }
  }, [addPostDone])

  const onsubmit = useCallback(() => {
    dispatch(addPost(text))
  }, [text])

  const onClickImageUpload = useCallback(() => {
    imgInput.current.click()
  }, [imgInput.current])

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onsubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        ref={textInput}
      />
      <div>
        <input type="file" multiple hidden ref={imgInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
}

export default PostForm
