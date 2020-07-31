import {combineReducers} from 'redux'

import messages from './reducers/messages'
import tabItem from './reducers/tabItem'
import appReducer from './reducers/appReducer'

export default combineReducers({
  messages, tabItem, appReducer
})
