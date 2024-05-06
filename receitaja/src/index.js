
import ReactDOM from 'react-dom/client';
import "./styles/global.css";
import { BrowserRouter } from 'react-router-dom';
import MinhasRotas from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <MinhasRotas/>
  </BrowserRouter>
    
  
);


