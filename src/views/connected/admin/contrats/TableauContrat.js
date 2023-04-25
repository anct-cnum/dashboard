import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, paginationActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';
import Contrat from './Contrat';
import { contratActions } from '../../../../actions/contratActions';

export default function TableauContrat() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const loading = useSelector(state => state.contrat?.loading);
  const error = useSelector(state => state.contrat?.error);
  const contrats = useSelector(state => state.contrat);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);
  const [statutContrat, setStatutContrat] = useState('toutes');

  useEffect(() => {
    if (contrats?.items && contrats?.items?.total > 0) {
      const count = Math.floor(contrats.items.total / contrats.items.limit);
      dispatch(paginationActions.setPageCount(contrats.items.total % contrats.items.limit === 0 ? count : count + 1));
    }
  }, [contrats]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(contratActions.getAll(currentPage, statutContrat));
    }
  }, [currentPage, statutContrat]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(contratActions.getAll(page, statutContrat));
        setInitConseiller(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les contrats n\'ont pas pu être chargés !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  return (
    <div className="contrats">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <div className="fr-col fr-col-lg-12 fr-col-md-8">
              <h1 className="fr-h1 title">Demandes de contrats</h1>
              <span>Retrouvez ici toutes les demandes de recrutements, renouvellements et ruptures de contrat &agrave; valider.</span>
            </div>
            <div className="fr-container--fluid fr-mt-4w">
              <ul className="tabs fr-tags-group">
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setStatutContrat('toutes');
                }} className="fr-tag" aria-pressed={statutContrat === 'toutes'}>
                  Afficher toutes les demandes ({contrats?.items?.totalParContrat?.total})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setStatutContrat('recrutee');
                }} className="fr-tag" aria-pressed={statutContrat === 'recrutee'}>
                  Recrutements ({contrats?.items?.totalParContrat?.recrutement})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setStatutContrat('renouvellement');
                }} className="fr-tag" aria-pressed={statutContrat === 'renouvellement'}>
                  Renouvellements de contrat ({contrats?.items?.totalParContrat?.renouvellementDeContrat})
                </button>
                <button onClick={() => {
                  dispatch(paginationActions.setPage(1));
                  setStatutContrat('nouvelle_rupture');
                }} className="fr-tag" aria-pressed={statutContrat === 'nouvelle_rupture'}>
                  Rupture de contrat ({contrats?.items?.totalParContrat?.ruptureDeContrat})
                </button>
              </ul>
              <div className="fr-grid-row fr-grid-row--center fr-mt-1w">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table className={contrats?.items?.data?.length < 2 ? 'no-result-table' : ''}>
                      <thead>
                        <tr>
                          <th style={{ width: '8rem' }}>ID structure</th>
                          <th style={{ width: '17rem' }}>Nom de la structure</th>
                          <th style={{ width: '13rem' }}>Nom du candidat</th>
                          <th style={{ width: '11rem' }}>Date de la demande</th>
                          <th style={{ width: '11rem' }}>Type de la demande</th>
                          <th style={{ width: '12.1rem' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && contrats?.items?.data?.map((contrat, idx) => {
                          return (<Contrat key={idx} contrat={contrat} />);
                        })
                        }
                        {(!contrats?.items || contrats?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '60rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">Aucun contrat trouv&eacute;</span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {contrats?.items?.total !== 0 &&
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
