import React from 'react';
import './ChatBody.sass'
import MessageItem from './MessageItem/MessageItem'
import {connect} from 'react-redux'

function ChatBody (props) {
  return (
    <div className="chatBody">
      <div className="chatBody__container" id="chatBody__container">
        {props.messages.map((message, index) => {
          return(
            <MessageItem 
            allMessages = {props.messages}
            lastMessageId = {props.lastMessageId}
            userId = {message.userId}
            text = {message.text}
            src = {message.avatar}
            messageId = {message.id}
            isLiked = {message.isLiked}
            date = {new Date(message.createdAt).toString().slice(16,21)}
            myId = {props.myId}
            key = {index}
            />
          )
        })
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  let lastMessage = state.messages.messages
  let lastMessageId = lastMessage[lastMessage.length -1].id;
  return {
    messages : state.messages.messages,
    myId: state.messages.myId,
    lastMessageId: lastMessageId
  }
}

export default connect(mapStateToProps)(ChatBody)