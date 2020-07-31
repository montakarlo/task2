import {SHOW_LOADER,HIDE_LOADER} from '../actions/actionTypes';

const initialState = {
  loading: false
}

export default function appReducer (state = initialState, action) {

  switch(action.type) {
    case SHOW_LOADER:
      return {
        loading: action.payload
      }
    case HIDE_LOADER:
      // console.log('finish mounting');
      return {
        loading: action.payload
      }
    default:
      return state
  }
}
