import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Informations from './Informations';

export default function Admin() {

  return (
    <>
      <p>Vous pouvez accéder à la route : <Link to="/admin/informations">Test accès admin uniquement</Link></p>
      <Routes>
        <Route path="/admin/informations" element={<Informations />} /> {/* Routes spécifiques avec /admin */}
      </Routes>
    </>
  );
}
