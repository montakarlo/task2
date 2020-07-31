import React, {Component} from 'react';
import './InputArea.sass'
import {addMessage} from '../../../redux/actions/actions'
import {connect} from 'react-redux'

export class InputArea extends Component {

  onChangeMessage = this.onChangeMessage.bind(this);
  onSubmit = this.onSubmit.bind(this);
  newMessageObj = {text: '',
                  createdAt: '',
                  id: '',
                  userId: '9e243930-83c9-11e9-8e0c-8f1a686f4ce4'}

  onSubmit(event){
    event.preventDefault();
  }
  
  onChangeMessage(event){
    let id = '_' + Math.random().toString(36).substr(2, 20);
    let dateNow = new Date(Date.now());
    this.newMessageObj = {...this.newMessageObj, text: event.target.value, createdAt: dateNow.toISOString(), id: id};
  }

  clearArea(){
    document.getElementById('input_message').value = "";
  }

  componentDidMount = () => {
    const onKeyUp = ev => {
      const enterKeyCode = 13;
      if (ev.keyCode === enterKeyCode) {
        submitButton.click();
      }
    };
    const submitButton = document.getElementById("submitButton");
    window.addEventListener("keydown", onKeyUp);
  }
  
  render(){
    console.log(this.props.onAdd);
    return (
      <form onSubmit={this.onSubmit}>
        <div className="inputArea">
          <div className="inputAreaContainer">
            <textarea
              type="text"
              id="input_message"
              name="input_text"
              onChange={this.onChangeMessage}
              placeholder="Type message!"
              >
            </textarea>
          </div>
          <button
            id = "submitButton"
            type="submit"
            value="Submit"
            className="inputArea__button"
            onClick={ () => {
              let toSend = Object.assign({},this.newMessageObj)
              this.newMessageObj.text = ''
              this.props.onAdd(toSend);
              this.clearArea();
            }}
          >Send
          </button>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: (newMessageObj) => dispatch(addMessage(newMessageObj)),
  }
}

export default connect(null, mapDispatchToProps)(InputArea)
