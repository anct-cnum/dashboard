import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conventionActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import Pagination from '../../../components/Pagination';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import Conventionnement from './conventionnement/Conventionnement';
import AvenantAjoutPoste from './avenantAjoutPoste/AvenantAjoutPoste';
import AvenantRenduPoste from './avenantRenduPoste/AvenantRenduPoste';
import { filtresConventionsActions } from '../../../actions/filtresConventionsActions';
import FiltresEtTrisConvention from './FiltresEtTrisConvention';

export default function TableauConvention() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.convention?.loading);
  const error = useSelector(state => state.convention?.error);
  const conventions = useSelector(state => state.convention);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const ordre = useSelector(state => state.filtresConventions?.ordre);
  const ordreNom = useSelector(state => state.filtresConventions?.ordreNom);
  const filtreParNomStructure = useSelector(state => state.filtresConventions?.nom);
  const filterDepartement = useSelector(state => state.filtresConventions?.departement);
  const filtreRegion = useSelector(state => state.filtresConventions?.region);
  const [initConseiller, setInitConseiller] = useState(false);
  const [typeConvention, setTypeConvention] = useState('toutes');

  useEffect(() => {
    if (conventions?.items && conventions?.items.limit !== 0) {
      const count = Math.floor(conventions.items.total / conventions.items.limit);
      dispatch(paginationActions.setPageCount(conventions.items.total % conventions.items.limit === 0 ? count : count + 1));
    }
  }, [conventions]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conventionActions.getAll(currentPage, typeConvention, filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre ? -1 : 1));
    }
  }, [currentPage, typeConvention, ordreNom, ordre, filtreParNomStructure, filterDepartement, filtreRegion]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      dispatch(filtresConventionsActions.resetFiltre());
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(conventionActions.getAll(page, typeConvention, filtreParNomStructure, filterDepartement, filtreRegion, ordreNom, ordre ? -1 : 1));
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

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      <div className="fr-grid-row">
        <div className="fr-col-12">
          <h1 className="fr-h1 title">Demandes de conventions</h1>
          <span>Retrouvez ici toutes les demandes de conventionnement, reconventionnement et avenants &agrave; valider.</span>
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
              <FiltresEtTrisConvention />
            </div>
            <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
              <div className="fr-col-12">
                <div className="fr-table">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '5rem' }}>Id</th>
                        <th style={{ width: '15rem' }}>Nom de la structure</th>
                        <th style={{ width: '12rem' }}>
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
                        <th>Date de fin du prochain contrat</th>
                        <th>Nombre de postes</th>
                        <th style={{ width: '12rem' }}>Type de la demande</th>
                        <th style={{ width: '12rem' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {!error && !loading && conventions?.items?.data?.map((convention, idx) =>
                        <tr key={idx}>
                          {convention?.typeConvention === 'conventionnement' &&
                            <Conventionnement conventionnement={convention} />
                          }
                          {convention?.typeConvention === 'avenantAjoutPoste' &&
                            <AvenantAjoutPoste avenant={convention} />
                          }
                          {convention?.typeConvention === 'avenantRenduPoste' &&
                            <AvenantRenduPoste avenant={convention} />
                          }
                        </tr>
                      )}
                      {(!conventions?.items || conventions?.items?.data?.length === 0) &&
                        <tr>
                          <td colSpan="12" style={{ width: '60rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span className="not-found pair">Aucune demande de convention trouv&eacute;</span>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
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
