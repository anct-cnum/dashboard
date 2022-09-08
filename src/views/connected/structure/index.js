import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import Informations from './Informations';
import InvitationMulticompteStructure from './InvitationStructure';


export default function Structure() {
  return (
    <>
      <Routes>
        <Route path="/structure/informations" element={<MesInformations />} />
        <Route path="/structure/exports" element={<Exports />} />
        <Route path="/structure/invitations" element={<InvitationMulticompteStructure />} />
      </Routes>
    </>
  );
}
