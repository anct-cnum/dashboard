import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conseillerActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import FiltresEtTrisCandidatures from './FiltresEtTrisCandidatures';
import Candidat from './Candidat';

export default function TableauCandidatures() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.conseiller?.loading);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const error = useSelector(state => state.conseiller?.error);
  const conseillers = useSelector(state => state.conseiller);
  const filtreParNomCandidat = useSelector(state => state.filtresCandidatures?.nomCandidat);
  const filtreRegion = useSelector(state => state.filtresCandidatures?.region);
  const filterDepartement = useSelector(state => state.filtresCandidatures?.departement);
  const filtreComs = useSelector(state => state.filtresCandidatures?.coms);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
    }
  }, [conseillers]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conseillerActions.getAllCandidatsByAdmin(currentPage, filtreParNomCandidat, filtreRegion, filtreComs, filterDepartement));
    }
  }, [currentPage, filterDepartement, filtreComs, filtreParNomCandidat, filtreRegion]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(conseillerActions.getAllCandidatsByAdmin(currentPage, filtreParNomCandidat, filtreRegion, filtreComs, filterDepartement));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les candidats n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  useEffect(() => {
    if (conseillers.downloadError && conseillers.downloadError !== false) {
      scrollTopWindow();
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Le CV n\'a pas pu être récupéré !',
        status: null, description: null
      }));
    }
  }, [conseillers.downloadError]);

  return (
    <div className="conseillers">
      <Spinner loading={loading || downloading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <FiltresEtTrisCandidatures />
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table className={conseillers?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Prénom</th>
                          <th>Nom</th>
                          <th>Date de candidature</th>
                          <th>Code postal</th>
                          <th>Résultat Pix</th>
                          <th>Curriculum Vit&aelig;</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && conseillers?.items?.data?.map((conseiller, idx) => {
                          return (<Candidat key={idx} candidat={conseiller} />);
                        })
                        }
                        {(!conseillers?.items || conseillers?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '60rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucun candidat trouv&eacute;</span>
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
