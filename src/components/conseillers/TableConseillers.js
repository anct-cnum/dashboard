import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filtresConseillersActions, filtresStructuresActions, paginationActions } from '../../actions';
import PropTypes from 'prop-types';
import Conseiller from './Conseiller';

export function TableConseillers({ conseillers, loading, error, filtreRupture, filtreCoordinateur }) {
  const [basculerFiltreRupture, setBasculerFiltreRupture] = useState(false);
  const [basculerFiltreCoordinateur, setBasculerFiltreCoordinateur] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(filtresStructuresActions.changeOrdre(e.currentTarget?.id));
  };

  return (
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
  );
}

TableConseillers.propTypes = {
  conseillers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  filtreRupture: PropTypes.string,
  filtreCoordinateur: PropTypes.string,
};

export default TableConseillers;
