import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import user from './auth/user'
import chatUsers from './chat/chatUsers'
import sendMessage from './chat/sendMessage'
import users from './auth/users'
import friends from './friends'

const reducer = combineReducers({
  auth,
  user,
  chatUsers,
  sendMessage,
  users,
  friends
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
