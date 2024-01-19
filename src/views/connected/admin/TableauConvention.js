import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conventionActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import Pagination from '../../../components/Pagination';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import { statutStructure } from '../../../utils/enumUtils';
import { useLocation } from 'react-router-dom';
import Conventionnement from './conventionnement/Conventionnement';
import AvenantAjoutPoste from './avenantAjoutPoste/AvenantAjoutPoste';
import AvenantRenduPoste from './avenantRenduPoste/AvenantRenduPoste';
import { filtresConventionsActions } from '../../../actions/filtresConventionsActions';
import FiltresEtTrisConvention from './FiltresEtTrisConvention';
import TableauConventionnement from './conventionnement/TableauConventionnement';
import FiltresEtTrisConventionnement from './conventionnement/FiltresEtTrisConventionnement';

export default function TableauConvention() {

  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector(state => state.convention?.loading);
  const error = useSelector(state => state.convention?.error);
  const conventions = useSelector(state => state.convention);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const ordre = useSelector(state => state.filtresConventions?.ordre);
  const ordreNom = useSelector(state => state.filtresConventions?.ordreNom);
  const filtreParNomStructure = useSelector(state => state.filtresConventions?.nom);
  const filterDepartement = useSelector(state => state.filtresConventions?.departement);
  const filtreRegion = useSelector(state => state.filtresConventions?.region);
  const filtreAvisPrefet = useSelector(state => state.filtresConventions?.avisPrefet);

  const [page, setPage] = useState(location.state?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);
  const [typeConvention, setTypeConvention] = useState(location.state?.typeConvention || 'toutes');
  const [candidatureStructure, setCandidatureStructure] = useState(location.state?.structure || null);

  useEffect(() => {
    if (conventions?.items && conventions?.items.limit !== 0) {
      const count = Math.floor(conventions.items.total / conventions.items.limit);
      dispatch(paginationActions.setPageCount(conventions.items.total % conventions.items.limit === 0 ? count : count + 1));
    }
  }, [conventions]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conventionActions.getAll(
        currentPage,
        typeConvention,
        filtreParNomStructure,
        filterDepartement,
        filtreRegion,
        filtreAvisPrefet,
        ordreNom,
        ordre ? -1 : 1
      ));
    }
  }, [currentPage, typeConvention, ordreNom, ordre, filtreParNomStructure, filterDepartement, filtreRegion, filtreAvisPrefet]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      dispatch(filtresConventionsActions.resetFiltre());
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(conventionActions.getAll(
          page,
          typeConvention,
          filtreParNomStructure,
          filterDepartement,
          filtreRegion,
          filtreAvisPrefet,
          ordreNom,
          ordre ? -1 : 1
        ));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les dossiers n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConventionsActions.changeOrdre(e.currentTarget?.id));
  };

  useEffect(() => {
    if (candidatureStructure) {
      setTimeout(() => {
        setCandidatureStructure(null);
      }, 20000);
    }
  }, [candidatureStructure]);
  
  return (
    <div className="conventions">
      <Spinner loading={loading} />
      {candidatureStructure?.statut === statutStructure.REFUS_COSELEC &&
        <div className="fr-alert fr-alert--error" style={{ marginBottom: '2rem' }} >
          <h3 className="fr-alert__title">
            L&rsquo;attribution d&rsquo;un poste de conseiller a &eacute;t&eacute; refus&eacute; par
            le comit&eacute; de s&eacute;lection pour la structure {candidatureStructure?.nom}.
          </h3>
          <p>La structure sera notifi&eacute;e sur son espace.</p>
        </div>
      }
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className="fr-h1 title">Demandes de conventions</h1>
          <div className="fr-mt-4w">
            <ul className="tabs fr-tags-group">
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setTypeConvention('toutes');
              }} className="fr-tag" aria-pressed={typeConvention === 'toutes'}>
                Afficher toutes les demandes ({conventions?.items?.totalParConvention?.total})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setTypeConvention('conventionnement');
              }} className="fr-tag" aria-pressed={typeConvention === 'conventionnement'}>
                Conventionnement initial ({conventions?.items?.totalParConvention?.conventionnement})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setTypeConvention('avenantAjoutPoste');
              }} className="fr-tag" aria-pressed={typeConvention === 'avenantAjoutPoste'}>
                Avenant · ajout de poste ({conventions?.items?.totalParConvention?.avenantAjoutPoste})
              </button>
              <button onClick={() => {
                dispatch(paginationActions.setPage(1));
                setTypeConvention('avenantRenduPoste');
              }} className="fr-tag" aria-pressed={typeConvention === 'avenantRenduPoste'}>
                Avenant · poste rendu ({conventions?.items?.totalParConvention?.avenantRenduPoste})
              </button>
            </ul>
            <div className="fr-col-12 fr-mb-2w fr-mt-3w">
              {typeConvention === 'conventionnement' ?
                <FiltresEtTrisConventionnement /> : <FiltresEtTrisConvention />
              }
            </div>
            <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
              <div className="fr-col-12">
                <div className="fr-table">
                  {typeConvention === 'conventionnement' ?
                    <TableauConventionnement
                      conventions={conventions}
                      loading={loading}
                      error={error}
                      ordreNom={ordreNom}
                      ordre={ordre}
                    /> :
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: '40rem' }}>Structure</th>
                          <th style={{ width: '18rem' }}>
                            <button id="dateDemande" className="filtre-btn" onClick={ordreColonne}>
                              <span>Date de la demande
                                {(ordreNom !== 'dateDemande' || ordreNom === 'dateDemande' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'dateDemande' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th style={{ width: '20rem' }}>Nb. de postes demand&eacute;s</th>
                          <th style={{ width: '18rem' }}>Type de demande</th>
                          <th style={{ width: '8rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && conventions?.items?.data?.map((convention, idx) =>
                          <tr key={idx}>
                            {convention?.typeConvention === 'conventionnement' &&
                              <Conventionnement structure={convention} typeConvention={typeConvention} />
                            }
                            {convention?.typeConvention === 'avenantAjoutPoste' &&
                              <AvenantAjoutPoste avenant={convention} typeConvention={typeConvention} />
                            }
                            {convention?.typeConvention === 'avenantRenduPoste' &&
                              <AvenantRenduPoste avenant={convention} typeConvention={typeConvention} />
                            }
                          </tr>
                        )}
                        {(!conventions?.items || conventions?.items?.data?.length === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '60rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found">Aucune demande de convention trouv&eacute;</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  }
                </div>
              </div>
              {conventions?.items?.data?.length > 0 &&
                <Pagination />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
