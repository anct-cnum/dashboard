import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../../components/Spinner';
import Pagination from '../../../../../components/Pagination';
import { scrollTopWindow } from '../../../../../utils/exportsUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import Coordinateur from './Coordinateur';
import BannerConfirmationAvisPrefet from '../BannerConfirmationAvisPrefet';
import { alerteEtSpinnerActions, coordinateurActions, filtresDemandesActions, paginationActions } from '../../../../../actions';
import FiltresEtTrisCandidatures from '../FiltresEtTrisCandidatures';

export default function TableauCoordinateurs() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.coordinateur?.loading);
  const error = useSelector(state => state.coordinateur?.error);
  const coordinateurs = useSelector(state => state.coordinateur);
  const ordre = useSelector(state => state.filtresDemandes?.ordre);
  const ordreNom = useSelector(state => state.filtresDemandes?.ordreNomCoordinateur);
  const filtreSearchBar = useSelector(state => state.filtresDemandes?.nom);
  const filtreDepartement = useSelector(state => state.filtresDemandes?.departement);
  const filtreRegion = useSelector(state => state.filtresDemandes?.region);
  const filtreAvisPrefet = useSelector(state => state.filtresDemandes?.avisPrefet);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initDemandeCoordinateur, setInitDemandeCoordinateur] = useState(false);
  const [statutDemande, setStatutDemande] = useState(location.state?.statutDemande || 'toutes');

  useEffect(() => {
    if (coordinateurs?.items && coordinateurs?.items?.total > 0) {
      const count = Math.floor(coordinateurs.items.total / coordinateurs.items.limit);
      dispatch(paginationActions.setPageCount(coordinateurs.items.total % coordinateurs.items.limit === 0 ? count : count + 1));
    }
  }, [coordinateurs]);

  useEffect(() => {
    if (initDemandeCoordinateur === true) {
      dispatch(coordinateurActions.getAllDemandesCoordinateur(
        currentPage,
        statutDemande,
        filtreSearchBar,
        filtreDepartement,
        filtreRegion,
        filtreAvisPrefet,
        ordreNom,
        ordre ? 1 : -1
      ));
    }
  }, [currentPage, statutDemande, filtreSearchBar, filtreDepartement, filtreAvisPrefet, filtreRegion, ordre, ordreNom]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initDemandeCoordinateur === false && page !== undefined) {
        dispatch(coordinateurActions.getAllDemandesCoordinateur(
          page,
          statutDemande,
          filtreSearchBar,
          filtreDepartement,
          filtreRegion,
          filtreAvisPrefet,
          ordreNom,
          ordre ? 1 : -1
        ));
        navigate(location.pathname, { replace: true });
        setInitDemandeCoordinateur(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les demandes de coordinateurs à traiter n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesActions.changeOrdreCoordinateur(e.currentTarget?.id));
  };

  const closeBanner = idDemande => {
    const demandeCoordinateur = coordinateurs?.items?.data?.find(demande => demande?.id === idDemande);
    if (demandeCoordinateur?.banniereValidationAvisPrefet === true) {
      dispatch(coordinateurActions.closeBanner(demandeCoordinateur?.id, demandeCoordinateur?.idStructure, 'banniereValidationAvisPrefet'));
      return;
    }
    dispatch(alerteEtSpinnerActions.getMessageAlerte({
      type: 'error',
      message: 'La bannière n\'a pas pu être fermée !',
      status: null, description: null
    }));
  };

  const demandesCoordinateurWithBanner = coordinateurs?.items?.data?.filter(demande => demande?.banniereValidationAvisPrefet === true);

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      {demandesCoordinateurWithBanner?.length > 0 && demandesCoordinateurWithBanner?.map((coordinateur, idx) => {
        return (
          <BannerConfirmationAvisPrefet
            key={idx}
            closeBanner={closeBanner}
            nomStructure={coordinateur?.nomStructure}
            avisPrefet={coordinateur?.avisPrefet}
            idDemande={coordinateur?.id}
          />
        );
      })
      }
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className="fr-h1 title">Demandes de coordinateur &agrave; traiter</h1>
          <div className="fr-mt-4w">
            <ul className="tabs fr-tags-group">
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('toutes');
              }} className="fr-tag" aria-pressed={statutDemande === 'toutes'}>
                Afficher toutes les candidatures ({coordinateurs?.items?.totalParDemandesCoordinateur?.total})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('en_cours');
              }} className="fr-tag" aria-pressed={statutDemande === 'en_cours'}>
                Nouvelles candidatures ({coordinateurs?.items?.totalParDemandesCoordinateur?.nouvelleCandidature})
              </button>
              <button onClick={() => setStatutDemande('validee')} className="fr-tag" aria-pressed={statutDemande === 'validee'}>
                Candidatures valid&eacute;es par l&rsquo;ANCT ({coordinateurs?.items?.totalParDemandesCoordinateur?.candidatureValider})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('refusee');
              }} className="fr-tag" aria-pressed={statutDemande === 'refusee'}>
                Candidatures refus&eacute;es par l&rsquo;ANCT ({coordinateurs?.items?.totalParDemandesCoordinateur?.candidatureNonRetenus})
              </button>
            </ul>
            <div className="fr-col-12 fr-mt-3w">
              <FiltresEtTrisCandidatures />
            </div>
            <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
              <div className="fr-col-12">
                <div className="fr-table">
                  <table className={coordinateurs?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                    <thead>
                      <tr>
                        <th style={{ width: '40rem' }}>Structure</th>
                        <th style={{ width: '19rem' }}>
                          <button id="codePostal" className="filtre-btn" onClick={ordreColonne}>
                            <span>CP
                              {(ordreNom !== 'codePostal' || ordreNom === 'codePostal' && ordre) &&
                                <i className="ri-arrow-down-s-line chevron icone"></i>
                              }
                              {(ordreNom === 'codePostal' && !ordre) &&
                                <i className="ri-arrow-up-s-line chevron icone"></i>
                              }
                            </span>
                          </button>
                        </th>
                        <th style={{ width: '20rem' }}>
                          <button id="dateCandidature" className="filtre-btn" onClick={ordreColonne}>
                            <span>Date de candidature
                              {(ordreNom !== 'dateCandidature' || ordreNom === 'dateCandidature' && ordre) &&
                                <i className="ri-arrow-down-s-line chevron icone"></i>
                              }
                              {(ordreNom === 'dateCandidature' && !ordre) &&
                                <i className="ri-arrow-up-s-line chevron icone"></i>
                              }
                            </span>
                          </button>
                        </th>
                        <th style={{ width: '15rem' }}>Avis pr&eacute;fet</th>
                        <th style={{ width: '7rem' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {!error && !loading && coordinateurs?.items?.data?.map((coordinateur, idx) => {
                        return (<Coordinateur key={idx} coordinateur={coordinateur} statutDemande={statutDemande} />);
                      })
                      }
                      {(!coordinateurs?.items || coordinateurs?.items?.total === 0) &&
                        <tr>
                          <td colSpan="12" style={{ width: '60rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span className="not-found">Aucune demande de coordinateur trouv&eacute;e</span>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              {coordinateurs?.items?.data?.length > 0 &&
                <Pagination />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
