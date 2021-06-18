import shortId from 'shortid'

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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      }
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      }
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter(v => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS: {
      const { content, postId, userId } = action.data

      const postIndex = state.mainPosts.findIndex(v => v.id === postId)
      const post = { ...state.mainPosts[postIndex] }
      post.Comments = [dummyComment({ content, userId }), ...post.Comments]
      const mainPosts = [...state.mainPosts]
      mainPosts[postIndex] = post

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      }
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      }
    default:
      return state
  }
}

export default reducer
