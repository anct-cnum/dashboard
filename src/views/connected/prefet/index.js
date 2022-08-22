import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Prefet() {

  return (
    <>
      <Routes>
        <Route path="/prefet/informations" element={<Informations />} /> {/* Routes spécifiques avec /prefet */}
        <Route path="/prefet/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
