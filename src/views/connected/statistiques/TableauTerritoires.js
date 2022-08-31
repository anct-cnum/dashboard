import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { filtresEtTrisActions, statistiquesActions } from '../../../actions';
import BlockAlerte from '../../anonymous/BlockAlerte';
import BlockSpinner from '../../anonymous/BlockSpinner';
import FiltresEtTris from './Components/tableaux/FiltresEtTris';
import Pagination from './Components/tableaux/Pagination';
import Territoire from './Components/tableaux/Territoire';

export default function TableauTerritoires() {

  const dispatch = useDispatch();
  const location = useLocation();

  const territoires = useSelector(state => state.statistiques?.statsTerritoires);
  const statsTerritoiresLoading = useSelector(state => state.statistiques?.statsTerritoiresLoading);
  const statsTerritoiresError = useSelector(state => state.statistiques?.statsTerritoiresError);
  const pagination = useSelector(state => state.pagination);

  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const filtreTerritoire = useSelector(state => state.filtresEtTris?.territoire);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);

  let [page, setPage] = (pagination?.resetPage === false && location.currentPage !== undefined) ? useState(location.currentPage) : useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = page => {
    setPage(page);
    dispatch(statistiquesActions.getDatasTerritoires(filtreTerritoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));
  };
  
  const ordreColonne = e => {
    dispatch(filtresEtTrisActions.changeOrdre(e.target.id));
  };

  useEffect(() => {
    if (territoires?.items) {
      const count = territoires.items.limit ? Math.floor(territoires.items.total / territoires.items.limit) : 0;
      setPageCount(territoires.items.total % territoires.items.limit === 0 ? count : count + 1);
    }
  }, [territoires]);

  useEffect(() => {
    const page = (pagination?.resetPage === false && location.currentPage !== undefined) ? location.currentPage : 1;
    dispatch(statistiquesActions.getDatasTerritoires(filtreTerritoire, dateDebut, dateFin, page, ordreNom, ordre ? 1 : -1));

  }, [ordre, ordreNom]);

  return (
    <div className="statistiques">
      <BlockSpinner loading={statsTerritoiresLoading} />
      {statsTerritoiresError &&
        <BlockAlerte type="error" titre="Les statistiques n'ont pas pu être chargées !"/>
      }
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <h1 className="titre">Statistiques par territoire</h1>
          </div>
          <div className="fr-col-12">
            <FiltresEtTris resetPage={setPage}/>
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="code" >Code
                                { (ordreNom !== 'code' || ordreNom === 'code' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                { (ordreNom === 'code' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="nom">Nom
                                { (ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                { (ordreNom === 'nom' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <span id="personnesAccompagnees">CRA enregistr&eacute;s</span>
                          </th>
                          <th>
                            <span id="personnesAccompagnees">Personnes accompagn&eacute;es</span>
                          </th>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="nombreConseillersCoselec">Dotation de conseillers
                                { (ordreNom !== 'nombreConseillersCoselec' || ordreNom === 'nombreConseillersCoselec' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone-2"></i>
                                }
                                { (ordreNom === 'nombreConseillersCoselec' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone-2"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="cnfsActives">CnFS activ&eacute;s
                                { (ordreNom !== 'cnfsActives' || ordreNom === 'cnfsActives' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone-2"></i>
                                }
                                { (ordreNom === 'cnfsActives' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone-2"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="cnfsInactives">CnFS en attente d&rsquo;activation
                                { (ordreNom !== 'cnfsInactives' || ordreNom === 'cnfsInactives' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone-3"></i>
                                }
                                { (ordreNom === 'cnfsInactives' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone-3"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            { filtreTerritoire === 'codeRegion' &&
                              <button className="filtre-btn">
                                <span id="personnesAccompagnees">Taux d&rsquo;activation</span>
                              </button>
                            }
                            { filtreTerritoire === 'codeDepartement' &&
                              <button className="filtre-btn" onClick={ordreColonne}>
                                <span id="tauxActivation">Taux d&rsquo;activation
                                  { (ordreNom !== 'tauxActivation' || ordreNom === 'tauxActivation' && ordre) &&
                                    <i className="ri-arrow-down-s-line chevron icone-2"></i>
                                  }
                                  { (ordreNom === 'tauxActivation' && !ordre) &&
                                    <i className="ri-arrow-up-s-line chevron icone-2"></i>
                                  }
                                </span>
                              </button>
                            }
                          </th>
                          <th>Afficher</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!statsTerritoiresError && !statsTerritoiresLoading && territoires?.items?.data && territoires?.items.data.map((territoire, idx) => {
                          return (<Territoire key={idx} territoire={territoire} filtreTerritoire={filtreTerritoire}
                            currentPage={page}/>);
                        })
                        }
                        { (!territoires?.items || !territoires?.items?.data) &&
                          <tr>
                            <td colSpan="9" className="not-found pair">
                              {filtreTerritoire === 'codeDepartement' ? 'Aucun d&eacute;partement ' : 'Aucune r&eacute;gion ' } trouv&eacute;
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination current={page} pageCount={pageCount} navigate={navigate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
