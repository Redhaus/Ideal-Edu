import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'unistore/react'; //import provider for react specifically
import { store } from './Store/Unistore'; //import store
// import { Provider } from 'unstated';
// import UNSTATED from 'unstated-debug';

const rootEl = document.getElementById("root");
// UNSTATED.logStateChanges = true;

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
          <Dashboard />
      </BrowserRouter>
    </Provider >,
    rootEl
  );
};

// if(module.hot){
//     module.hot.accept()
// }

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
