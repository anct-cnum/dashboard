import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import ConseillerDetails from './ConseillerDetails';
import TableauStructures from './structures/TableauStructures';
import StructureDetails from './structures/StructureDetails';

export default function GrandReseau() {

  const location = useLocation();

  return (
    <>
      { location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage,</h3>
            <p>Cet espace vous permet de visualiser l&rsquo;ensemble des informations des CnFS que vous coordonnez ainsi que celles de leur structure,
              de t&eacute;l&eacute;charger les donn&eacute;es statistiques des CnFS ou encore consulter toute la documentation li&eacute;e au dispositif.</p>
          </div>
        </div>
      }
      <Routes>
        <Route path="/grandReseau/informations" element={<MesInformations />} />
        <Route path="/grandReseau/liste-structures" element={<TableauStructures />} />
        <Route path="/grandReseau/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/grandReseau/conseiller/:idConseiller" element={<ConseillerDetails />} />
      </Routes>
    </>
  );
}
