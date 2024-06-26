import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PrivateRoute from './views/connected/PrivateRoute';
import Login from './views/anonymous/Login';
import Passerelle from './views/anonymous/Passerelle';
import Accueil from './views/connected/Accueil';
import Footer from './components/Footer';
import './assets/js';
import './assets/sass/main.scss';
import Header from './components/Header';
import Alerte from './components/Alerte';
import Documents from './views/connected/Documents';
import GraphiqueNationale from './views/connected/commun/statistiques/GraphiqueNationale';
import GraphiquePilotage from './views/connected/commun/statistiques/GraphiquePilotage';
import GraphiqueStructure from './views/connected/commun/statistiques/GraphiqueStructure';
import GraphiqueTerritoire from './views/connected/commun/statistiques/GraphiqueTerritoire';
import TableauTerritoires from './views/connected/commun/statistiques/TableauTerritoires';
import { useAuth } from 'react-oidc-context';
import refreshToken from './services/auth/refreshToken';
import { getAccessToken } from './helpers/getAccessToken';
import GraphiqueConseiller from './views/connected/commun/statistiques/GraphiqueConseiller';
import { useMatomo } from '@jonkoops/matomo-tracker-react';
import Spinner from './components/Spinner';

function App() {

  const { trackPageView } = useMatomo();
  const isLoading = useSelector(state => state.alerteEtSpinner?.isLoading);
  const accessToken = useSelector(state => state.authentication?.accessToken) || getAccessToken();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isAuthenticated && location.pathname !== '/login' && accessToken) {
      refreshToken(auth, dispatch, accessToken);
    }
  }, [location, auth, accessToken]);

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="App">
      { isLoading === true &&
      <div className="wrapperModal"></div>
      }
      <Spinner loading={!(!localStorage.getItem('logoutAction'))} />
      <Header />
      <Alerte />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/passerelle" element={<Passerelle />} />
        <Route path="/passerelle/:token" element={<Passerelle />} />
        <Route path="/invitation/:verificationToken" element={<Login />} />
        <Route path="/" element={<PrivateRoute/>}>
          {/* routes communes ici */}
          <Route path="/documents" element={<Documents />} />
          <Route path="/statistiques-nationales" element={<GraphiqueNationale />} />
          <Route path="/statistiques-pilotage" element={<GraphiquePilotage />} />
          <Route path="/statistiques-structure/:idStructure" element={<GraphiqueStructure />} />
          <Route path="/statistiques-conseiller/:idConseiller" element={<GraphiqueConseiller />} />
          <Route path="/statistiques-territoires" element={<TableauTerritoires />} />
          <Route path="/statistiques-territoire/:maille/:codeTerritoire" element={<GraphiqueTerritoire />} />
          <Route index element={<Navigate to="/accueil" />} /> {/* pour fixer le warning du react router */}
          <Route path="*" element={<Accueil />}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
