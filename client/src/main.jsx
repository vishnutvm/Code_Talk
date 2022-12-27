import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import store from './redux/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)} />
      <App />
    </Provider>
  </React.StrictMode>
);
