import React, {Component} from 'react';
import './TabItem.sass'
import {connect} from 'react-redux'
import {fetchData, changePath} from '../../../redux/actions/actions';
import {Loader} from '../../Loader/Loader'

export class TabItem extends Component {
  
  componentWillMount() {
    if(this.props.path){
      this.props.onFetch(`https://swapi.dev/api${this.props.path}`)
    }else {
      this.props.history.push('/')
    }
  }
  
  render(){
    if (this.props.loading){
      return <div className="centeredSpinner"><Loader /></div>
    } else if (this.props.data){
      let dataKeys = Object.keys(this.props.data)
      if (!dataKeys.includes('name') && !dataKeys.includes('title')){
        const items = this.props.data
        let itemsMap
        if (Object.keys(items[0]).includes('title')){
          itemsMap = new Map(items.map((item, index) => [item.title, item]));
        } else{
          itemsMap = new Map(items.map((item, index) => [item.name, item]));
        }
        const itemsMapSorted = new Map([...itemsMap.entries()].sort());
        return (
          <div className="tabItems">
            <div className="tabItems__Container">
              {Array.from(itemsMapSorted).map((element, index) => {
                const urlSlice = element[1].url.slice(20,-1)
                if (element[0].toLowerCase().includes(this.props.searchValue.toLowerCase())){
                  return(
                    <div className="linkItem" key={index}>
                      <a key={index} id = {"name"+index} onClick={()=>{
                        this.props.onChangePath(urlSlice)
                        this.props.onFetch(`https://swapi.dev/api${urlSlice}/`)
                      }}>{element[0]}</a>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )}else{
          const items = this.props.data
          return(
            <div className="tabItems">
              <div className="tabItems__Container">
                {dataKeys.map((element, index) => {
                  let urlSlice = '/'
                  if (items[element] !== null && items[element] !== "n/a"&& items[element].length !==0 && element !== "url" && element !== "created" && element !== "edited"){
                    if (String(element).toLowerCase().includes(this.props.searchValue.toLowerCase()) || String(items[element]).toLowerCase().includes(this.props.searchValue.toLowerCase())){
                      if (String(items[element]).includes('https://') && !Array.isArray(items[element])){
                        urlSlice = items[element].slice(20,-1)
                        return(
                          <div className="linkItem" key={index}>
                            <p>{element.replace(/[\_]/g, " ")}: </p>
                            <div className="linkItem__links">
                              <a key={index} id = {"link"+index} onClick={()=>{
                                this.props.onChangePath(urlSlice)
                                this.props.onFetch(`https://swapi.dev/api${urlSlice}`)
                              }}>Go to see #{items[element].slice(-3).replace(/[\""s/"]/g, "")}</a>
                            </div>
                          </div>
                        )
                      }else if(Array.isArray(items[element])){
                        return(
                          <div className="linkItem linkItem_array" key={index}>
                            <p>{element.replace(/[\_]/g, " ")}: </p>
                            <div className="linkItem__links">
                              {items[element].map((link, index) => {
                                return(
                                  <a key={index} id = {"arrayLink"+index} onClick={()=>{
                                    this.props.onChangePath(link.slice(20,-1))
                                    this.props.onFetch(`https://swapi.dev/api${link.slice(20,-1)+"/"}`)
                                  }}>Go to see #{link.slice(-3).replace(/[\""s/"]/g, "")}</a>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }
                      else{
                        if (element == "opening_crawl") {
                          return(
                            <div className="linkItem" key={index}>
                              <p>{element.replace(/[\_]/g, " ")}: </p> <p className="linkItem__text">{items[element]}</p>
                            </div>
                          ) 
                        }else {
                          return(
                            <div className="linkItem" key={index}>
                              <p>{element.replace(/[\_]/g, " ")}: </p> <p>{items[element]}</p>
                            </div>
                          )
                        }
                      }
                    }
                  }
                })}
              </div>
            </div>
          )
        }
      }
      else {
        return <div></div>
      }
  }
}

function mapStateToProps(state) {
  return {
    loading: state.appReducer.loading,
    data: state.tabItem.data.results,
    path: state.tabItem.path,
    searchValue: state.tabItem.searchValue,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetch: link => dispatch(fetchData(link)),
    onChangePath: (path) => dispatch(changePath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabItem)
