import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';
import TableauStructures from './structures/TableauStructures';
import StructureDetails from './structures/StructureDetails';

export default function Coordinateur() {

  return (
    <>
      <Routes>
        <Route path="/coordinateur_coop/informations" element={<MesInformations />} />
        <Route path="/coordinateur_coop/liste-structures" element={<TableauStructures />} />
        <Route path="/coordinateur_coop/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/coordinateur_coop/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/coordinateur_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
