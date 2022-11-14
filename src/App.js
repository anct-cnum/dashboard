import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PrivateRoute from './views/connected/PrivateRoute';
import Login from './views/anonymous/Login';
import ConfirmationEmail from './views/anonymous/ConfirmationEmail';
import Accueil from './views/connected/Accueil';
import Footer from './components/Footer';
import './assets/js';
import './assets/sass/main.scss';
import Header from './components/Header';
import Alerte from './components/Alerte';
import Documents from './views/connected/Documents';
import Certifications from './views/connected/Certifications';
import InscriptionFormation from './views/connected/InscriptionFormation';
import GraphiqueNationale from './views/connected/commun/statistiques/GraphiqueNationale';
import GraphiqueStructure from './views/connected/commun/statistiques/GraphiqueStructure';
import GraphiqueTerritoire from './views/connected/commun/statistiques/GraphiqueTerritoire';
import TableauStructures from './views/connected/commun/statistiques/TableauStructures';
import TableauTerritoires from './views/connected/commun/statistiques/TableauTerritoires';
import { useAuth } from 'react-oidc-context';
import refreshToken from './auth/refreshToken';
import TableauConseillers from './views/connected/commun/conseillers/TableauConseillers';
import { getUser } from './helpers/getUser';


function App() {

  const isLoading = useSelector(state => state.alerteEtSpinner?.isLoading);
  const user = useSelector(state => state.authentication?.user) || getUser();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useAuth();

  if (location.pathname !== '/login') {
    useEffect(() => {
      refreshToken(auth, dispatch, user);
    }, [location]);
  
  }


  return (
    <div className="App">
      { isLoading === true &&
      <div className="wrapperModal"></div>
      }
      <Header />
      <Alerte />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/:verificationToken" element={<Login />} />
        <Route path="/confirmation-email/:token" element={<ConfirmationEmail />} />
        <Route path="/" element={<PrivateRoute/>}>
          {/* routes communes ici */}
          <Route path="/documents" element={<Documents />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/formation" element={<InscriptionFormation />} />
          <Route path="/liste-conseillers" element={<TableauConseillers />} />
          <Route path="/statistiques-nationales" element={<GraphiqueNationale />} />
          <Route path="/statistiques-structures" element={<TableauStructures />} />
          <Route path="/statistiques-structure/:idStructure" element={<GraphiqueStructure />} />
          <Route path="/statistiques-territoires" element={<TableauTerritoires />} />
          <Route path="/statistiques-territoire/:codeTerritoire" element={<GraphiqueTerritoire />} />
          <Route index element={<Navigate to="/accueil" />} /> {/* pour fixer le warning du react router */}
          <Route path="*" element={<Accueil />}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
