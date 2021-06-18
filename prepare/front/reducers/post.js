import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'

export const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      User: {
        id: 1,
        nickname: 'yusu',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'hero',
          },
          content: '얼른 사고싶어요~',
        },
      ],
    },
  ],
  imagePaths: [],

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map((v, i) => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.imageUrl(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }))
)

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

const dummyPost = ({ id, content }) => ({
  id,
  content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
})

const dummyComment = ({ content, userId }) => ({
  id: shortId.generate(),
  User: {
    id: userId,
    nickname: 'yusu',
  },
  content,
})

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
})

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

export const removePost = data => ({
  type: REMOVE_POST_REQUEST,
  data,
})

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data))
        draft.addPostLoading = false
        draft.addPostDone = true
        break
      case ADD_POST_FAILURE:
        draft.addPostLoading = false
        draft.addPostError = action.error
        break
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true
        draft.removePostDone = false
        draft.removePostError = null
        break
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data)
        draft.removePostLoading = false
        draft.removePostDone = true
        break
      case REMOVE_POST_FAILURE:
        draft.addCommentDone = false
        draft.addCommentDoneremovePostError = action.error
        break
      case ADD_COMMENT_REQUEST:
        draft.addCommentDoneaddCommentLoading = true
        draft.addCommentDoneaddCommentDone = false
        draft.addCommentDoneaddCommentError = null
        break
      case ADD_COMMENT_SUCCESS: {
        const { content, postId, userId } = action.data
        const post = draft.mainPosts.find(v => v.id === postId)

        post.Comments.unshift(dummyComment({ content, userId }))
        draft.addCommentLoading = false
        draft.addCommentDone = true
        break
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false
        draft.addCommentError = action.error
        break
      default:
        break
    }
  })
}

export default reducer
