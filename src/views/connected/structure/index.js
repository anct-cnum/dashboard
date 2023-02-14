import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import Candidatures from './Candidatures';
import CandidatDetails from './candidatures/CandidatDetails';
import ConseillerDetails from './ConseillerDetails';
import Page404 from '../Page404';
import PreFetch from '../commun/statistiques/Components/commun/PreFetch';

export default function Structure() {

  const location = useLocation();

  return (
    <>
      <PreFetch />
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
        <Route path="/structure/informations" element={<MesInformations />} />
        <Route path="/structure/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/structure/candidats/:filter" element={<Candidatures />} /> {/* Routes spécifiques avec /structure */}
        <Route path="/structure/candidat/:id" element={<CandidatDetails />} />
        <Route path="/structure/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
