import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { List, Button, Card } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import { unfollow, removeFollower } from '../reducers/user'

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch()

  const onCancel = useCallback(
    userId => () => {
      if (header === '팔로잉') {
        dispatch(unfollow(userId))
      } else {
        dispatch(removeFollower(userId))
      }
    },
    []
  )

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  )
}

FollowList.prototype = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default FollowList
