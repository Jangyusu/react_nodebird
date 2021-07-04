import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'

import useInput from '../hooks/useInput'
import { addPost, uploadImages, removeImage } from '../reducers/post'

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
    if (!text || !text.trim()) {
      return alert('게시글을 작성해주세요')
    }

    const formData = new FormData()
    imagePaths.forEach(p => {
      formData.append('image', p)
    })
    formData.append('content', text)
    dispatch(addPost(formData))
  }, [text, imagePaths])

  const onClickImageUpload = useCallback(() => {
    imgInput.current.click()
  }, [imgInput.current])

  const onChangeImages = useCallback(e => {
    const imageFormData = new FormData()

    ;[].forEach.call(e.target.files, f => {
      imageFormData.append('image', f)
    })

    dispatch(uploadImages(imageFormData))
  }, [])

  const onRemoveImage = useCallback(index => () => {
    dispatch(removeImage(index))
  })

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
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imgInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: '200px' }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
}

export default PostForm
