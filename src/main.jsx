import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Auth0Provider
  domain={'dev-3f3dtkzzoe0a41k3.us.auth0.com'}
  clientId={'tM35TuPtATOwKDcku7XnxlD5OtPEnpdV'} 
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: 'http://localhost:5173/',
  }}>
  <App />
</Auth0Provider>
  </React.StrictMode>,
)
