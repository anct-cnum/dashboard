import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';

export default function Admin() {

  return (
    <>
      <Routes>
        <Route path="/admin/exports" element={<Exports />} />
        <Route path="/admin/informations" element={<MesInformations />} />
      </Routes>
    </>
  );
}
