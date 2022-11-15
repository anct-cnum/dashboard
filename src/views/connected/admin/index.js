import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import TableauStructures from './structures/TableauStructures';
import ConseillerDetails from './ConseillerDetails';
import StructureDetails from './structures/StructureDetails';

export default function Admin() {

  const location = useLocation();

  return (
    <>
      { location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage</h3>
          </div>
        </div>
      }
      <Routes>
        <Route path="/admin/informations" element={<MesInformations />} />
        <Route path="/admin/liste-structures" element={<TableauStructures />} />
        <Route path="/admin/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/admin/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/admin/exports" element={<Exports />} />
      </Routes>
    </>
  );
}
