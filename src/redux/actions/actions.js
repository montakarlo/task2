import {FETCH_MESSAGES,
        ADD_MESSAGE,
        DELETE_MESSAGE,
        LIKE_MESSAGE,
        TAKE_ALL_MESSAGES,
        EDIT_MESSAGE,
        FETCH_DATA,
        SHOW_LOADER,
        HIDE_LOADER,
        CHANGE_PATH} from './actionTypes'

export function fetchedToStore(link) {
  return (dispatch) => {
    dispatch(fetchMessages(link))
  }
}

export function fetchMessages(link) {
  return {
    type: FETCH_MESSAGES,
    payload: link
  }
}

export function addMessage(newMessage) {
  return {
    type: ADD_MESSAGE,
    payload: newMessage
  }
}

export function deleteMessage(id) {
  return {
    type: DELETE_MESSAGE,
    payload: id
  }
}

export function likeMessage(id) {
  return {
    type: LIKE_MESSAGE,
    payload: id
  }
}

export function takeAllMessages(){
  return {
    type: TAKE_ALL_MESSAGES
  }
}

export function editMessage(id, text){
  return {
    type: EDIT_MESSAGE,
    payload: {id, text}
  }
}

export function fetchData(link){
  // console.log(link);
  return async dispatch => {
    await dispatch(showLoader())
    const response = await fetch(link)
    let json = await response.json();
    await dispatch({type: FETCH_DATA, payload: json});
    await dispatch(hideLoader())
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
    payload: true
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
    payload: false
  }
}

export function changePath(path) {
  return {
    type: CHANGE_PATH,
    payload: path
  }
}