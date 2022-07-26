import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';
import TableauStructures from './structures/TableauStructures';
import StructureDetails from './structures/StructureDetails';
import Page404 from '../Page404';

export default function Prefet() {

  const location = useLocation();

  return (
    <>
      { location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage,</h3>
            <p>Cet espace vous permet de visualiser l&rsquo;ensemble des structures qui ont manifest&eacute;s leur int&eacute;r&ecirc;t pour le dispositif
              Conseiller Num&eacute;rique France Services sur votre d&eacute;partement et r&eacute;gion, suivre les statistiques d&rsquo;usages des CnFS
              sur votre territoire ou encore consulter toute la documentation li&eacute;e au dispositif.</p>
          </div>
        </div>
      }
      <Routes>
        <Route path="/prefet/informations" element={<MesInformations />} />
        <Route path="/prefet/liste-structures" element={<TableauStructures />} />
        <Route path="/prefet/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/prefet/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/prefet/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
