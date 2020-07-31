import {FETCH_DATA, CHANGE_PATH, CHANGE_SEARCH_VALUE} from '../actions/actionTypes';

const initialState = {
  data: [],
  // path: '/'
  searchValue: ''
}


export default function tabItem (state = initialState, action) {

  switch(action.type) {
    case FETCH_DATA:
      let toState = []
      if (action.payload.results){
        toState = action.payload
      } else{
        toState = {results: action.payload}
      }
      return {
        ...state, data: toState
      }
    case CHANGE_PATH:
      return {
        ...state, path: action.payload
      }
    case CHANGE_SEARCH_VALUE:
      return {
        ...state, searchValue: action.payload
      }
    default:
      return state
  }
}