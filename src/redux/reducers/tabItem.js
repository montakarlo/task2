import {FETCH_DATA, CHANGE_PATH} from '../actions/actionTypes';

const initialState = {
  data: [],
  // path: '/'
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
    default:
      return state
  }
}