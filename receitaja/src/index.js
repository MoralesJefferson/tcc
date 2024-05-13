import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/Global.css';
import { BrowserRouter } from 'react-router-dom';
import MinhasRotas from './Routes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <MinhasRotas/>
  </BrowserRouter>
 
);


