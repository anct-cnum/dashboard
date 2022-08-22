import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Structure() {

  return (
    <>
      <Routes>
        <Route path="/structure/informations" element={<Informations />} /> {/* Routes spécifiques avec /structure */}
        <Route path="/structure/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
