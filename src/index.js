import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/browser';
import { BrowserRouter as Router } from 'react-router-dom';
import setup from './services/api';
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react';

if (import.meta.env.VITE_APP_SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_SENTRY_ENVIRONMENT,
    integrations: [browserTracingIntegration()],
    tracesSampleRate: import.meta.env.VITE_APP_SENTRY_TRACE_RATE,
    ignoreErrors: [
      //Extension Safari
      /webkit-masked-url/i,
      /t.onDisconnect/i,
    ],
  });
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

const instance = createInstance({
  urlBase: import.meta.env.VITE_APP_MATOMO_URL,
  siteId: parseInt(import.meta.env.VITE_APP_MATOMO_ID, 10),
});

setup(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MatomoProvider value={instance}>
          <App />
        </MatomoProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
