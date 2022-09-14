import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { history } from './helpers';
import PrivateRoute from './views/connected/PrivateRoute';
import Login from './views/anonymous/Login';
import ConfirmationEmail from './views/anonymous/ConfirmationEmail';
import Accueil from './views/connected/Accueil';
import Footer from './components/Footer';
import './assets/js';
import './assets/sass/main.scss';
import Header from './components/Header';
import Documents from './views/connected/Documents';
import Certifications from './views/connected/Certifications';
import InscriptionFormation from './views/connected/InscriptionFormation';
import { useSelector } from 'react-redux';
import ChoosePassword from './views/anonymous/ChoosePassword';

function App() {

  const exports = useSelector(state => state.exports);
  const loading = useSelector(state => state.invitations.loading);
  return (
    <div className="App">
      { (exports?.loading === true) || (loading === true) &&
      <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inscription/:token" element={<ChoosePassword />} />
          <Route path="/confirmation-email/:token" element={<ConfirmationEmail />} />
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/documents" element={<Documents />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/formation" element={<InscriptionFormation />} />
            <Route index element={<Accueil />}/>
            <Route path="*" element={<Accueil />}/>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
