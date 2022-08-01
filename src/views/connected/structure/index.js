import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Structure() {

  return (
    <>
      <p>Vous pouvez accéder à la route : <Link to="/prefet/informations">Test accès structure uniquement</Link></p>
      <Routes>
        <Route path="/structure/informations" element={<Informations />} /> {/* Routes spécifiques avec /structure */}
        <Route path="/structure/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
