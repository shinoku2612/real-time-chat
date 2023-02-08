import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Global from './components/ui/Global';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import UIProvider from './context/UIContext';
import { setUpInterceptor } from './axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <UIProvider>
      <Router>
        <Global>
          <App />
        </Global>
      </Router>
    </UIProvider>
  </Provider>,
);
setUpInterceptor(store);
reportWebVitals();
