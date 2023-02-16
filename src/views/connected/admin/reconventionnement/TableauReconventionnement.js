import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, reconventionnementActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { Link, useLocation } from 'react-router-dom';
import Reconventionnement from './Reconventionnement';

export default function TableauReconventionnement() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.reconventionnement?.loading);
  const error = useSelector(state => state.reconventionnement?.error);
  const reconventionnements = useSelector(state => state.reconventionnement);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);

  useEffect(() => {
    if (reconventionnements?.items) {
      const count = Math.floor(reconventionnements.items.total / reconventionnements.items.limit);
      dispatch(paginationActions.setPageCount(reconventionnements.items.total % reconventionnements.items.limit === 0 ? count : count + 1));
    }
  }, [reconventionnements]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(reconventionnementActions.getAll(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(reconventionnementActions.getAll(currentPage));
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

  return (
    <div className="reconventionnements">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 style={{ color: '#000091' }} className="fr-h1">Demandes de conventions</h1>
              <span>Retrouvez ici toutes les demandes de conventionnement, reconventionnement et avenants à valider.</span>
            </div>
            
            <div className="fr-container--fluid fr-mt-4w">
              <ul className="tabs fr-tags-group">
                <Link className="fr-tag" aria-pressed="true">Afficher toutes les demandes (42)</Link>
                <Link className="fr-tag" aria-pressed="false">Conventionnement initial (8)</Link>
                <Link className="fr-tag" aria-pressed="false">Reconventionnement (5)</Link>
                <Link className="fr-tag" aria-pressed="false">Avenant · ajout de poste (3)</Link>
                <Link className="fr-tag" aria-pressed="false">Avenant · poste rendu (3)</Link>
              </ul>
              <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: '5rem' }}>Id</th>
                          <th style={{ width: '15rem' }}>Nom de la structure</th>
                          <th>Date de la demande</th>
                          <th>Date de fin du prochain contrat</th>
                          <th>Nombre de postes</th>
                          <th style={{ width: '12rem' }}>Type de la demande</th>
                          <th style={{ width: '12rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && reconventionnements?.items?.data?.map((reconventionnement, idx) => {
                          return (<Reconventionnement key={idx} candidat={reconventionnement} />);
                        })
                        }
                        {(!reconventionnements?.items || reconventionnements?.items?.total === 0) &&
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
                {reconventionnements?.items?.total !== 0 &&
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
