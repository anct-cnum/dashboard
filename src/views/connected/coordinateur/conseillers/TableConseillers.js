import React from 'react';
import { useDispatch } from 'react-redux';
import { filtresStructuresActions, paginationActions } from '../../../../actions';
import PropTypes from 'prop-types';
import Conseiller from './Conseiller';

export function TableConseillers({ conseillers, loading, error }) {
  const dispatch = useDispatch();


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
          <th>Structure</th>
          <th>CD</th>
          <th>D&eacute;but de contrat</th>
          <th>Fin de contrat</th>
          <th>Activ&eacute;</th>
          <th>CRA saisis</th>
          <th>Groupe CRA</th>
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
  conseillers: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool || PropTypes.string,
  filtreRupture: PropTypes.string,
  filtreCoordinateur: PropTypes.string,
};

export default TableConseillers;
