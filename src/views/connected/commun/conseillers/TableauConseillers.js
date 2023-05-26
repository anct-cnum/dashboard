import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteEtSpinnerActions, filtresConseillersActions, paginationActions, conseillerActions, statistiquesActions } from '../../../../actions';
import Spinner from '../../../../components/Spinner';
import Pagination from '../../../../components/Pagination';
import Conseiller from './Conseiller';
import FiltresEtTrisConseillers from './FiltresEtTrisConseillers';
import { scrollTopWindow } from '../../../../utils/exportsUtils';
import { useLocation } from 'react-router-dom';

export default function TableauConseillers() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage);

  const dateDebut = useSelector(state => state.datePicker?.dateDebut);
  const dateFin = useSelector(state => state.datePicker?.dateFin);
  const ordre = useSelector(state => state.filtresConseillers?.ordre);
  const [basculerFiltreRupture, setBasculerFiltreRupture] = useState(false);
  const [basculerFiltreCoordinateur, setBasculerFiltreCoordinateur] = useState(false);
  const ordreNom = useSelector(state => state.filtresConseillers?.ordreNom);
  const loading = useSelector(state => state.conseiller?.loading);
  const error = useSelector(state => state.conseiller?.error);
  const conseillers = useSelector(state => state.conseiller);
  const filtreCoordinateur = useSelector(state => state.filtresConseillers?.coordinateur);
  const filtreRupture = useSelector(state => state.filtresConseillers?.rupture);
  const filtreParNomConseiller = useSelector(state => state.filtresConseillers?.nomConseiller);
  const filtreParNomStructure = useSelector(state => state.filtresConseillers?.nomStructure);
  const filtreRegion = useSelector(state => state.filtresConseillers?.region);
  const filterDepartement = useSelector(state => state.filtresConseillers?.departement);
  const currentPage = useSelector(state => state.pagination?.currentPage);
  const [initConseiller, setInitConseiller] = useState(false);
  
  const filtreClick = e => {
    if (e.target?.id === 'coordinateur') {
      setBasculerFiltreCoordinateur(!basculerFiltreCoordinateur);
      setBasculerFiltreRupture(false);
    } else {
      setBasculerFiltreCoordinateur(false);
      setBasculerFiltreRupture(!basculerFiltreRupture);
    }
  };

  const handleSortCoordinateur = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConseillersActions.changeCoordinateur(e.target?.id));
    setBasculerFiltreCoordinateur(false);
  };
  const handleSortRupture = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConseillersActions.changeRupture(e.target?.id));
    setBasculerFiltreRupture(false);
  };

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresConseillersActions.changeOrdre(e.currentTarget?.id));
  };

  useEffect(() => {
    if (conseillers?.items) {
      const count = Math.floor(conseillers.items.total / conseillers.items.limit);
      dispatch(paginationActions.setPageCount(conseillers.items.total % conseillers.items.limit === 0 ? count : count + 1));
    }
  }, [conseillers]);

  useEffect(() => {
    if (initConseiller === true) {
      dispatch(conseillerActions.getAllRecruter(currentPage, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
        filterDepartement, filtreParNomStructure, ordreNom, ordre ? 1 : -1));
    }
  // eslint-disable-next-line max-len
  }, [dateDebut, dateFin, currentPage, filtreCoordinateur, filtreRupture, filtreParNomConseiller, ordreNom, ordre, filtreRegion, filterDepartement, filtreParNomStructure]);

  useEffect(() => {
    scrollTopWindow();
    if (page === undefined) {
      dispatch(paginationActions.setPage(1));
      setPage(1);
    }
    if (!error) {
      if (initConseiller === false && page !== undefined) {
        dispatch(statistiquesActions.resetFiltre());
        dispatch(conseillerActions.getAllRecruter(page, dateDebut, dateFin, filtreRupture, filtreCoordinateur, filtreParNomConseiller, filtreRegion,
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
                          <th>Email professionnel</th>
                          <th>Structure</th>
                          <th>
                            <nav className="fr-nav" id="navigation-sort-rupture" role="navigation">
                              <ul className="fr-nav__list">
                                <li className={conseillers?.items?.data?.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                                  <span>
                                    <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreRupture}
                                      aria-controls="menu-rupture" aria-current="true" id="rupture" onClick={filtreClick}>
                                      Statut
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
                                        <li className={filtreRupture === 'contrat' ? 'selected' : ''}>
                                          <button id="contrat" className="admin-select-option" onClick={handleSortRupture}>
                                            En activit&eacute;
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreRupture === 'en-cours' ? 'selected' : ''}>
                                          <button id="en-cours" className="admin-select-option border-no-result" onClick={handleSortRupture}>
                                            Rupture en cours de traitement
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreRupture === 'pieces-manquantes' ? 'selected' : ''}>
                                          <button id="pieces-manquantes" className="admin-select-option border-no-result" onClick={handleSortRupture}>
                                            Dossier avec pi&egrave;ces manquantes
                                          </button>
                                          <hr className="admin-select-hr" />
                                        </li>
                                        <li className={filtreRupture === 'rupture' ? 'selected' : ''}>
                                          <button id="rupture" className="admin-select-option" onClick={handleSortRupture}>
                                            Sans mission
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
                                <li className={conseillers?.items?.data?.length <= 2 ? 'no-result fr-nav__item' : 'fr-nav__item'}>
                                  <span >
                                    <button className="fr-nav__btn admin-select" aria-expanded={basculerFiltreCoordinateur}
                                      aria-controls="menu-coordinateur" aria-current="true" id="coordinateur" onClick={filtreClick}>
                                      Coordinateur
                                    </button>
                                    <div
                                      className={basculerFiltreCoordinateur === true ? 'fr-collapse--expanded fr-menu' : 'fr-collapse fr-nav--expanded fr-menu'}
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
