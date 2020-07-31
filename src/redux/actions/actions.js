import {FETCH_DATA,
        SHOW_LOADER,
        HIDE_LOADER,
        CHANGE_PATH,
        CHANGE_SEARCH_VALUE} from './actionTypes'

export function fetchData(link){
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

export function changeSearchValue(value) {
  return {
    type: CHANGE_SEARCH_VALUE,
    payload: value
  }
}