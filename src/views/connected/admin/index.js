import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Exports from './Exports';
import Informations from './Informations';
import Invitations from './Invitations';

export default function Admin() {
  return (
    <>
      <Routes>
        <Route path="/admin/informations" element={<Informations />} /> {/* Routes spécifiques avec /admin */}
        <Route path="/admin/exports" element={<Exports />} />
        <Route path="/admin/invitation" element={<Invitations />} />
      </Routes>
    </>
  );
}
