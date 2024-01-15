import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import ConseillerDetails from './conseillers/ConseillerDetails';
import StructureDetails from './structures/StructureDetails';
import Page404 from '../Page404';
import TableauTerritoires from './../commun/statistiques/TableauTerritoires';
import TableauStructures from './structures/TableauStructures';
import TableauConseillers from './conseillers/TableauConseillers';
import CoordinateurDetails from './coordinateurs/CoordinateurDetail';
import TableauCoordinateurs from './coordinateurs/TableauCoordinateurs';
import TableauCandidaturesStructures from './candidaturesStructures/TableauCandidaturesStructures';
import CandidatureStructureDetail from './candidaturesStructures/CandidatureStructureDetail';

export default function Prefet() {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage,</h3>
            <p>Nous sommes ravis de vous accueillir sur votre nouvel espace de pilotage.</p>
            <p>Pour g&eacute;rer au mieux le dispositif Conseiller num&eacute;rique au sein de votre territoire, vous avez besoin d&rsquo;indicateurs et
              d&rsquo;informations cl&eacute;s pour suivre et piloter l&rsquo;activit&eacute; des structures, des conseillers num&eacute;rique et des
              conseillers num&eacute;rique coordinateurs. C&rsquo;est pourquoi votre espace change et &eacute;volue&nbsp;!</p>
            <p>Il permet de&nbsp;:
              <ul>
                <li>Visualiser le liste des structures laur&eacute;ates de votre territoire</li>
                <li>Visualiser la liste des conseillers num&eacute;rique exerçant sur votre territoire</li>
                <li>Consulter le formulaire de motivation d&rsquo;une structure candidate au poste de coordinateur</li>
                <li>Donner un avis sur une candidature de coordinateur</li>
                <li>D&rsquo;acc&eacute;der aux informations g&eacute;n&eacute;rales d&rsquo;une structure et d&rsquo;un conseiller</li>
                <li>Visualiser les statistiques des conseillers et celles des structures</li>
              </ul>
              Et bien plus encore...
            </p>
            <p><b>Vous avez des questions&nbsp;?</b></p>
            <p>L&rsquo;&eacute;quipe d&rsquo;animation se tient &agrave; votre disposition par email &agrave; l&rsquo;adresse&nbsp;:&nbsp;
              <a className="email" href={'mailto:conseiller-numerique@anct.gouv.fr'}>conseiller-numerique@anct.gouv.fr</a></p>
          </div>
        </div>
      }
      <Routes>
        <Route path="/prefet/informations" element={<MesInformations />} />
        <Route path="/prefet/demandes/coordinateur/:idStructure" element={<CoordinateurDetails />} />
        <Route path="/prefet/demandes/coordinateurs" element={<TableauCoordinateurs />} />
        <Route path="/prefet/demandes/conseillers" element={<TableauCandidaturesStructures />} />
        <Route path="/prefet/demandes/conseiller/:idStructure" element={<CandidatureStructureDetail />} />
        <Route path="/prefet/liste-structures" element={<TableauStructures />} />
        <Route path="/prefet/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/prefet/liste-conseillers" element={<TableauConseillers />} />
        <Route path="/prefet/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/prefet/statistiques-territoires" element={<TableauTerritoires />} />
        <Route path="/prefet/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
