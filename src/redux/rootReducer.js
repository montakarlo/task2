import {combineReducers} from 'redux'

import tabItem from './reducers/tabItem'
import appReducer from './reducers/appReducer'

export default combineReducers({
  tabItem, appReducer
})
