import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import VarContext from './context'

function Main() {
  const [varUser, setVarUser] = useState({
    section: null, 
    count: 10,
    lesson: null, 
    id_user: null})
    
  return (
    <React.StrictMode>
      <BrowserRouter>
        <VarContext.Provider value={{varUser, setVarUser}}>
          <App />
        </VarContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
