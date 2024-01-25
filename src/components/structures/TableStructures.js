import React from 'react';
import { useDispatch } from 'react-redux';
import { filtresStructuresActions, paginationActions } from '../../actions';
import Structure from './Structure';
import PropTypes from 'prop-types';

export function TableStructures({ structures, loading, error, ordreNom, ordre }) {

  const dispatch = useDispatch();

  const ordreColonne = e => {
    dispatch(paginationActions.setPage(1));
    dispatch(filtresStructuresActions.changeOrdre(e.currentTarget?.id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button id="idPG" className="filtre-btn" onClick={ordreColonne}>
              <span>Id
                {(ordreNom !== 'idPG' || ordreNom === 'idPG' && ordre) &&
                  <i className="ri-arrow-down-s-line chevron icone"></i>
                }
                {(ordreNom === 'idPG' && !ordre) &&
                  <i className="ri-arrow-up-s-line chevron icone"></i>
                }
              </span>
            </button>
          </th>
          <th colSpan={structures?.items?.total > 0 ? '12' : ''}>
            <button id="nom" className="filtre-btn" onClick={ordreColonne}>
              <span>Structure
                {(ordreNom !== 'nom' || ordreNom === 'nom' && ordre) &&
                  <i className="ri-arrow-down-s-line chevron icone"></i>
                }
                {(ordreNom === 'nom' && !ordre) &&
                  <i className="ri-arrow-up-s-line chevron icone"></i>
                }
              </span>
            </button>
          </th>
          <th>Siret</th>
          <th>Nom</th>
          <th>Pr&eacute;nom</th>
          <th colSpan={structures?.items?.total > 0 ? '12' : ''}>Email</th>
          <th>Candidats recrut&eacute;s</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!error && !loading && structures?.items?.data?.map((structure, idx) => {
          return (<Structure key={idx} structure={structure} />);
        })
        }
        {(!structures?.items || structures?.items?.total === 0) &&
          <tr>
            <td colSpan="12" style={{ width: '75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span className="not-found pair">Aucune structure trouv&eacute;e</span>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
}

TableStructures.propTypes = {
  structures: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  ordreNom: PropTypes.string,
  ordre: PropTypes.number,
};

export default TableStructures;
