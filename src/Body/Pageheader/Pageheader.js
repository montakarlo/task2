import './Pageheader.sass'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import { changeSearchValue } from '../../redux/actions/actions';

export class Pageheader extends Component {

  render(){
    return(
      <header>
        <span>Montakarlo_app</span>
        <div className='searchContainer'>
          <input
            type="text"
            id="input_password"
            name="password"
            onChange={(e)=> {
              this.props.onChangeSearchValue(e.target.value.toLowerCase())
            }}
            placeholder="Search..."
            >
          </input>
        </div>
      </header>
  )}
}
function mapStateToProps(state) {
  return {
    searchValue: state.tabItem.searchValue,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchValue: value => dispatch(changeSearchValue(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pageheader)
  