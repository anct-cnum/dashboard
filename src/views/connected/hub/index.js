import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';

export default function Hub() {

  return (
    <>
      <Routes>
        <Route path="/hub_coop/informations" element={<MesInformations />} />
        <Route path="/hub_coop/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/hub_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
