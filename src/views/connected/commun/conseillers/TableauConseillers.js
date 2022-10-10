/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresEtTrisStatsActions, paginationActions, conseillerActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Conseiller from './Conseiller';
import FiltresEtTrisConseillers from './FiltresEtTrisConseillers';

export default function TableauConseillers() {

  const dispatch = useDispatch();

  const dateDebut = useSelector(state => state.filtresEtTris?.dateDebut);
  const dateFin = useSelector(state => state.filtresEtTris?.dateFin);
  const ordre = useSelector(state => state.filtresEtTris?.ordre);
  const [basculerFiltreRupture, setBasculerFiltreRupture] = useState(false);
  const [basculerFiltreCoordinateur, setBasculerFiltreCoordinateur] = useState(false);
  const ordreNom = useSelector(state => state.filtresEtTris?.ordreNom);
  const loading = useSelector(state => state.conseiller?.loading);
  const error = useSelector(state => state.conseiller?.error);
  const conseillers = useSelector(state => state.conseiller);
  const filtreCoordinateur = useSelector(state => state.filtresEtTris?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresEtTris?.rupture);
  const filtreParNom = useSelector(state => state.filtresEtTris?.nom);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [page, setPage] = useState(1);

  const filtreClick = e => {
    if (e.target.id === 'coordinateur') {
      setBasculerFiltreCoordinateur(!basculerFiltreCoordinateur);
      setBasculerFiltreRupture(false);
    } else {
      setBasculerFiltreCoordinateur(false);
      setBasculerFiltreRupture(!basculerFiltreRupture);
    }
  };

  const handleSortCoordinateur = e => {
    dispatch(filtresEtTrisStatsActions.changeCoordinateur(e.target.id));
    setBasculerFiltreCoordinateur(false);
  };
  const handleSortRupture = e => {
    dispatch(filtresEtTrisStatsActions.changeRupture(e.target.id));
    setBasculerFiltreRupture(false);
  };

  const ordreColonne = e => {
    dispatch(filtresEtTrisStatsActions.changeOrdre(e.target.id));
  };

  // useEffect(() => {
  //   if (conseillers?.items) {
  //     const count = Math.floor(conseillers.items.total / conseillers.items.limit);
  //     dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
  //     if (initConseiller === false) {
  //       dispatch(conseillerActions.saveConseillerBeforeFilter(conseillers.items));
  //     }
  //   }
  // }, [conseillers]);

  useEffect(() => {
    if (!error) {
      if (conseillers?.items) {
        const count = Math.floor(conseillers.items.total / conseillers.items.limit);
        dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
        // if (initConseiller === false) {
        //   dispatch(conseillerActions.saveConseillerBeforeFilter(conseillers.items));
        // }
      }
      if (!conseillers) {
        dispatch(paginationActions.setPage(1));
        dispatch(conseillerActions.getAll(currentPage, dateDebut, dateFin, filtreCoordinateur, filtreRupture, filtreParNom, ordreNom,
          ordre ? 1 : -1));
      }
    } else {
      dispatch(alerteEtSpinnerActions.getMessageAlerte({
        type: 'error',
        message: 'Les conseillers n\'ont pas pu être chargées !',
        status: null, description: null
      }));
    }
  }, [conseillers, error, filtreParNom, filtreCoordinateur, filtreRupture, ordreNom, ordre]);

  return (
    <div className="conseillers">
      <Spinner loading={loading} />
      <div className="fr-container fr-my-10w">
        <div className="fr-grid-row">
          <div className="fr-col-12">
            <FiltresEtTrisConseillers />
            <div className="fr-container--fluid fr-mt-2w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="idPG" >Id
                                {(ordreNom !== 'idPG' || ordreNom === 'idPG' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'idPG' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="nom">Nom
                                {(ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'nom' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>
                            <button className="filtre-btn" onClick={ordreColonne}>
                              <span id="prenom">Pr&eacute;nom
                                {(ordreNom !== 'prenom' || ordreNom === 'prenom' && ordre) &&
                                  <i className="ri-arrow-down-s-line chevron icone"></i>
                                }
                                {(ordreNom === 'prenom' && !ordre) &&
                                  <i className="ri-arrow-up-s-line chevron icone"></i>
                                }
                              </span>
                            </button>
                          </th>
                          <th>Email professionelle</th>
                          <th>
                            <nav className="fr-nav" id="navigation-sort-rupture" role="navigation">
                              <ul className="fr-nav__list">
                                <li className={conseillers?.items?.data.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                                  <span >
                                    <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreRupture}
                                      aria-controls="menu-rupture" aria-current="true" id="rupture" onClick={filtreClick}>
                                      Rupture
                                    </button>
                                    <div className={basculerFiltreRupture === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
                                      id="menu-rupture">
                                      <ul className="fr-menu__list">
                                        <li className={filtreRupture === 'tous' ? 'selected' : ''} >
                                          <button id="tous" className="admin-select-option border-no-result" onClick={handleSortRupture}>
                                            Afficher tout
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreRupture === 'rupture' ? 'selected' : ''}>
                                          <button id="rupture" className="admin-select-option border-no-result" onClick={handleSortRupture}>
                                            Profils en rupture uniquement
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreRupture === 'contrat' ? 'selected' : ''}>
                                          <button id="contrat" className="admin-select-option" onClick={handleSortRupture}>
                                            Profils en contrat uniquement
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </span>
                                </li>
                              </ul>
                            </nav>
                          </th>
                          <th>
                            <nav className="fr-nav" id="navigation-sort-coordinateur" role="navigation">
                              <ul className="fr-nav__list">
                                <li className={conseillers?.items?.data.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                                  <span >
                                    <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreCoordinateur}
                                      aria-controls="menu-coordinateur" aria-current="true" id="coordinateur" onClick={filtreClick}>
                                      Coordinateur
                                    </button>
                                    <div className={basculerFiltreCoordinateur === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
                                      id="menu-coordinateur">
                                      <ul className="fr-menu__list">
                                        <li className={filtreCoordinateur === 'tous' ? 'selected' : ''} >
                                          <button id="tous" className="admin-select-option border-no-result" onClick={handleSortCoordinateur}>
                                            Afficher tout
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreCoordinateur === 'est-coordinateur' ? 'selected' : ''}>
                                          <button id="est-coordinateur" className="admin-select-option border-no-result" onClick={handleSortCoordinateur}>
                                            Profils coordinateur uniquement
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreCoordinateur === 'non-coordinateur' ? 'selected' : ''}>
                                          <button id="non-coordinateur" className="admin-select-option" onClick={handleSortCoordinateur}>
                                            Profils non-coordinateur uniquement
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </span>
                                </li>
                              </ul>
                            </nav>
                          </th>
                          <th>CRA saisis</th>
                          <th>D&eacute;tails</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!error && !loading && conseillers?.items?.data?.map((conseiller, idx) => {
                          return (<Conseiller key={idx} conseiller={conseiller} currentPage={page} />);
                        })
                        }
                        {(!conseillers?.items || conseillers?.items?.total === 0) &&
                          <tr>
                            <td colSpan="9" className="not-found pair">
                              Aucun conseillers trouv&eacute;
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