import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';

export default function Prefet() {

  return (
    <>
      <Routes>
        <Route path="/prefet/informations" element={<MesInformations />} />
        <Route path="/prefet/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/prefet/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
