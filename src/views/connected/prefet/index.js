import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';
import TableauStructures from './structures/TableauStructures';
import StructureDetails from './structures/StructureDetails';

export default function Prefet() {

  return (
    <>
      <Routes>
        <Route path="/prefet/informations" element={<MesInformations />} />
        <Route path="/prefet/liste-structures" element={<TableauStructures />} />
        <Route path="/prefet/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/prefet/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/prefet/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
