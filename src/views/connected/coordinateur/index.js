import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import Exports from './Exports';
import StructureDetails from './structures/StructureDetails';
import Page404 from '../Page404';
import TableauStructures from './structures/TableauStructures';
import ConseillerDetails from './conseillers/ConseillerDetails';
import TableauConseillers from './conseillers/TableauConseillers';

export default function Coordinateur() {

  const location = useLocation();

  return (
    <>
      {location.pathname === '/accueil' &&
        <div className="fr-grid-row fr-grid-row--center fr-my-15w">
          <div className="fr-col--offset-1 fr-col-10">
            <h3>Bienvenue sur votre tableau de pilotage,</h3>
            <p>Nous sommes ravis de vous accueillir sur votre nouvel espace de pilotage.</p>
            <p>
              Nous vous proposons une nouvelle interface de suivi et pilotage des Conseillers num&eacute;rique que vous coordonnez.
              Ce nouvel espace permet de&nbsp;:
            </p>
            <div>
              <ul>
                <li>Visualiser le liste des conseillers num&eacute;rique que vous coordonnez</li>
                <li>Consulter les informations des conseillers num&eacute;rique (activit&eacute;, statistiques…)</li>
                <li>Suivre les statistiques territoriales et nationales du dispositif</li>
              </ul>
                Et bien plus encore...
            </div>
            <br />
            <p><b>Vous avez des questions&nbsp;?</b></p>
            <div>
                L&rsquo;&eacute;quipe d&rsquo;animation se tient &agrave; votre disposition&nbsp;:
              <br />
              <ul>
                <li>Par t&eacute;l&eacute;phone au num&eacute;ro suivant&nbsp;:
                  <b> 01 58 50 89 42 </b>du <b>lundi</b> au <b>jeudi</b> de <b>09h30 &agrave; 12h00</b> et le <b>mercredi de 14h00 &agrave; 16h00.</b></li>
                <li>Par email &agrave; l&rsquo;adresse&nbsp;: <a
                  className="fr-link"
                  href="mailto:conseiller-numerique@anct.gouv.fr"
                  title="conseiller-numerique@anct.gouv.fr">
                    conseiller-numerique@anct.gouv.fr</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
      <Routes>
        <Route path="/coordinateur/informations" element={<MesInformations />} />
        <Route path="/coordinateur/liste-structures" element={<TableauStructures />} />
        <Route path="/coordinateur/structure/:idStructure" element={<StructureDetails />} />
        <Route path="/coordinateur/liste-conseillers" element={<TableauConseillers />} />
        <Route path="/coordinateur/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/coordinateur/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
