import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { ContextProvider } from './Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const url = process.env.REACT_APP_AUTH0_REDIRECT_URI;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain as string}
      clientId={clientId as string}
      authorizationParams={{
        redirect_uri: url,
      }}
    >
      <ContextProvider>
        <App />
      </ContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
