import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, filtresDemandesActions, structureActions } from '../../../../../actions';
import Spinner from '../../../../../components/Spinner';
import Pagination from '../../../../../components/Pagination';
import { scrollTopWindow } from '../../../../../utils/exportsUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import CandidatureConseiller from './CandidatureConseiller';
import BannerConfirmationAvisPrefet from '../BannerConfirmationAvisPrefet';
import FiltresEtTrisCandidatures from '../FiltresEtTrisCandidatures';

export default function TableauCandidaturesConseillers() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.structure?.loading);
  const error = useSelector(state => state.structure?.error);
  const structures = useSelector(state => state.structure);
  const ordre = useSelector(state => state.filtresDemandes?.ordre);
  const ordreNom = useSelector(state => state.filtresDemandes?.ordreNomConseiller);
  const filtreSearchBar = useSelector(state => state.filtresDemandes?.nom);
  const filtreDepartement = useSelector(state => state.filtresDemandes?.departement);
  const filtreRegion = useSelector(state => state.filtresDemandes?.region);
  const filtreAvisPrefet = useSelector(state => state.filtresDemandes?.avisPrefet);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initDemandeConseiller, setInitDemandeConseiller] = useState(false);
  const [statutDemande, setStatutDemande] = useState(location.state?.statutDemande || 'toutes');

  useEffect(() => {
    if (structures?.items && structures?.items?.total > 0) {
      const count = Math.floor(structures.items.total / structures.items.limit);
      dispatch(paginationActions.setPageCount(structures.items.total % structures.items.limit === 0 ? count : count + 1));
    }
  }, [structures]);

  useEffect(() => {
    if (initDemandeConseiller === true) {
      dispatch(structureActions.getAllDemandesConseiller(
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
      if (initDemandeConseiller === false && page !== undefined) {
        dispatch(structureActions.getAllDemandesConseiller(
          page,
          statutDemande,
          filtreSearchBar,
          filtreDepartement,
          filtreRegion,
          filtreAvisPrefet,
          ordreNom,
          ordre ? -1 : 1
        ));
        navigate(location.pathname, { replace: true });
        setInitDemandeConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les demandes de candidatures conseillers numériques à traiter n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresDemandesActions.changeOrdreConseiller(e.currentTarget?.id));
  };

  const closeBanner = idDemande => dispatch(structureActions.closeBannerAvisPrefet(idDemande));

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      {structures?.items?.structureBannerAvisPrefetOpen.length > 0 && structures?.items?.structureBannerAvisPrefetOpen?.map((structure, idx) => {
        return (
          <BannerConfirmationAvisPrefet
            key={idx}
            closeBanner={closeBanner}
            nomStructure={structure.nom}
            avisPrefet={structure.prefet[0].avisPrefet === 'POSITIF' ? 'favorable' : 'défavorable'}
            idDemande={structure._id}
          />
        );
      })
      }
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className="fr-h1 title">Candidatures de conseillers num&eacute;riques &agrave; traiter</h1>
          <div className="fr-mt-4w">
            <ul className="tabs fr-tags-group">
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('toutes');
              }} className="fr-tag" aria-pressed={statutDemande === 'toutes'}>
                Afficher toutes les candidatures ({structures?.items?.totalParDemandesConseiller?.total})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('CREEE');
              }} className="fr-tag" aria-pressed={statutDemande === 'CREEE'}>
                Nouvelles candidatures ({structures?.items?.totalParDemandesConseiller?.nouvelleCandidature})
              </button>
              <button onClick={() => setStatutDemande('VALIDATION_COSELEC')} className="fr-tag" aria-pressed={statutDemande === 'VALIDATION_COSELEC'}>
                Candidatures valid&eacute;es par l&rsquo;ANCT ({structures?.items?.totalParDemandesConseiller?.candidatureValider})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setStatutDemande('REFUS_COSELEC');
              }} className="fr-tag" aria-pressed={statutDemande === 'REFUS_COSELEC'}>
                Candidatures refus&eacute;es par l&rsquo;ANCT ({structures?.items?.totalParDemandesConseiller?.candidatureNonRetenus})
              </button>
            </ul>
            <div className="fr-col-12 fr-mt-3w">
              <FiltresEtTrisCandidatures />
            </div>
            <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
              <div className="fr-col-12">
                <div className="fr-table">
                  <table className={structures?.items?.data?.length < 2 ? 'no-result-table' : ''}>
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
                      {!error && !loading && structures?.items?.data?.map((structure, idx) => {
                        return (<CandidatureConseiller key={idx} structure={structure} statutDemande={statutDemande} />);
                      })
                      }
                      {(!structures?.items || structures?.items?.total === 0) &&
                        <tr>
                          <td colSpan="12" style={{ width: '60rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span className="not-found pair">Aucune candidature de conseillers num&eacute;riques trouv&eacute;es</span>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              {structures?.items?.data?.length > 0 &&
                <Pagination />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
