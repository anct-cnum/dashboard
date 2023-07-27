import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresEtTrisStatsActions, paginationActions, statistiquesActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import { useLocation } from 'react-router-dom';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import Territoire from './Territoire';
import FiltresEtTrisTerritoires from '../../commun/statistiques/Components/tableaux/FiltresEtTrisTerritoires';

export default function TableauTerritoires() {

  const dispatch = useDispatch();
  const location = useLocation();

  const filtreTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const territoires = useSelector(state => state.statistiques?.statsTerritoires);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [page, setPage] = useState(location.state?.currentPage);
  const [initTerritoire, setInitTerritoire] = useState(false);

  const ordreColonne = e => {
    dispatch(filtresEtTrisStatsActions.changeOrdre(e.target.dataset.id));
  };

  useEffect(() => {
    if (territoires?.items) {
      const count = territoires.items.limit ? Math.floor(territoires.items.total / territoires.items.limit) : 0;
      dispatch(paginationActions.setPageCount(territoires.items.total % territoires.items.limit === 0 ? count : count + 1));
    }
  }, [territoires]);

  useEffect(() => {
    if (initTerritoire === true) {
      dispatch(statistiquesActions.getDatasTerritoiresPrefet(filtreTerritoire, dateDebut, dateFin, currentPage, ordreNom, ordre ? 1 : -1));
    }
  }, [dateDebut, dateFin, ordre, ordreNom, filtreTerritoire, currentPage]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initTerritoire === false && page !== undefined) {
        dispatch(statistiquesActions.getDatasTerritoiresPrefet(filtreTerritoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
        setInitTerritoire(true);
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [error, page]);

  return (
    <div className="statistiques">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="fr-h1 title">Statistiques par territoire</h1>
          </div>
          <div className="fr-col-12">
            <FiltresEtTrisTerritoires />
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th data-id="code">
                            <button data-id="code" className="filtre-btn" onClick={ordreColonne}>
                              <span>Code
                                { (ordreNom !== 'code' || ordreNom === 'code' && ordre) &&
                                  <i data-id="code" className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                { (ordreNom === 'code' && !ordre) &&
                                  <i data-id="code" className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th data-id="nom">
                            <button data-id="nom" className="filtre-btn" onClick={ordreColonne}>
                              <span data-id="nom">Nom
                                { (ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                                  <i data-id="nom" className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                { (ordreNom === 'nom' && !ordre) &&
                                  <i data-id="nom" className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>CRA</th>
                          <th>Personnes accompagn&eacute;es</th>
                          <th>
                            <button id="posteValider" className="filtre-btn" onClick={ordreColonne}>
                              <span>Postes valid&eacute;s
                                {(ordreNom !== 'posteValider' || ordreNom === 'posteValider' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'posteValider' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button id="conseillersRecruter" className="filtre-btn" onClick={ordreColonne}>
                              <span>Conseillers recrut&eacute;s
                                {(ordreNom !== 'conseillersRecruter' || ordreNom === 'conseillersRecruter' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'conseillersRecruter' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && territoires?.items?.data?.map((territoire, idx) => {
                          return (<Territoire key={idx} territoire={territoire} filtreTerritoire={filtreTerritoire} />);
                        })
                        }
                        {(!territoires?.items || territoires?.items?.total === 0) &&
                          <tr>
                            <td colSpan="12" style={{ width: '75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span className="not-found pair">
                                  {filtreTerritoire === 'codeDepartement' ? `Aucun département ` : 'Aucune région ' } trouv&eacute;
                                </span>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {territoires?.items?.total !== 0 &&
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
