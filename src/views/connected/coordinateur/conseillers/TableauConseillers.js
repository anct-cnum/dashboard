import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conseillerActions, statistiquesActions, filtresStructuresActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import FiltresEtTrisConseillers from './FiltresEtTrisConseillers';
import Conseiller from './Conseiller';

export default function TableauConseillers() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);
  const ordre = useSelector(state => state.filtresConseillers?.ordre);
  const ordreNom = useSelector(state => state.filtresConseillers?.ordreNom);
  const loading = useSelector(state => state.conseiller?.loading);
  const error = useSelector(state => state.conseiller?.error);
  const conseillers = useSelector(state => state.conseiller);
  const filtreParNomConseiller = useSelector(state => state.filtresConseillers?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresConseillers?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresConseillers?.region);
  const filterDepartement = useSelector(state => state.filtresConseillers?.departement);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeOrdre(e.currentTarget?.id));
  };

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
    }
  }, [conseillers]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conseillerActions.getConseillersCoordonnes(currentPage, filtreParNomConseiller, filtreRegion,
        filterDepartement, filtreParNomStructure, ordreNom, ordre ? 1 : -1));
    }
  }, [currentPage, filtreParNomConseiller, ordreNom, ordre, filtreRegion, filterDepartement, filtreParNomStructure]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(statistiquesActions.resetFiltre());
        dispatch(conseillerActions.getConseillersCoordonnes(page, filtreParNomConseiller, filtreRegion,
          filterDepartement, filtreParNomStructure, ordreNom, ordre ? 1 : -1));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les conseillers n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  return (
    <div className="conseillers">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <FiltresEtTrisConseillers />
            <div className="fr-container--fluid">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table className={conseillers?.items?.data?.length < 3 ? 'no-result-table' : ''}>
                      <thead>
                        <tr>
                          <th>
                            <button id="idPG" className="filtre-btn" onClick={ordreColonne}>
                              <span>Id</span>
                            </button>
                          </th>
                          <th>
                            <button id="nom" className="filtre-btn" onClick={ordreColonne}>
                              <span>Nom</span>
                            </button>
                          </th>
                          <th>
                            <button id="prenom" className="filtre-btn" onClick={ordreColonne}>
                              <span>Pr&eacute;nom</span>
                            </button>
                          </th>
                          <th>Structure</th>
                          <th>CD</th>
                          <th>D&eacute;but de contrat</th>
                          <th>Fin de contrat</th>
                          <th>Activ&eacute;</th>
                          <th>CRA saisis</th>
                          <th>Groupe CRA</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && conseillers?.items?.data?.map((conseiller, idx) => {
                          return (<Conseiller key={idx} conseiller={conseiller} />);
                        })
                        }
                        {(!conseillers?.items || conseillers?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucun conseiller trouv&eacute;</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {conseillers?.items?.total !== 0 &&
                  <Pagination />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
