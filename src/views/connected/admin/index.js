import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';

export default function Admin() {

  return (
    <>
      <Routes>
        <Route path="/admin/informations" element={<Informations />} /> {/* Routes spécifiques avec /admin */}
        <Route path="/admin/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
