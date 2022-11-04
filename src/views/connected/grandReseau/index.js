import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import ConseillerDetails from './ConseillerDetails';
import TableauStructures from './structures/TableauStructures';
import StructureDetails from './structures/StructureDetails';

export default function GrandReseau() {

  return (
    <>
      <Routes>
        <Route path="/grandReseau/informations" element={<MesInformations />} />
        <Route path="/grandReseau/liste-structures" element={<TableauStructures />} />
        <Route path="/grandReseau/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/grandReseau/conseiller/:idConseiller" element={<ConseillerDetails />} />
      </Routes>
    </>
  );
}
