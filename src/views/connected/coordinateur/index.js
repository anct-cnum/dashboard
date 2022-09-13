import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';

export default function Coordinateur() {

  return (
    <>
      <Routes>
        <Route path="/coordinateur_coop/informations" element={<MesInformations />} />
        <Route path="/coordinateur_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
