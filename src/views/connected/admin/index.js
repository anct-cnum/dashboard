import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import TableauStructures from './structures/TableauStructures';

export default function Admin() {

  return (
    <>
      <Routes>
        <Route path="/admin/informations" element={<MesInformations />} />
        <Route path="/liste-structures" element={<TableauStructures />} />
        <Route path="/admin/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
