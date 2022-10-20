import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';

export default function Coordinateur() {

  return (
    <>
      <Routes>
        <Route path="/coordinateur_coop/informations" element={<MesInformations />} />
        <Route path="/coordinateur_coop/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/coordinateur_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
