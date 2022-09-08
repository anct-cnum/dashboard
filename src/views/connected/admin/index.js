import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import Invitations from './Invitations';

export default function Admin() {
  return (
    <>
      <Routes>
        <Route path="/admin/informations" element={<MesInformations />} />
        <Route path="/admin/exports" element={<Exports />} />
        <Route path="/admin/invitations" element={<Invitations />} />
      </Routes>
    </>
  );
}
