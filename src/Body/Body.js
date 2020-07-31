import React, {Component} from 'react';
import './Body.sass'
import PageContainer from './PageContainer/PageContainer'
import Pageheader from './Pageheader/Pageheader'
import Footer from './Footer/Footer'
import {connect} from 'react-redux'


export class Body extends Component {

  render(){
    return(
      <div className = "container">
        <Pageheader />
        <PageContainer />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.loaded
  }
}

export default connect(mapStateToProps, null)(Body)