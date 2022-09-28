import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/app_styles/global.scss'
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './routes/login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path = '/app' element = {<App/>} />
        <Route path = '/' element = {<Login/>} />
      </Routes>
    </BrowserRouter>
);
