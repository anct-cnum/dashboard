import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';

export default function Hub() {

  return (
    <>
      <Routes>
        <Route path="/hub_coop/exports" element={<Exports />} />
        <Route path="/hub_coop/informations" element={<MesInformations />} />
      </Routes>
    </>
  );
}
