import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/browser';
import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
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

const oidcConfig = {
  client_id: import.meta.env.VITE_APP_AUTH_CLIENT_ID,
  client_secret: import.meta.env.VITE_APP_AUTH_CLIENT_SECRET,
  authority: import.meta.env.VITE_APP_AUTH_OIDC_AUTHORITY,
  redirect_uri:
    window.location.pathname.startsWith('/invitation') ?
      `${import.meta.env.VITE_APP_AUTH_REDIRECT_URI}/passerelle/${window.location.pathname.split('/').pop()}` :
      `${import.meta.env.VITE_APP_AUTH_REDIRECT_URI}/passerelle`,
  post_logout_redirect_uri: `${import.meta.env.VITE_APP_AUTH_REDIRECT_URI}/login`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  scope: 'openid profile email',
};

const instance = createInstance({
  urlBase: import.meta.env.VITE_APP_MATOMO_URL,
  siteId: parseInt(import.meta.env.VITE_APP_MATOMO_ID, 10),
});

setup(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <Provider store={store}>
        <Router>
          <MatomoProvider value={instance}>
            <App />
          </MatomoProvider>
        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
