import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import ConseillerDetails from './ConseillerDetails';

export default function GrandReseau() {

  return (
    <>
      <Routes>
        <Route path="/grandReseau/informations" element={<MesInformations />} />
        <Route path="/grandReseau/conseiller/:idConseiller" element={<ConseillerDetails />} />
      </Routes>
    </>
  );
}
