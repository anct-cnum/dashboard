import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import TableauGestionnaires from './gestionnaires/TableauGestionnaires';
import ConseillerDetails from './ConseillerDetails';
import StructureDetails from './structures/StructureDetails';
import Page404 from '../Page404';
import TableauCandidatures from './candidatures/TableauCandidatures';
import CandidatDetails from './candidatures/CandidatDetails';
import { useQueryClient } from '@tanstack/react-query';
import { statistiquesService } from '../../../services/statistiquesService';
import { useSelector } from 'react-redux';


export default function Admin() {

  const location = useLocation();
  const dateDebut = useSelector(state => state.statistiques?.dateDebut);
  const dateFin = useSelector(state => state.statistiques?.dateFin);
  const queryClient = useQueryClient();

  const preFetch = async () => await queryClient.prefetchQuery(['statsNationales', dateDebut, dateFin],
    () => statistiquesService.getStatistiquesNationale(dateDebut, dateFin));

  useEffect(() => {
    if (location.pathname.startsWith('/accueil')) {
      preFetch();
    }
  }, []);
  
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
        <Route path="/admin/liste-candidatures" element={<TableauCandidatures />} />
        <Route path="/admin/liste-gestionnaires" element={<TableauGestionnaires />} />
        <Route path="/admin/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/admin/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/admin/candidat/:idCandidat" element={<CandidatDetails />} />
        <Route path="/admin/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
