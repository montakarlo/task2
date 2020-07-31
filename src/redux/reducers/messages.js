import {ADD_MESSAGE,
        DELETE_MESSAGE,
        LIKE_MESSAGE,
        TAKE_ALL_MESSAGES,
        EDIT_MESSAGE} from '../actions/actionTypes';
import {data} from '../../messages'
const initialState = {
  messages: data,
  myId: '9e243930-83c9-11e9-8e0c-8f1a686f4ce4',
  loaded: false,
}

export default function messages (state = initialState, action) {

  switch(action.type) {
    case ADD_MESSAGE:
      let newMessageObj = action.payload
      let allMessages = []
      if (newMessageObj.text && newMessageObj.text != '\n') {
        allMessages.push(...state.messages, newMessageObj)
        console.log(action.payload);
        return {
          myId: state.myId,
          messages: allMessages,
        }
      }
    case DELETE_MESSAGE:
      let delId = action.payload
      let messages = state.messages
      let newMessagesArr = [...messages]
      messages.forEach(message => {
        if (message.id == delId){
          let index = newMessagesArr.indexOf(message)
          newMessagesArr.splice(index,1)
        }
      });
      return {
        myId: state.myId,
        messages: newMessagesArr,
      }
    case LIKE_MESSAGE:
      let mesId = action.payload
      let messagesToLike = state.messages
      let newMessagesToLike = [...messagesToLike]
      messagesToLike.forEach(message => {
        let index = newMessagesToLike.indexOf(message)
        if (mesId == message.id){
          newMessagesToLike[index].isLiked = !newMessagesToLike[index].isLiked 
        }
      });
      return {
        myId: state.myId,
        messages: newMessagesToLike,
      }
      case TAKE_ALL_MESSAGES:
        return {
          myId: state.myId,
          messages: data,
          loaded: true,
        }
      case EDIT_MESSAGE:
        let idMes = action.payload.id
        let textMes = action.payload.text
        let messagesToEdit = state.messages
        let newMessagesToEdit = [...messagesToEdit]
        newMessagesToEdit.forEach(message => {
          let index = newMessagesToEdit.indexOf(message)
          if (idMes == message.id){
            newMessagesToEdit[index].text = textMes
          }
        });
        return {
          myId: state.myId,
          messages: newMessagesToEdit,
        }
    default:
      return state
  }
}
