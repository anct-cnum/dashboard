import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import StructureDetails from './structures/StructureDetails';
import Page404 from '../Page404';
import TableauStructures from './structures/TableauStructures';
import ConseillerDetails from './conseillers/ConseillerDetails';
import TableauConseillers from './conseillers/TableauConseillers';

export default function Hub() {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage,</h3>
            <p>Cet espace vous permet de visualiser l&rsquo;ensemble des informations des Conum que vous coordonnez ainsi que celles de leur structure,
              de t&eacute;l&eacute;charger les donn&eacute;es statistiques des Conum ou encore consulter toute la documentation li&eacute;e au dispositif.</p>
          </div>
        </div>
      }
      <Routes>
        <Route path="/hub/informations" element={<MesInformations />} />
        <Route path="/hub/liste-structures" element={<TableauStructures />} />
        <Route path="/hub/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/hub/liste-conseillers" element={<TableauConseillers />} />
        <Route path="/hub/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/hub/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
