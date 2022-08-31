import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';
import InvitationMulticompteStructure from './InvitationStructure';

export default function Structure() {
  return (
    <>
      <Routes>
        <Route path="/structure/informations" element={<Informations />} />{' '}
        {/* Routes spécifiques avec /structure */}
        <Route path="/structure/exports" element={<Exports />} />
        <Route path="/structure/invitation" element={<InvitationMulticompteStructure />} />
      </Routes>
    </>
  );
}
