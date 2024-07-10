import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/Global.css';
import { BrowserRouter } from 'react-router-dom';
import MinhasRotas from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <MinhasRotas/>
  </BrowserRouter>
 
);


