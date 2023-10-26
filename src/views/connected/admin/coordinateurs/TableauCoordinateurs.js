import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, exportsActions, paginationActions, coordinateurActions, filtresDemandesCoordinateurActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { downloadFile, scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import FiltresEtTrisCoordinateur from './FiltresEtTrisCoordinateur';
import Coordinateur from './Coordinateur';
import BannerConfirmationAttributionPoste from './BannerConfirmationAttributionPoste';

export default function TableauCoordinateurs() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.coordinateur?.loading);
  const error = useSelector(state => state.coordinateur?.error);
  const coordinateurs = useSelector(state => state.coordinateur);
  const ordre = useSelector(state => state.filtresDemandesCoordinateur?.ordre);
  const ordreNom = useSelector(state => state.filtresDemandesCoordinateur?.ordreNom);
  const filtreSearchBar = useSelector(state => state.filtresDemandesCoordinateur?.nom);
  const filtreDepartement = useSelector(state => state.filtresDemandesCoordinateur?.departement);
  const filtreRegion = useSelector(state => state.filtresDemandesCoordinateur?.region);
  const filtreAvisPrefet = useSelector(state => state.filtresDemandesCoordinateur?.avisPrefet);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const exportCandidaturesCoordinateursFileBlob = useSelector(state => state.exports);
  const exportCandidaturesCoordinateursFileError = useSelector(state => state.exports?.error);

  const [initDemandeCoordinateur, setInitDemandeCoordinateur] = useState(false);
  const [statutDemande, setStatutDemande] = useState('toutes');

  const has = value => value !== null && value !== undefined;

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
        ordre ? -1 : 1
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
          ordre ? -1 : 1
        ));
        setInitDemandeCoordinateur(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les demandes de coordinateurs à traiter n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  const exportCandidaturesCoordinateurs = () => {
    dispatch(exportsActions.exportCandidaturesCoordinateurs(
      statutDemande,
      filtreSearchBar,
      filtreDepartement,
      filtreRegion,
      filtreAvisPrefet,
      ordreNom,
      ordre ? -1 : 1
    ));
  };

  useEffect(() => {
    if (has(exportCandidaturesCoordinateursFileBlob?.blob) && exportCandidaturesCoordinateursFileError === false) {
      downloadFile(exportCandidaturesCoordinateursFileBlob);
      dispatch(exportsActions.resetFile());
    } else {
      scrollTopWindow();
    }
  }, [exportCandidaturesCoordinateursFileBlob, exportCandidaturesCoordinateursFileError]);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesCoordinateurActions.changeOrdre(e.currentTarget?.id));
  };

  const demandesCoordinateurWithBanner = coordinateurs?.items?.data?.filter(demande => demande?.banniereValidationAvisAdmin === true);

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      {demandesCoordinateurWithBanner?.length > 0 && demandesCoordinateurWithBanner?.map((coordinateur, idx) => {
        return (<BannerConfirmationAttributionPoste key={idx} coordinateur={coordinateur} />);
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
                Candidatures valid&eacute;es ({coordinateurs?.items?.totalParDemandesCoordinateur?.candidatureValider})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('refusee');
              }} className="fr-tag" aria-pressed={statutDemande === 'refusee'}>
                Non valid&eacute;es ({coordinateurs?.items?.totalParDemandesCoordinateur?.candidatureNonRetenus})
              </button>
            </ul>
            <div className="fr-col-12 fr-mt-3w">
              <FiltresEtTrisCoordinateur />
            </div>
            <div className="fr-grid-row fr-grid-row--end fr-mt-3w">
              <div className="fr-ml-auto">
                <button className="fr-btn fr-btn--secondary fr-icon-download-line fr-btn--icon-left" onClick={exportCandidaturesCoordinateurs} >
                  Exporter les donn&eacute;es
                </button>
              </div>
            </div>
            <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
              <div className="fr-col-12">
                <div className="fr-table">
                  <table className={coordinateurs?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                    <thead>
                      <tr>
                        <th style={{ width: '40rem' }}>Structure</th>
                        <th style={{ width: '19rem' }}>CP</th>
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
                        return (<Coordinateur key={idx} coordinateur={coordinateur} />);
                      })
                      }
                      {(!coordinateurs?.items || coordinateurs?.items?.total === 0) &&
                        <tr>
                          <td colSpan="12" style={{ width: '60rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span className="not-found pair">Aucunes demandes de coordinateur trouv&eacute;es</span>
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
