import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Coordinateur() {

  return (
    <>
      <Routes>
        <Route path="/coordinateur/informations" element={<Informations />} /> {/* Routes spécifiques avec /coordinateur */}
        <Route path="/coordinateur/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
