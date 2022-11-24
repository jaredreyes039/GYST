import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './routes/login';
import store from './store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/app_styles/global.scss';


// react-query INIT
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path = '/app' element = {<App/>} />
        <Route path = '/' element = {<Login/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
  </QueryClientProvider>
);
