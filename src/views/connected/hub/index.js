import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';
import TableauStructures from './structures/TableauStructures';
import StructureDetails from './structures/StructureDetails';

export default function Hub() {

  return (
    <>
      <Routes>
        <Route path="/hub_coop/informations" element={<MesInformations />} />
        <Route path="/hub_coop/liste-structures" element={<TableauStructures />} />
        <Route path="/hub_coop/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/hub_coop/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/hub_coop/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
