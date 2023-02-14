import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './ConseillerDetails';
import StructureDetails from './StructureDetails';
import Page404 from '../Page404';
import { useQueryClient } from '@tanstack/react-query';
import { statistiquesService } from '../../../services/statistiquesService';
import { useSelector } from 'react-redux';

export default function Prefet() {

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
      {location.pathname === '/accueil' &&
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
        <Route path="/prefet/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/prefet/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/prefet/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
