import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conseillerActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { Link, useLocation } from 'react-router-dom';
import Contrat from './Contrat';

export default function TableauContrat() {

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
        dispatch(conseillerActions.getAllCandidatsByAdmin(page, filtreParNomCandidat, filtreRegion, filtreComs, filterDepartement));
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
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 style={{ color: '#000091' }} className="fr-h1">Demandes de contrats</h1>
              <span>Retrouvez ici toutes les demandes de recrutements, renouvellements et ruptures de contrat à valider.</span>
            </div>
            
            <div className="fr-container--fluid fr-mt-2w">
              <ul className="tabs fr-tags-group">
                <Link className="fr-tag" aria-pressed="true">Afficher toutes les demandes (42)</Link>
                <Link className="fr-tag" aria-pressed="false">Recrutements (8)</Link>
                <Link className="fr-tag" aria-pressed="false">Renouvellements de contrat (5)</Link>
                <Link className="fr-tag" aria-pressed="false">Rupture de contrat (0)</Link>
              </ul>
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table className={conseillers?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Nom de la structure</th>
                          <th>Nom du candidat</th>
                          <th>Date de la demande</th>
                          <th>Type de la demande</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && conseillers?.items?.data?.map((conseiller, idx) => {
                          return (<Contrat key={idx} candidat={conseiller} />);
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
