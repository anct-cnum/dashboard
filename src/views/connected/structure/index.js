import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MesInformations from './MesInformations';
import MesPostes from './MesPostes';
import DemandeReco from './DemandeReco';
import Exports from './Exports';
import TableauCandidatures from './candidatures/TableauCandidatures';
import CandidatDetails from './candidatures/CandidatDetails';
import ConseillerDetails from './conseillers/ConseillerDetails';
import Page404 from '../Page404';
import MaStructure from './MaStructure';
import PreselectionCandidatDetails from './candidatures/PreselectionCandidatDetails';
import PreselectionConseillerDetails from './candidatures/PreselectionConseillerDetails';
import CandidatureConseillerDetails from './candidatures/CandidatureConseillerDetails';
import RecrutementCoordinateur from './RecrutementCoordinateur';
import TableauConseillers from './conseillers/TableauConseillers';
import GraphiqueConseiller from './candidatures/GraphiqueConseiller';
import { DeniedNewPosteCoordinateurBanner, ValidatedNewPosteCoordinateurBanner } from './banners';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import { alerteEtSpinnerActions } from '../../../actions';

export default function Structure() {
  const location = useLocation();
  const dispatch = useDispatch();
  const displayBanner = useSelector(state => state.authentication?.user?.displayBannerPosteCoordinateurStructure);
  const loadingBannerCoordinateur = useSelector(state => state.coordinateur?.loading);
  const idDemandeCoordinateur = useSelector(state => state.coordinateur?.idDemandeCoordinateur);
  const errorCoordinateur = useSelector(state => state.coordinateur?.error);
  const idStructure = useSelector(state => state.authentication?.user?.entity?.$id);
  const demandesCoordinateurBannerInformation = useSelector(state => state.authentication?.user?.demandesCoordinateurBannerInformation);

  useEffect(() => {
    if (idDemandeCoordinateur) {
      const user = localStorage.getItem('user');
      const formatUser = JSON.parse(user);
      // eslint-disable-next-line max-len
      formatUser.user.demandesCoordinateurBannerInformation = formatUser.user.demandesCoordinateurBannerInformation.filter(demande => demande.id !== idDemandeCoordinateur);
      localStorage.setItem('user', JSON.stringify(formatUser));
    }
    if (errorCoordinateur) {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: errorCoordinateur ?? 'La demande n\'a pas pu être fermée !',
        status: null, description: null
      }));
    }
  }, [idDemandeCoordinateur, errorCoordinateur]);

  const demandesCoordinateurRefusPoste = demandesCoordinateurBannerInformation?.filter(demande => demande.statut === 'refusee');

  return (
    <>
      {location.pathname === '/accueil' &&
        <>
          <Spinner loading={loadingBannerCoordinateur} />
          {demandesCoordinateurRefusPoste?.length > 0 && demandesCoordinateurRefusPoste?.map((coordinateur, idx) => {
            return (<DeniedNewPosteCoordinateurBanner key={idx} idDemandeCoordinateur={coordinateur.id} idStructure={idStructure} />);
          })
          }
          {displayBanner &&
            <ValidatedNewPosteCoordinateurBanner />
          }
          <div className={`fr-grid-row fr-grid-row--center ${displayBanner ? 'fr-my-10w' : 'fr-my-15w'}`}>
            <div className="fr-col--offset-1 fr-col-10">

              <h3>Bienvenue sur votre tableau de pilotage,</h3>
              <p>Nous sommes ravis de vous accueillir sur votre nouvel espace de pilotage.</p>
              <p>
                Pour g&eacute;rer au mieux le dispositif Conseiller num&eacute;rique au sein de votre structure, vous avez besoin d&rsquo;indicateurs
                et d&rsquo;informations cl&eacute;s pour suivre et piloter l&rsquo;activité des conseillers num&eacute;rique.
                C&rsquo;est pourquoi votre espace change et &eacute;volue&nbsp;!
              </p>
              <div>
                Il permet de&nbsp;:
                <ul>
                  <li>S&eacute;lectionner des candidatures</li>
                  <li>D&rsquo;acc&eacute;der &agrave; votre compte D&eacute;marches Simplifi&eacute;es</li>
                  <li>D&eacute;clarer un changement de situation pour un conseiller (ex&nbsp;: rupture de contrat)</li>
                  <li>Faire une demande de re conventionnement</li>
                  <li>Faire une demande de renouvellement de contrat</li>
                  <li>Visualiser les statistiques des conseillers et celles de votre structure</li>
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
                  <li>Par email à l&rsquo;adresse&nbsp;: <a
                    className="fr-link"
                    href="mailto:conseiller-numerique@anct.gouv.fr"
                    title="conseiller-numerique@anct.gouv.fr">
                    conseiller-numerique@anct.gouv.fr</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      }
      <Routes>
        <Route path="/structure/informations" element={<MesInformations />} />
        <Route path="/structure/ma-structure" element={<MaStructure />} />
        <Route path="/structure/postes" element={<MesPostes />} />
        <Route path="/structure/recrutement-coordinateur" element={<RecrutementCoordinateur />} />
        <Route path="/structure/demande-de-reconventionnement" element={<DemandeReco />} />
        <Route path="/structure/liste-conseillers" element={<TableauConseillers />} />
        <Route path="/structure/conseiller/:idConseiller" element={<ConseillerDetails />} />
        <Route path="/structure/candidats/:filter" element={<TableauCandidatures />} />
        <Route path="/structure/candidature/candidat/:id" element={<CandidatDetails />} />
        <Route path="/structure/candidature/conseiller/:id" element={<CandidatureConseillerDetails />} />
        <Route path="/structure/candidature/statistiques-conseiller/:idConseiller" element={<GraphiqueConseiller />} />
        <Route path="/structure/preselection/candidat/:id" element={<PreselectionCandidatDetails />} />
        <Route path="/structure/preselection/conseiller/:idConseiller" element={<PreselectionConseillerDetails />} />
        <Route path="/structure/exports" element={<Exports />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
