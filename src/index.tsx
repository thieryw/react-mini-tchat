import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
//import * as serviceWorker from './serviceWorker';
import {App} from "./components/App/App";
import {useAsync} from "react-async-hook";
import {getStore} from "./logic";

const Switcher: React.FunctionComponent = ()=>{
  
  const asyncGetStore = useAsync(getStore, []);
  
  
  return(
    asyncGetStore.result === undefined ? 
      <h1>Loading...</h1> : 
      <App store={asyncGetStore.result} 
    />

  )
}

ReactDOM.render(
  <React.StrictMode>
    <Switcher />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
