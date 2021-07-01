import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input } from 'antd'

import { changeNickname } from '../reducers/user'
import useInput from '../hooks/useInput'

const NicknameEditForm = () => {
  const dispatch = useDispatch()

  const { me } = useSelector(state => state.user)

  const [nickname, onChangeNickname] = useInput(me?.nickname || '')

  const onSubmit = useCallback(() => {
    dispatch(changeNickname(nickname))
  }, [nickname])

  return (
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '20px',
      }}
    >
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  )
}

export default NicknameEditForm
