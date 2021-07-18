import produce from 'immer'

export const initialState = {
  loadMyInfoLoading: false, // 내 정보
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadUserInfoLoading: false, // 다른 유저 정보
  loadUserInfoDone: false,
  loadUserInfoError: null,

  logInLoading: false, // 로그인
  logInDone: false,
  logInError: null,

  logOutLoading: false, // 로그아웃
  logOutDone: false,
  logOutError: null,

  signUpLoading: false, // 회원가입
  signUpDone: false,
  signUpError: null,

  changeNicknameLoading: false, // 닉네임 변경
  changeNicknameDone: false,
  changeNicknameError: null,

  followId: null, // 팔로우
  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false, // 언팔로우
  unfollowDone: false,
  unfollowError: null,

  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,

  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  me: null,
  userInfo: null,
}

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST'
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS'
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST'
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS'
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE'

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST'
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS'
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_TO_ME'

export const loadMyInfo = () => ({
  type: LOAD_MY_INFO_REQUEST,
})

export const loadUserInfo = () => ({
  type: LOAD_USER_INFO_REQUEST,
})

export const loginRequest = data => ({
  type: LOG_IN_REQUEST,
  data,
})

export const logoutRequest = () => ({
  type: LOG_OUT_REQUEST,
})

export const signupRequest = data => ({
  type: SIGN_UP_REQUEST,
  data,
})

export const changeNickname = data => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
})

export const follow = data => ({
  type: FOLLOW_REQUEST,
  data,
})

export const unfollow = data => ({
  type: UNFOLLOW_REQUEST,
  data,
})

export const removeFollower = data => ({
  type: REMOVE_FOLLOWER_REQUEST,
  data,
})

export const loadFollowers = () => ({
  type: LOAD_FOLLOWERS_REQUEST,
})

export const loadFollowings = () => ({
  type: LOAD_FOLLOWINGS_REQUEST,
})

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true
        draft.loadMyInfoDone = false
        draft.loadMyInfoError = null
        break
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false
        draft.loadMyInfoDone = true
        draft.me = action.data
        break
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false
        draft.loadMyInfoError = action.error
        break
      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoading = true
        draft.loadUserInfoDone = false
        draft.loadUserInfoError = null
        break
      case LOAD_USER_INFO_SUCCESS:
        draft.userInfo = action.data
        draft.loadUserInfoLoading = false
        draft.loadUserInfoDone = true
        break
      case LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoading = false
        draft.loadUserInfoError = action.error
        break
      case LOG_IN_REQUEST:
        draft.logInLoading = true
        draft.logInDone = false
        draft.logInError = null
        break
      case LOG_IN_SUCCESS:
        draft.logInLoading = false
        draft.logInDone = true
        draft.me = action.data
        break
      case LOG_IN_FAILURE:
        draft.logInLoading = false
        draft.logInError = action.error
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutDone = false
        draft.logOutError = null
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        draft.signUpError = null
        break
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        break
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true
        draft.changeNicknameDone = false
        draft.changeNicknameError = null
        break
      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = true
        break
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false
        draft.changeNicknameError = action.error
        break
      case FOLLOW_REQUEST:
        draft.followLoading = true
        draft.followDone = false
        draft.followError = null
        draft.followId = action.data.postId
        break
      case FOLLOW_SUCCESS:
        draft.me.Followings.push({ userId: action.data.UserId })

        draft.followLoading = false
        draft.followDone = true
        draft.followId = null
        break
      case FOLLOW_FAILURE:
        draft.followLoading = false
        draft.followError = action.error
        draft.followId = null
        break
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true
        draft.unfollowDone = false
        draft.unfollowError = null
        draft.followId = action.data.postId
        break
      case UNFOLLOW_SUCCESS:
        const followIndex = draft.me.Followings.findIndex(
          v => v.userId === action.data.UserId
        )
        draft.unfollowLoading = false
        draft.unfollowDone = true
        draft.me.Followings.splice(followIndex, 1)
        draft.followId = null
        break
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false
        draft.unfollowError = action.error
        draft.followId = null
        break
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true
        draft.removeFollowerDone = false
        draft.removeFollowerError = null
        break
      case REMOVE_FOLLOWER_SUCCESS:
        draft.me.Followers = draft.me.Followers.filter(
          v => v.id !== action.data.UserId
        )
        draft.removeFollowerLoading = false
        draft.removeFollowerDone = true
        break
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false
        draft.removeFollowerError = action.error
        break
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true
        draft.loadFollowersDone = false
        draft.loadFollowersError = null
        break
      case LOAD_FOLLOWERS_SUCCESS:
        draft.me.Followers = action.data
        draft.loadFollowersLoading = false
        draft.loadFollowersDone = true
        break
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false
        draft.loadFollowersError = action.error
        break
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true
        draft.loadFollowingsDone = false
        draft.loadFollowingsError = null
        break
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.me.Followings = action.data
        draft.loadFollowingsLoading = false
        draft.loadFollowingsDone = true
        break
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false
        draft.loadFollowingsError = action.error
        break
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({
          id: action.data,
        })
        break
      case REMOVE_POST_OF_ME: {
        draft.me.Posts = draft.me.Posts.filter(v => v.id !== action.data.PostId)
        break
      }
      default:
        break
    }
  })

export default reducer
