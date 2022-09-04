import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import user from './auth/user'
import chatUsers from './chat/chatUsers'
import graphData from './graph/graphData'
import sendMessage from './chat/sendMessage'
import users from './auth/users'
import friends from './friends'
import interests from './interests'
import editProfile from './profile/editProfile'
import profile from './profile'
import friendJunctions from './friends/junctions'
import sendDM from './chat/sendDm'
import settings from './settings'
const reducer = combineReducers({
  auth,
  user,
  chatUsers,
  graphData,
  sendMessage,
  users,
  friends,
  interests,
  editProfile,
  profile,
  friendJunctions,
  sendDM,
  settings
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
