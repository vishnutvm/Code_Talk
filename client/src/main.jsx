import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store';
import App from './App';

// 155796053177-ecsrlkspffqf0f3v1lnq731i5qm3v9cl.apps.googleusercontent.com
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)} />
      <GoogleOAuthProvider clientId="155796053177-ecsrlkspffqf0f3v1lnq731i5qm3v9cl.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
