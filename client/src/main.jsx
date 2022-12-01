import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import userAthReducer from './redux/userState/index'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// for local storage
import { persistStore,persistReducer,FLUSH,PAUSE,REHYDRATE,PERSIST,PURGE,REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'






const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, userAthReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}/>
    </Provider>
    <App />
  </React.StrictMode>
)
