import React from 'react';
import './Header.sass'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchData,changePath} from '../../../redux/actions/actions';

function Header (props) {
  return (
    <div className="header">
      <div className="tabs">
        <NavLink to="/films/" onClick={()=>{props.onChangePath("/films/")}}>Films</NavLink>
        <NavLink to="/people/" onClick={()=>{props.onChangePath("/people/")}}>People</NavLink>
        <NavLink to="/planets/" onClick={()=>{props.onChangePath("/planets/")}}>Planets</NavLink>
        <NavLink to="/species/" onClick={()=>{props.onChangePath("/species/")}}>Species</NavLink>
        <NavLink to="/starships/" onClick={()=>{props.onChangePath("/starships/")}}>Starships</NavLink>
        <NavLink to="/vehicles/" onClick={()=>{props.onChangePath("/vehicles/")}}>Vehicles</NavLink>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.appReducer.loading,
    data: state.tabItem.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetch: link => dispatch(fetchData(link)),
    onChangePath: (path) => dispatch(changePath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)