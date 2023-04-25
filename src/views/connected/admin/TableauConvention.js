import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions, conventionActions } from '../../../actions';
import Spinner from '../../../components/Spinner';
import Pagination from '../../../components/Pagination';
import { scrollTopWindow } from '../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import Reconventionnement from './reconventionnement/Reconventionnement';
import Conventionnement from './conventionnement/Conventionnement';
import { StatutConventionnement } from '../../../utils/enumUtils';

export default function TableauConvention() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.convention?.loading);
  const error = useSelector(state => state.convention?.error);
  const conventions = useSelector(state => state.convention);
  const currentPage = useSelector(state => state.pagination?.currentPage);
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
      if (typeConvention === 'avenantAjoutPoste' || typeConvention === 'avenantRenduPoste') {
        dispatch(conventionActions.reset());
      } else {
        dispatch(conventionActions.getAll(currentPage, typeConvention));
      }
    }
  }, [currentPage, typeConvention]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(conventionActions.getAll(page, typeConvention));
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

  return (
    <div className="conventions">
      <Spinner loading={loading} />
      <div className="">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 style={{ color: '#000091' }} className="fr-h1">Demandes de conventions</h1>
              <span>Retrouvez ici toutes les demandes de conventionnement, reconventionnement et avenants &agrave; valider.</span>
            </div>

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
                  setTypeConvention('reconventionnement');
                }} className="fr-tag" aria-pressed={typeConvention === 'reconventionnement'}>
                  Reconventionnement ({conventions?.items?.totalParConvention?.reconventionnement})
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
                        {!error && !loading && conventions?.items?.data?.map((convention, idx) =>
                          <tr key={idx}>
                            {convention?.conventionnement?.statut === StatutConventionnement.RECONVENTIONNEMENT_EN_COURS &&
                              <Reconventionnement reconventionnement={convention} />
                            }
                            {convention?.conventionnement?.statut === StatutConventionnement.CONVENTIONNEMENT_EN_COURS &&
                              <Conventionnement conventionnement={convention} />
                            }
                          </tr>
                        )
                        }
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
    </div>
  );
}
