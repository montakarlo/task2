import React from 'react';
import './MessageItem.sass'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {deleteMessage, likeMessage, editMessage} from '../../../../redux/actions/actions'
import {connect} from 'react-redux'

class MessageItem extends React.Component {

  constructor(props) {
    super(props)
  }
 
  componentDidMount = () => {
    var objDiv = document.getElementById("chatBody__container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render(){
    console.log("render");
  if (this.props.userId !== this.props.myId){
    return (
      <div className="messageItem_left messageItem_topBottom" id = {this.props.messageId}>
        <div className='messageItem'>
          <img src={this.props.src} alt="avatar" className="avatar"/>
          <div className="messageItem__container">
            <p className="text">{this.props.text}</p>
            <p className="date">{this.props.date}</p>
          </div>
          {!this.props.isLiked ?
          <i className="fas fa-heart"
            onClick={ () => {
              this.props.onLike(this.props.messageId)
            }}
          ></i>:
          <i className="fas fa-heart isLiked"
          onClick={ () => {
            this.props.onLike(this.props.messageId)
          }}
        ></i>}
        </div>
      </div>
    )
  } else {
    return (
      <div className="messageItem_right messageItem_topBottom" id = {this.props.messageId}>
      <div className='messageItem'>
        <div className="iconsContainer">
          <i className="fas fa-trash-alt"
            onClick={ () => {
              if (window.confirm("Do you really want to delete this message?")) { 
                this.props.onDelete(this.props.messageId)
              }
            }}
          ></i>
          <i className="fas fa-heart"></i>
        </div>
        <div className="messageItem__container_my">
          <p className="text">{this.props.text}</p>
          <p className="date_my">{this.props.date}</p>
          <a className="edit" href="#" id={this.props.messageId+'_edit'}
          onClick={ () => {
            let enteredText = window.prompt("Edit your message", this.props.text)
            if (enteredText){
              this.props.onEdit(this.props.messageId, enteredText);
            }
          }}
          >Edit</a>
        </div>
      </div>
    </div>
    )
  }
}
}
function mapDispatchToProps(dispatch) {
  return {
    onDelete: (id) => dispatch(deleteMessage(id)),
    onLike: (id) => dispatch(likeMessage(id)),
    onEdit: (id, text) => dispatch(editMessage(id, text))
  }
}

export default connect(null, mapDispatchToProps)(MessageItem)
