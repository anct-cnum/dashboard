import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { history } from './helpers';
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
import TableauConseillers from './views/connected/commun/conseillers/TableauConseillers';


function App() {

  const isLoading = useSelector(state => state.alerteEtSpinner?.isLoading);

  return (
    <div className="App">
      { isLoading === true &&
      <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Header />
        <Alerte />
        <Routes>
          <Route path="/login" element={<Login />} />
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
      </Router>
    </div>
  );
}

export default App;
