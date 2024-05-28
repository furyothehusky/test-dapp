import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <TokenProvider>
        <App />
      </TokenProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
