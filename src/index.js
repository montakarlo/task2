import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './redux/rootReducer'
import {Router} from 'react-router-dom'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const store = createStore(rootReducer,
  applyMiddleware(
  reduxThunk
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
