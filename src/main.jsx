import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.min';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
