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
import { AuthProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
import { BrowserRouter as Router } from 'react-router-dom';
import { history } from './helpers';
import setup from './services/api';
import signInCallBack from '../src/services/auth/signInCallBack';
import apiUrlRoot from './helpers/apiUrl';

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

const oidcConfig = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  post_logout_redirect_uri: `${apiUrlRoot}/login`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: () => signInCallBack(store),
};
setup(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
