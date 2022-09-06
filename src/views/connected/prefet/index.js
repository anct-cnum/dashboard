import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';

export default function Prefet() {

  return (
    <>
      <Routes>
        <Route path="/prefet/exports" element={<Exports />} />
        <Route path="/prefet/informations" element={<MesInformations />} />
      </Routes>
    </>
  );
}
