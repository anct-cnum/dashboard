import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import TableauGestionnaires from './gestionnaires/TableauGestionnaires';
import ConseillerDetails from './ConseillerDetails';
import StructureDetails from './structures/StructureDetails';
import Page404 from '../Page404';
import TableauCandidatures from './candidatures/TableauCandidatures';
import CandidatDetails from './candidatures/CandidatDetails';
import TableauContrat from './contrats/TableauContrat';
import TableauHistoriqueContrat from './contrats/TableauHistoriqueContrat';
import TableauConvention from './TableauConvention';
import ConventionDetails from './ConventionDetails';
import TableauHistoriqueConvention from './TableauHistoriqueConvention';
import PreFetch from '../commun/statistiques/Components/commun/PreFetch';
import ConseillerDetailsContrat from './contrats/ConseillerDetailsContrat';
import CandidatDetailsRecrutement from './contrats/CandidatDetailsRecrutement';

export default function Admin() {

  const location = useLocation();

  return (
    <>
      <PreFetch />
      {location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage</h3>
          </div>
        </div>
      }
      <Routes>
        <Route path="/admin/informations" element={<MesInformations />} />
        <Route path="/admin/demandes/contrats" element={<TableauContrat />} />
        <Route path="/admin/demandes/contrat/conseiller/:idConseiller/:idMiseEnRelation" element={<ConseillerDetailsContrat />} />
        <Route path="/admin/demandes/contrat/candidat/:idCandidat/:idMiseEnRelation" element={<CandidatDetailsRecrutement />} />
        <Route path="/admin/historique/demandes/contrats" element={<TableauHistoriqueContrat />} />
        <Route path="/admin/demandes/conventions" element={<TableauConvention />} />
        <Route path="/admin/historique/demandes/conventions" element={<TableauHistoriqueConvention />} />
        <Route path="/admin/liste-candidatures" element={<TableauCandidatures />} />
        <Route path="/admin/liste-gestionnaires" element={<TableauGestionnaires />} />
        <Route path="/admin/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/admin/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/admin/candidat/:idCandidat" element={<CandidatDetails />} />
        <Route path="/admin/demandes/convention/:idStructure" element={<ConventionDetails />} />
        <Route path="/admin/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
