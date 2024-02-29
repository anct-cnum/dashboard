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
import signInCallBack from '../src/services/auth/signInCallBack';
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react';

if (process.env.REACT_APP_SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [browserTracingIntegration()],
    tracesSampleRate: process.env.REACT_APP_SENTRY_TRACE_RATE,
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
  client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
  client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
  authority: process.env.REACT_APP_AUTH_OIDC_AUTHORITY,
  redirect_uri: `${process.env.REACT_APP_AUTH_REDIRECT_URI}/passerelle`,
  post_logout_redirect_uri: `${process.env.REACT_APP_AUTH_REDIRECT_URI}/login`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  scope: 'openid profile email',
  onSigninCallback: () => signInCallBack(store),
};

const instance = createInstance({
  urlBase: process.env.REACT_APP_MATOMO_URL,
  siteId: parseInt(process.env.REACT_APP_MATOMO_ID, 10),
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
