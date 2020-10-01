import { combineReducers } from 'redux'
import login from './login'
import score from './score'

export default combineReducers({ login, score })
