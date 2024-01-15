import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, filtresDemandesCoordinateurActions, structureActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import FiltresEtTrisCandidatureStructure from './FiltresEtTrisCandidatureStructure';
import CandidatureStructure from './CandidatureStructure';

export default function TableauCandidaturesStructures() {

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
  const [initDemandeCoordinateur, setInitDemandeCoordinateur] = useState(false);
  const [statutDemande, setStatutDemande] = useState('toutes');

  useEffect(() => {
    if (coordinateurs?.items && coordinateurs?.items?.total > 0) {
      const count = Math.floor(coordinateurs.items.total / coordinateurs.items.limit);
      dispatch(paginationActions.setPageCount(coordinateurs.items.total % coordinateurs.items.limit === 0 ? count : count + 1));
    }
  }, [coordinateurs]);

  useEffect(() => {
    if (initDemandeCoordinateur === true) {
      dispatch(structureActions.getAllCandidaturesStructures(
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
        dispatch(structureActions.getAllCandidaturesStructures(
          page,
          statutDemande,
          filtreSearchBar,
          filtreDepartement,
          filtreRegion,
          filtreAvisPrefet,
          ordreNom,
          ordre ? 1 : -1
        ));
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
    dispatch(filtresDemandesCoordinateurActions.changeOrdre(e.currentTarget?.id));
  };

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className="fr-h1 title">Candidatures de conseillers num&eacute;riques &agrave; traiter</h1>
          <div className="fr-mt-4w">
            <ul className="tabs fr-tags-group">
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('toutes');
              }} className="fr-tag" aria-pressed={statutDemande === 'toutes'}>
                Afficher toutes les candidatures ({coordinateurs?.items?.totalParDemandesConseiller?.total})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('CREEE');
              }} className="fr-tag" aria-pressed={statutDemande === 'CREEE'}>
                Nouvelles candidatures ({coordinateurs?.items?.totalParDemandesConseiller?.nouvelleCandidature})
              </button>
              <button onClick={() => setStatutDemande('VALIDATION_COSELEC')} className="fr-tag" aria-pressed={statutDemande === 'VALIDATION_COSELEC'}>
                Candidatures valid&eacute;es par l&rsquo;ANCT ({coordinateurs?.items?.totalParDemandesConseiller?.candidatureValider})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('REFUS_COSELEC');
              }} className="fr-tag" aria-pressed={statutDemande === 'REFUS_COSELEC'}>
                Candidatures refus&eacute;es par l&rsquo;ANCT ({coordinateurs?.items?.totalParDemandesConseiller?.candidatureNonRetenus})
              </button>
            </ul>
            <div className="fr-col-12 fr-mt-3w">
              <FiltresEtTrisCandidatureStructure />
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
                          <button id="createdAt" className="filtre-btn" onClick={ordreColonne}>
                            <span>Date de candidature
                              {(ordreNom !== 'createdAt' || ordreNom === 'createdAt' && ordre) &&
                                <i className="ri-arrow-down-s-line chevron icone"></i>
                              }
                              {(ordreNom === 'createdAt' && !ordre) &&
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
                        return (<CandidatureStructure key={idx} structure={coordinateur} />);
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
