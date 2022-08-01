import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Coordinateur() {

  return (
    <>
      <p>Vous pouvez accéder à la route : <Link to="/coordinateur/informations">Test accès coordinateur uniquement</Link></p>
      <Routes>
        <Route path="/coordinateur/informations" element={<Informations />} /> {/* Routes spécifiques avec /coordinateur */}
        <Route path="/coordinateur/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
