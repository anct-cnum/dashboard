import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

if (process.env.REACT_APP_SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: process.env.REACT_APP_SENTRY_TRACE_RATE,
  });
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
