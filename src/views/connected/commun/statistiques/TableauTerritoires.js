import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresEtTrisStatsActions, paginationActions, statistiquesActions } from '../../../../actions';

import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import FiltresEtTris from './Components/tableaux/FiltresEtTris';
import Territoire from './Components/tableaux/Territoire';

export default function TableauTerritoires() {

  const dispatch = useDispatch();

  const filtreTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const loading = useSelector(state => state.statistiques?.loading);
  const error = useSelector(state => state.statistiques?.error);
  const territoires = useSelector(state => state.statistiques?.statsTerritoires);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [page, setPage] = useState(1);
  const [filterOrder, setFilterOrder] = useState(true);
  const [filterOrderName, setFilterOrderName] = useState(undefined);
  
  const ordreColonne = e => {
    dispatch(filtresEtTrisStatsActions.changeOrdre(e.target.dataset.id));
  };

  useEffect(() => {
    if (!error) {
      if (territoires?.items) {
        const count = territoires.items.limit ? Math.floor(territoires.items.total / territoires.items.limit) : 0;
        dispatch(paginationActions.setPageCount(territoires.items.total % territoires.items.limit === 0 ? count : count + 1));
      }
      if (ordreNom !== filterOrderName || ordre !== filterOrder) {
        dispatch(paginationActions.setPage(1));
        setFilterOrder(ordre);
        setFilterOrderName(ordreNom);
        dispatch(statistiquesActions.getDatasTerritoires(filtreTerritoire, dateDebut, dateFin, 1, ordreNom, ordre ? 1 : -1));
      }
      if (page !== currentPage) {
        setPage(currentPage);
      }

    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les statistiques n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }


  }, [ordre, ordreNom, territoires, error]);

  return (
    <div className="statistiques">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques par territoire</h1>
          </div>
          <div className="fr-col-12">
            <FiltresEtTris/>
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
                          <th data-id="personnesAccompagnees">
                            <span data-id="personnesAccompagnees">CRA enregistr&eacute;s</span>
                          </th>
                          <th>
                            <span data-id="personnesAccompagnees">Personnes accompagn&eacute;es</span>
                          </th>
                          <th>
                            <button data-id="nombreConseillersCoselec" className="filtre-btn" onClick={ordreColonne}>
                              <span data-id="nombreConseillersCoselec">Dotation de conseillers
                                { (ordreNom !== 'nombreConseillersCoselec' || ordreNom === 'nombreConseillersCoselec' && ordre) &&
                                  <i data-id="nombreConseillersCoselec" className="ri-arrow-down-s-line chevron icone-2"></i>
                                }
                                { (ordreNom === 'nombreConseillersCoselec' && !ordre) &&
                                  <i data-id="nombreConseillersCoselec" className="ri-arrow-up-s-line chevron icone-2"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th data-id="cnfsActives">
                            <button data-id="cnfsActives" className="filtre-btn" onClick={ordreColonne}>
                              <span data-id="cnfsActives">CnFS activ&eacute;s
                                { (ordreNom !== 'cnfsActives' || ordreNom === 'cnfsActives' && ordre) &&
                                  <i data-id="cnfsActives" className="ri-arrow-down-s-line chevron icone-2"></i>
                                }
                                { (ordreNom === 'cnfsActives' && !ordre) &&
                                  <i data-id="cnfsActives" className="ri-arrow-up-s-line chevron icone-2"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th data-id="cnfsInactives">
                            <button data-id="cnfsInactives" className="filtre-btn" onClick={ordreColonne}>
                              <span data-id="cnfsInactives">CnFS en attente d&rsquo;activation
                                { (ordreNom !== 'cnfsInactives' || ordreNom === 'cnfsInactives' && ordre) &&
                                  <i data-id="cnfsInactives" className="ri-arrow-down-s-line chevron icone-3"></i>
                                }
                                { (ordreNom === 'cnfsInactives' && !ordre) &&
                                  <i data-id="cnfsInactives" className="ri-arrow-up-s-line chevron icone-3"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th data-id="tauxActivation">
                            { filtreTerritoire === 'codeRegion' &&
                              <button className="filtre-btn">
                                <span data-id="personnesAccompagnees">Taux d&rsquo;activation</span>
                              </button>
                            }
                            { filtreTerritoire === 'codeDepartement' &&
                              <button data-id="tauxActivation" className="filtre-btn" onClick={ordreColonne}>
                                <span data-id="tauxActivation">Taux d&rsquo;activation
                                  { (ordreNom !== 'tauxActivation' || ordreNom === 'tauxActivation' && ordre) &&
                                    <i data-id="tauxActivation" className="ri-arrow-down-s-line chevron icone-2"></i>
                                  }
                                  { (ordreNom === 'tauxActivation' && !ordre) &&
                                    <i data-id="tauxActivation" className="ri-arrow-up-s-line chevron icone-2"></i>
                                  }
                                </span>
                              </button>
                            }
                          </th>
                          <th>Afficher</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && territoires?.items?.data?.map((territoire, idx) => {
                          return (<Territoire key={idx} territoire={territoire} filtreTerritoire={filtreTerritoire} />);
                        })
                        }
                        { (!territoires?.items || territoires?.items?.total === 0) &&
                          <tr>
                            <td colSpan="9" className="not-found pair">
                              {filtreTerritoire === 'codeDepartement' ? `Aucun département ` : 'Aucune région ' } trouv&eacute;
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
