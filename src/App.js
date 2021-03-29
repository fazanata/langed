import React from 'react';
import './App.css'
import Main from './components/Main'
import Menu from './components/menu/menu';
import NavBar from './components/navBar/navBar'


function App() {

  return (
    <>
      <NavBar />
      <div class="row">
      <div class="col-sm-2"><Menu /></div>
      <div class="col-sm-8"><Main /></div>
         
      </div>
     
    </>
  );
}

export default App;
