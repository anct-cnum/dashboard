import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { history } from './helpers';
import PrivateRoute from './views/connected/PrivateRoute';
import Login from './views/anonymous/Login';
import Accueil from './views/connected/Accueil';
import Footer from './components/Footer';
import './assets/js';
import './assets/sass/main.scss';
import Header from './components/Header';
import Documents from './views/connected/Documents';
import { useSelector } from 'react-redux';

function App() {

  const exports = useSelector(state => state.exports);

  return (
    <div className="App">
      { exports?.loading === true &&
      <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/documents" element={<Documents />} /> {/* routes communes ici */}
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
