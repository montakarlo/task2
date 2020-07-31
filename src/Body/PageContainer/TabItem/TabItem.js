import React, {Component} from 'react';
import './TabItem.sass'
import {connect} from 'react-redux'
import {fetchData, changePath} from '../../../redux/actions/actions';
import {Loader} from '../../Loader/Loader'

export class TabItem extends Component {
  
  componentWillMount() {
    if(this.props.path){
      this.props.onFetch(`http://swapi.dev/api${this.props.path}`)
    }else {
      this.props.history.push('/')
    }

  }

  render(){
    if (this.props.loading){
      return <div className="centeredSpinner"><Loader /></div>
    } else if (this.props.data){
      let dataKeys = Object.keys(this.props.data)
      console.log(this.props);
      // console.log(dataKeys);
      if (!dataKeys.includes('name') && !dataKeys.includes('title')){
        // console.log('render', this.props);
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
              <div className='searchContainer'>
                <input
                  type="text"
                  id="input_password"
                  name="password"
                  // onChange={this.onChange}
                  placeholder="Search..."
                  >
                </input>
              </div>
              {Array.from(itemsMapSorted).map((element, index) => {
                const urlSlice = element[1].url.slice(20,-1)
                return(
                  <div className="linkItem" key={index}>
                    <a key={index} id = {"name"+index} onClick={()=>{
                      this.props.onChangePath(urlSlice)
                      this.props.onFetch(`http://swapi.dev/api${urlSlice}/`)
                    }}>{element[0]}</a>
                  </div>
                )
              })}
            </div>
          </div>
        )}else{
          const items = this.props.data
          // console.log("items", items);
          // console.log("dataKeys", dataKeys);
          return(
            <div className="tabItems">
              <div className="tabItems__Container">
                <div className='searchContainer'>
                  <input
                    type="text"
                    id="input_password"
                    name="password"
                    // onChange={this.onChange}
                    placeholder="Search..."
                    >
                  </input>
                </div>
                {dataKeys.map((element, index) => {
                  let urlSlice = '/'
                  if (items[element] !== null && items[element] !== "n/a"&& items[element].length !==0 && element !== "url" && element !== "created" && element !== "edited"){
                    // console.log(items[element]);
                    if (String(items[element]).includes('http://') && !Array.isArray(items[element])){
                      urlSlice = items[element].slice(20,-1)
                      return(
                        <div className="linkItem" key={index}>
                          <p>{element.replace(/[\_]/g, " ")}: </p>
                          <div className="linkItem__links">
                            <a key={index} id = {"link"+index} onClick={()=>{
                              this.props.onChangePath(urlSlice)
                              this.props.onFetch(`http://swapi.dev/api${urlSlice}`)
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
                                  this.props.onFetch(`http://swapi.dev/api${link.slice(20,-1)+"/"}`)
                                }}>Go to see #{link.slice(-3).replace(/[\""s/"]/g, "")}</a>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }
                    else{
                      console.log(element);
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetch: link => dispatch(fetchData(link)),
    onChangePath: (path) => dispatch(changePath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabItem)
