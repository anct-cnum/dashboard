import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';

export default function Structure() {

  return (
    <>
      <Routes>
        <Route path="/structure/exports" element={<Exports />} />
        <Route path="/structure/informations" element={<MesInformations />} />
      </Routes>
    </>
  );
}
