import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import './styles/index.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Git from './app/Git';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(

      <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path = '/' element = {<App />} />
              <Route path = '/Git' element = {<Git />} />
            </Routes>
        </Provider>
      </BrowserRouter>
);
